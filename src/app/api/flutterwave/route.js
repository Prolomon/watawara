import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../../../auth"; // Ensure this path is correct
import { dbConnect } from "@/backend/server/server";
import { User } from "@/backend/models/user.schema";
import { Wallet } from "@/backend/models/wallet.schema";

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const FLW_BASE_URL = "https://api.flutterwave.com/v3";

if (!FLW_SECRET_KEY) {
  console.error(
    "FATAL ERROR: FLW_SECRET_KEY is not defined in environment variables."
  );
  // Optionally, throw an error to prevent the application from starting misconfigured
  // throw new Error("FLW_SECRET_KEY is not defined.");
}

const flwClient = axios.create({
  baseURL: FLW_BASE_URL,
  headers: {
    Authorization: `Bearer ${FLW_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

export async function POST(request) {
  try {
    await dbConnect();

    const session = await auth();
    if (!session || !session.user || !session.user.email || !session.user.id) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized: No active session or user details missing",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const sessionUserEmail = session.user.email;
    const sessionUserId = session.user.id; // Assuming session.user.id is the ObjectId string

    const user = await User.findById(sessionUserId); // Find user by ID from session
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: User not found in database" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // idType can be passed in the body, defaulting to 'bvn'
    const { idNumber, idType = "bvn" } = await request.json();

    if (!idNumber) {
      return new Response(
        JSON.stringify({ error: "Missing required field: idNumber" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let wallet = await Wallet.findOne({ userId: user?.id });
    if (wallet && wallet.accountNo && wallet.flwAccountId) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Virtual account already exists for this user.",
          accountDetails: {
            accountNumber: wallet.accountNo,
            bankName: wallet.bankName,
            flwAccountId: wallet.flwAccountId,
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Optional: Check if this idNumber (e.g., BVN) is already linked to another user's wallet
    const existingWalletWithIdConflict = await Wallet.findOne({
      idNumber: idNumber,
      idType: idType.toLowerCase(),
    });
    if (
      existingWalletWithIdConflict &&
      existingWalletWithIdConflict.userId.toString() !== user?.id.toString()
    ) {
      return new Response(
        JSON.stringify({
          error: `This ${idType.toUpperCase()} is already associated with another account.`,
        }),
        {
          status: 409, // Conflict
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const txRef = `WTTWR-${user?.id.toString().slice(-6)}-${uuidv4().slice(0, 12)}`;
    const flwPayload = {
      email: user.email,
      tx_ref: txRef,
      is_permanent: true,
      firstname: user.fullname?.split(" ")[0] || user.email?.split("@")[0],
      lastname: user.fullname?.split(" ").slice(1).join(" ") || "User",
      phonenumber: user.phoneNo || "", // Ensure user.phoneNo exists or provide a fallback
      narration: `${user.fullname || user.email}'s Watawara Account`,
      // Adjust payload based on Flutterwave's requirements for different idTypes
      // This is a common pattern; verify with Flutterwave docs
      ...(idType.toLowerCase() === "bvn"
        ? { bvn: idNumber }
        : { id_number: idNumber, id_type_slug: idType.toLowerCase() }),
    };

    const flwResponse = await flwClient.post(
      "/virtual-account-numbers",
      flwPayload
    );

    if (
      !flwResponse.data ||
      flwResponse.data.status !== "success" ||
      !flwResponse.data.data
    ) {
      console.error(
        "Flutterwave API error or unexpected response:",
        flwResponse.data
      );
      return new Response(
        JSON.stringify({
          error: "Failed to create virtual account with provider",
          details: flwResponse.data?.message || "Unknown provider error",
        }),
        {
          status: flwResponse.status || 502,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const flwAccountData = flwResponse.data.data;

    const walletUpdateData = {
      userId: user?.id,
      email: user.email,
      accountNo: flwAccountData.account_number,
      bankName: flwAccountData.bank_name,
      flwAccountId: flwAccountData.id,
      txRef: txRef,
      idNumber: idNumber,
      idType: idType.toLowerCase(),
      isActive: true,
      isVerified: true,
      currency: flwAccountData.currency || "NGN",
    };

    if (wallet) {
      // Wallet shell existed, update it
      wallet = await Wallet.findByIdAndUpdate(wallet._id, walletUpdateData, {
        new: true,
        runValidators: true,
      });
    } else {
      // No wallet existed, create new
      wallet = await Wallet.create(walletUpdateData);
    }

    if (!wallet) {
      console.error(
        "DB Error: Failed to save wallet details after successful Flutterwave call.",
        { flwAccountData }
      );
      return new Response(
        JSON.stringify({ error: "Failed to save account details locally." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await User.findByIdAndUpdate(user?.id, {
      isWallet: true,
      phoneNo: user.phoneNo || flwPayload.phonenumber,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Virtual account created/updated successfully.",
        accountDetails: {
          accountNumber: wallet.accountNo,
          bankName: wallet.bankName,
          accountName:
            flwAccountData.account_name || user.fullname || user.email,
          flwAccountId: wallet.flwAccountId,
        },
      }),
      {
        status: 200, // OK (could be 201 if always new)
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in POST /api/flutterwave:", error);
    let statusCode = 500;
    let errorMessage = "An internal server error occurred.";
    if (error.isAxiosError && error.response) {
      console.error("Flutterwave API Error Data:", error.response.data);
      statusCode = error.response.status || 502;
      errorMessage =
        error.response.data?.message ||
        "Failed to communicate with payment provider.";
    } else if (
      error.name === "ValidationError" ||
      (error.name === "MongoServerError" && error.code === 11000)
    ) {
      statusCode = error.name === "ValidationError" ? 400 : 409; // Bad Request or Conflict
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized: No active session or user ID missing",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const sessionUserId = session.user.id;

    const { searchParams } = new URL(request.url);
    // Query by Flutterwave's account ID (their internal 'id' for the virtual account)
    const flwAccountId = searchParams.get("flwAccountId");

    if (!flwAccountId) {
      return new Response(
        JSON.stringify({
          error: "flwAccountId is required in query parameters",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const wallet = await Wallet.findOne({
      flwAccountId: flwAccountId,
      userId: sessionUserId,
    });
    if (!wallet) {
      return new Response(
        JSON.stringify({
          error: "Forbidden: Virtual account not found or access denied",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Assuming Flutterwave API allows fetching by their 'id' for the virtual account.
    // The endpoint /virtual-account-numbers/{id} should work if {id} is Flutterwave's virtual account ID.
    const flwResponse = await flwClient.get(
      `/virtual-account-numbers/${flwAccountId}`
    );

    if (!flwResponse.data || flwResponse.data.status !== "success") {
      console.error(
        "Flutterwave API error or unexpected response for GET:",
        flwResponse.data
      );
      return new Response(
        JSON.stringify({
          error: "Failed to retrieve virtual account details from provider",
          details: flwResponse.data?.message || "Unknown provider error",
        }),
        {
          status: flwResponse.status || 502,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(flwResponse.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET /api/flutterwave:", error);
    let statusCode = 500;
    let errorMessage =
      "An internal server error occurred while fetching account data.";
    if (error.isAxiosError && error.response) {
      statusCode = error.response.status || 502;
      errorMessage =
        error.response.data?.message ||
        "Failed to communicate with payment provider.";
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
