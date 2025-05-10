"use client"
import Input from "@/utilities/input/Input";
import { createWallet } from "@/backend/wallet/wallet";
import { useSearchParams } from "next/navigation";

export default function VerifyForm() {
  const message = useSearchParams()?.get("message");
  return (
    <form action={createWallet}>
      {message && (
        <div
          className={`text-sm border rounded-md p-2 ${
            message === "account-creation-success" || message === "success" // Assuming "success" can also come from other flows
              ? "text-green-500 border-green-600 bg-green-200"
              : "text-red-500 border-red-600 bg-red-200"
          }`}
        >
          {message === "all-fields-required" &&
            "All fields are required. Please fill in your BVN and Date of Birth."}
          {message === "id-conflict" &&
            "This ID is already associated with another user. Please contact support or use a different ID."}
          {message === "id-already-verified" &&
            "This ID is already verified for your account. You can proceed to your wallet."}
          {message === "email-mismatch" &&
            "The email provided does not match your current session. Please use the email associated with your account."}
          {message === "user-not-found" &&
            "User account not found. Please ensure you are logged in correctly."}
          {message === "unauthenticated" &&
            "You are not authenticated. Please log in."}
          {message === "wallet-already-exists" &&
            "A wallet already exists for your account."}
          {message.startsWith("provider-api-error-") &&
            `There was an issue with the payment provider. Please try again later. (Error: ${message.replace("provider-api-error-", "")})`}
          {message === "wallet-creation-error" &&
            "An unexpected error occurred while creating your wallet. Please try again."}
          {message === "Failed to create virtual account with provider" &&
            "We couldn't create your virtual account with our provider. Please try again or contact support."}
          {message ===
            "Flutterwave secret key is not configured. Cannot create virtual account." &&
            "System configuration error. Please contact support."}
          {message ===
            "Failed to save wallet details locally after successful virtual account creation." &&
            "Account created with provider, but failed to save locally. Please contact support."}
          {message === "account-creation-success" &&
            "Verification successful! Your wallet is being set up."}
          {message === "success" && "Operation successful."}
          {/* Add more specific messages based on the redirects in your createWallet server action */}
        </div>
      )}
      <Input
        type="number"
        name={`bvn`}
        title="Bank Verification Number (BVN)"
      />
      <Input type="date" name={`dob`} title="Date of Birth" />

      <input
        className="w-full bg-primary rounded-md p-1.5 mt-2 cursor-pointer font-semibold text-base text-gray-800"
        type="submit"
        value="Verify Me"
      />
    </form>
  );
}
