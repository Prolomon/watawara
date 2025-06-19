"use client";
import Image from "next/image";
import { images } from "@/constants";
import Link from "next/link";
import Password from "@/utilities/password/Password";
import Input from "@/utilities/input/Input";
import { login } from "@/backend/action/user";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "@/components/loader/loader";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true)

    // try {
    const formData = new FormData(e.target);
    const result = await login(formData);

    setMessage(result);

    if (
      result.message ===
      "User account is not active. Please activate your account."
    ) {
      router.replace("/auth/otp");
    }

    if (result.success) {
      router.replace("/");
      setIsPending(false)
    } else {
      setIsPending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsPending(true);
    setError(null);
    try {
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });
      if (result?.error) {
        console.error("Google Sign-In Error:", result.error);
        setError(searchParams.get("error") || "Failed to sign in with Google.");
        setIsPending(false);
      } else if (result?.ok && result?.url) {
        router.push(result.url);
      }
    } catch (googleError) {
      console.error("Google Sign-In Exception:", googleError);
      setError("An unexpected error occurred initiating Google Sign-In.");
      setIsPending(false);
    }
  };

  return (
    <div className="w-1/2 px-4 py-8 max-md:p-0 max-md:w-full mx-auto h-full grid place-content-center bg-white">
      {isPending && <Loader />}
      <Image
        priority
        width={100}
        height={100}
        alt="Watawara official logo"
        src={images.logo}
        className="aspect-square w-28 h-auto mx-auto hidden max-md:block"
      />
      <h2 className="text-2xl font-semibold text-gray-800 max-md:text-center">
        Welcome Back!
      </h2>
      <h5 className="text-base text-gray-600 max-md:text-center">
        Unlock exclusive deals and offers - Sign in to your Watawara account!
      </h5>

      {/* Display error message */}
      {message.message && message.success === true ? (
        <div className="text-sm text-green-600 py-2">
          {message.message}
        </div>
      ) : message.success === false ? (
        <div className="text-sm text-red-600 py-2">
          {message.message}
        </div>
      ) : null}

      {/* login form - Use onSubmit */}
      <form onSubmit={handleSubmit} className="my-2">
        {/* username/email/phone no input field */}
        <Input title={`Email`} type={`email`} name={`email`} required />
        {/* password input field */}
        <Password title="password" required />
        <div className="flex justify-end">
          <Link
            href="/auth/forgotten-password"
            className="text-sm text-gray-800 hover:underline"
          >
            Lost Password?
          </Link>
        </div>
        <input
          type="submit"
          className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-primary capitalize hover:bg-amber-300 disabled:opacity-50"
          value={isPending ? "Logging in..." : "Login"}
          // disabled={isPending}
        />
      </form>

      {/* signup link */}
      <p className="text-sm text-gray-800 py-1">
        Don&apos;t have an Account Yet?{" "}
        <Link
          href="/auth/signup"
          className="text-primary font-semibold hover:underline"
        >
          Create One
        </Link>
      </p>

      {/* other login options */}
      <div className="flex gap-2 items-center">
        <span className="w-full h-0 border border-gray-200"></span>
        <span className="text-gray-400 text-[12px] text-nowrap">
          Or continue with
        </span>
        <span className="w-full h-0 border border-gray-200"></span>
      </div>

      {/* section for google authentication */}
      <div className="block mt-1">
        <button
          type="button"
          // onClick={handleGoogleSignIn}
          className="w-full rounded-md border border-gray-600 outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-transparent capitalize flex gap-2 items-center justify-center cursor-pointer disabled:opacity-50"
        >
          <Image
            alt="Google logo"
            src={`/images/google.png`}
            width={20}
            height={20}
            className="aspect-square rounded-full "
          />
          Continue with Google
        </button>
      </div>

      <p className="text-gray-600 text-sm text-center mt-3">
        By continuing you have agreed to our{" "}
        <Link href={`/w/privacy-policy`} className="hover:underline">
          Privacy Policy
        </Link>{" "}
        and our{" "}
        <Link href={`/w/terms-and-conditions`} className="hover:underline">
          Terms and Conditions.
        </Link>
      </p>
    </div>
  );
}
