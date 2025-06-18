"use client";
import Image from "next/image";
import { images } from "@/constants";
import Link from "next/link";
import { forgottenPassword } from "@/backend/action/user";
import Input from "@/utilities/input/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader/loader";

// export const metadata = {
//   title: `Watawara | Welcome Back`,
//   description: `Forgot your password? No problem! Reset your account password quickly and securely. Enter your email address, and we'll send your otp to create a new password. Get back to enjoying amazing offers from us.`,
// };

export default function ForgottenForm({ searchParams }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target);
    const result = await forgottenPassword(formData);

    setMessage(result);

    if (result.success) {
      router.replace("/auth/forgotten-password/reset");
    }
    setIsPending(false);
  };

  return (
    <>
      {isPending && <Loader />}
      {message.message && message.success === true ? (
        <div className="text-sm text-green-600 py-2">{message.message}</div>
      ) : message.success === false ? (
        <div className="text-sm text-red-600 py-2">{message.message}</div>
      ) : null}
      <form onSubmit={handleSubmit} className="my-2">
        {/* input for email */}
        <Input title={`email`} type={`email`} name={`email`} />

        <input
          type="submit"
          className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-primary capitalize hover:bg-amber-300"
          value="Send One-Time Password"
        />
      </form>
    </>
  );
}
