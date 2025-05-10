"use server";
import { flwClient } from "./wallet";
import { Wallet } from "../models/wallet.schema";
import { dbConnect } from "../server/server";
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { redirect } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const airtime = async (formData) => {
  try {
    await dbConnect();
    const session = await auth();

    if (!session?.user?.id) {
      return { error: true, message: "Authentication required." };
    }

    const userId = session.user.id;

    const amount = parseFloat(formData.get("amount"));
    const phoneNumber = formData.get("phoneNo");
    const network = formData.get("provider").toLowerCase();

    if (isNaN(amount) || amount < 100) {
      return { error: true, message: "Airtime can only be ₦100 and above." };
    }
    if (!phoneNumber || phoneNumber.length !== 11 || !/^\d+$/.test(phoneNumber)) {
      return { error: true, message: "Valid phone number is required." };
    }

    // Fetch user's wallet
    const userWallet = await Wallet.findOne({ userId: userId });
    if (!userWallet) {
      return { error: true, message: "Wallet not found." };
    }

    const currentBalance = parseFloat(userWallet.balance.toString());
    if (currentBalance < amount) {
      return { error: true, message: "Insufficient balance." };
    }

    const airtimeReference = `WTTWR-AIR-${userId.toString().slice(-4)}-${uuidv4()}`;

    const flwPayload = {
      country: "NG",
      amount: amount,
      type: "AIRTIME",
      reference: airtimeReference,
      provider
    };

    const flwResponse = await flwClient.post("/bill-payments", flwPayload);

    if (flwResponse.data && flwResponse.data.status === "success") {
      const airtimeData = flwResponse.data.data;
      console.log("Airtime Data from Flutterwave:", airtimeData);

      const newBalance = currentBalance - amount;
      userWallet.balance = newBalance.toString();
      await userWallet.save();

      return {
        success: true,
        message: "Airtime purchase successful.",
      };
    } else {
      // Flutterwave returned an error or non-success status
      console.error(
        "Flutterwave API error during airtime purchase:",
        flwResponse.data
      );
      return {
        error: true,
        message:
          flwResponse.data?.message ||
          "Failed to purchase airtime from provider.",
        details: flwResponse.data,
      };
    }
  } catch (error) {
    console.error("Error during airtime purchase:", error);
    let errorMessage =
      "An internal server error occurred during airtime purchase.";
    let errorDetails = null;

    if (error.code === "EAI_AGAIN") {
      errorMessage =
        "Network connectivity issue: Unable to resolve Flutterwave API hostname. Please check your internet connection and DNS settings, then try again.";
      errorDetails = {
        code: error.code,
        syscall: error.syscall,
        hostname: error.hostname,
      };
    } else if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Flutterwave API Error Data (Airtime):",
        error.response.data
      );
      errorMessage =
        error.response.data?.message ||
        "Failed to communicate with payment provider for airtime purchase.";
      errorDetails = error.response.data;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return { error: true, message: errorMessage, details: errorDetails };
  }
};