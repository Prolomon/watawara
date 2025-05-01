"use client"
import { Mailer } from "@/backend/mailer";

export default function Resend({email}) {
  const handleResend = async () => {
    try {
      await Mailer(email, "otp");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  return (
    <button 
      type="button" 
      className="text-base" 
      onClick={handleResend}
    >
      Resend
    </button>
  );
}