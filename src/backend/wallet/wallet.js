"use server";
import { Wallet } from "../models/wallet.schema";
import { dbConnect } from "../server/server";
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { redirect } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

// Flutterwave Configuration (should be at the top level or imported)
const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const FLW_BASE_URL = "https://api.flutterwave.com/v3";

if (!FLW_SECRET_KEY) {
  console.error(
    "FATAL ERROR: FLW_SECRET_KEY is not defined. Virtual account creation will fail."
  );
}

export const flwClient = axios.create({
  baseURL: FLW_BASE_URL,
  headers: {
    Authorization: `Bearer ${FLW_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

// Your existing id function
async function id(length = 11) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const randomNumber =
    min + (crypto.randomBytes(4).readUInt32BE(0) % (max - min + 1));
  return randomNumber.toString();
}

export const createWallet = async (formData) => {
  const idNumber = formData.get("bvn");
  const dob = formData.get("dob");

  if (!idNumber || !dob)
    redirect("/identity/verify-self?message=all-fields-required");

  const session = await auth();
  if (!session?.user?.email || !session?.user?.id)
    redirect("/auth/login?message=unauthenticated");
  const email = session.user.email;

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) redirect("/identity/verify-self?message=user-not-found");

  const existingWalletWithId = await Wallet.findOne({ idNumber: idNumber });
  if (existingWalletWithId)
    redirect(`/wallet/${existingWalletWithId.uniqueId}?message=account-exists`);

  const txRef = `WTTWR-${user?.id.toString().slice(-6)}-${uuidv4().slice(0, 12)}`;
  const flwPayload = {
    email: user.email, // Use user's email from DB
    tx_ref: txRef,
    is_permanent: true,
    firstname: user.fullname?.split(" ")[0] || user.email?.split("@")[0],
    lastname: user.fullname?.split(" ").slice(1).join(" ") || "User",
    phonenumber: user.phoneNo || "", // Ensure user.phoneNo exists or provide fallback
    narration: `${user.fullname || user.email}'s Watawara Account`,
    bvn: idNumber,
  };

  const flwResponse = await flwClient.post(
    "/virtual-account-numbers",
    flwPayload
  );

  if (
    !flwResponse.data ||
    flwResponse.data.status !== "success" ||
    !flwResponse.data.data
  )
    redirect(
      `/identity/verify-self?message=provider-api-error-${flwResponse.status}`
    );

  const flwAccountData = flwResponse.data.data;
  const newWallet = {
    userId: user?.id,
    uniqueId: await id(),
    accountNo: flwAccountData.account_number,
    bankName: flwAccountData.bank_name,
    flwAccountId: flwAccountData.id,
    txRef: txRef,
    idNumber: idNumber,
    idType: "BVN",
    dob: dob, // Store date of birth
    isActive: true,
    isVerified: true, // Assuming verification upon creation
    currency: flwAccountData.currency || "NGN", // Default to NGN or use what FLW returns
  };

  await Wallet.create(newWallet);

  // if (!userWallet) {
  //   redirect(
  //     `/identity/verify-self?message=provider-api-error-${flwResponse.status}`
  //   );
  // }

  await User.findByIdAndUpdate(user?.id, { isWallet: true });

  redirect("/wallet/${newWallet.uniqueId}?message=account-creation-success");
  return;
};

export const walletTransactionHistory = async () => {
  await dbConnect();
  const session = await auth();
  const wallet = await Wallet.findOne({ userId: session?.user?.id });
  const txRef = wallet.txRef;
  try {
    const flwResponse = await flwClient.get(
      `/virtual-accounts/${txRef}/transactions`
    );

    if (flwResponse.data && flwResponse.data.status === "success") {
      return { success: true, data: flwResponse.data.data };
    } else {
      console.error(
        "Flutterwave API error while fetching transaction history:",
        flwResponse.data
      );
      return {
        error: "Failed to fetch transaction history from provider.",
        details: flwResponse.data?.message || "Unknown provider error",
      };
    }
  } catch (error) {
    console.error("Error fetching Flutterwave transaction history:", error);
    let errorMessage =
      "An internal server error occurred while fetching transaction history.";
    if (error.isAxiosError && error.response) {
      console.error("Flutterwave API Error Data:", error.response.data);
      errorMessage =
        error.response.data?.message ||
        "Failed to communicate with payment provider.";
    }
    return { error: errorMessage, details: error.response?.data };
  }
};

// export const bvnVerification = async () => {
//   const bvn = 22659588182;

//   // if (!bvn || typeof bvn !== "string" || bvn.trim() === "") {
//   //   console.error("BVN is required for verification.");
//   //   return { error: true, message: "BVN is required for verification." };
//   // }

//   try {
//     const flwResponse = await flwClient.get(`/verifications/bvn/${bvn}`);

//     if (flwResponse.data && flwResponse.data.status === "success") {
//       // Successful verification, return the data from Flutterwave
//       return { success: true, data: flwResponse.data.data };
//     } else {
//       // Verification failed or API returned an error status
//       console.error(
//         "Flutterwave API error during BVN verification:",
//         flwResponse.data
//       );
//       return {
//         error: true,
//         message:
//           flwResponse.data?.message || "Failed to verify BVN with provider.",
//         details: flwResponse.data,
//       };
//     }
//   } catch (error) {
//     console.error("Error during BVN verification with Flutterwave:", error);
//     let errorMessage =
//       "An internal server error occurred during BVN verification.";
//     let errorDetails = null;

//     if (axios.isAxiosError(error) && error.response) {
//       console.error(
//         "Flutterwave API Error Data (BVN Verification):",
//         error.response.data
//       );
//       errorMessage =
//         error.response.data?.message ||
//         "Failed to communicate with payment provider for BVN verification.";
//       errorDetails = error.response.data;
//     } else if (error.message) {
//       errorMessage = error.message;
//     }

//     return { error: true, message: errorMessage, details: errorDetails };
//   }
// };
