"use client";
import Password from "@/utilities/password/Password";
import { resetPassword } from "@/backend/action/user";
import Input from "@/utilities/input/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader/loader";

export default function ResetForm({ id }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target);
    formData.set("id", id);
    const result = await resetPassword(formData);

    setMessage(result);

    if (result.success) {
      router.replace("/auth/login");
    }

    setIsPending(false);
  };

  return (
    <>
      {isPending && <Loader />}
      {message.message && message.success === true ? (
        <div className="text-sm  text-green-600 py-2">{message.message}</div>
      ) : message.success === false ? (
        <div className="text-sm text-red-600 py-2">{message.message}</div>
      ) : null}
      <form onSubmit={handleSubmit} className="mt-2">
        {/* one time password input field */}
        <Input title={`One Time Password`} type={`number`} name={`otp`} />
        {/* new password input field */}
        <Password />
        <input
          type="submit"
          className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 my-1.5 bg-primary capitalize hover:bg-amber-300"
          value="Reset Password"
        />
      </form>
    </>
  );
}
