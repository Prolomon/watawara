"use server";
import { flwClient } from "./wallet";
import { Wallet } from "../models/wallet.schema";
import { dbConnect } from "../server/server";
import { auth } from "../../../auth";
import { User } from "../models/user.schema";
import { redirect } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const bank = async (formData) => {
  try {
    await dbConnect();
    const session = await auth();

    if (!session?.user?.id) {
      // Not authenticated
      return { error: true, message: "Authentication required." };
    }

    const userId = session.user.id;

    // Get transfer details from formData
    const amount = parseFloat(formData.get("amount"));
    const bankCode = formData.get("bank"); // e.g., "044" for Access Bank
    const accountNumber = formData.get("accountNo");
    const narration = formData.get("remark") || "Wallet Transfer";
    const currency = "NGN"; // Default to NGN

    if (isNaN(amount) || amount < 100)
      return {
        error: true,
        message: "Transfer amount cannot be less than ₦100",
      };
    if (!bankCode || !accountNumber)
      return {
        error: true,
        message: "Bank code and account number are required.",
      };

    const userWallet = await Wallet.findOne({ userId: userId });
    if (!userWallet) return { error: true, message: "Wallet not found." };

    const currentBalance = parseFloat(userWallet.balance.toString());
    if (currentBalance < amount)
      return { error: true, message: "Insufficient balance." };

    const transferReference = `WTTWR-TRF-${userId.toString().slice(-4)}-${uuidv4()}`;

    const flwPayload = {
      account_bank: bankCode,
      account_number: accountNumber,
      amount: amount,
      narration: narration,
      currency: currency,
      reference: transferReference,
      debit_currency: currency,
    };

    const flwResponse = await flwClient.post("/transfers", flwPayload);

    if (flwResponse.data && flwResponse.data.status === "success") {
      const transferData = flwResponse.data.data;

      const newBalance = currentBalance - amount;
      userWallet.balance = newBalance.toString();
      await userWallet.save();

      return {
        success: true,
        message: "Transfer initiated successfully.",
      };
    } else {
      return {
        error: true,
        message:
          flwResponse.data?.message ||
          "Failed to initiate transfer with provider.",
        details: flwResponse.data,
      };
    }
  } catch (error) {
    let errorMessage = "An internal server error occurred during the transfer.";
    let errorDetails = null;

    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Flutterwave API Error Data (Transfer):",
        error.response.data
      );
      errorMessage =
        error.response.data?.message ||
        "Failed to communicate with payment provider for transfer.";
      errorDetails = error.response.data;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return { error: true, message: errorMessage, details: errorDetails };
  }
};
