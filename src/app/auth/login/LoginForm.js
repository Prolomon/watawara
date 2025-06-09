"use client";
import Image from "next/image";
import { images } from "@/constants";
import Link from "next/link";
import Password from "@/utilities/password/Password";
import Input from "@/utilities/input/Input";
import { login } from "@/backend/action/user";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsPending(true);
  //   setError(null); // Clear previous errors
  //   const formData = new FormData(event.currentTarget);

  //   try {
  //     const result = await login(formData); // This calls your server action

  //     if (result?.error) {
  //       let errorMessage = result.error;
  //       // Clean up the "Read more at..." link if present
  //       if (typeof errorMessage === "string") {
  //         const linkText =
  //           "Read more at https://errors.authjs.dev#credentialssignin"; // Or other error links
  //         if (errorMessage.includes(linkText)) {
  //           errorMessage = errorMessage.replace(linkText, "").trim();
  //         }
  //       }

  //       // Handle specific error types from Auth.js or your custom AuthErrors
  //       if (result.error === "CredentialsSignin") {
  //          setError("Invalid email or password. Please try again.");
  //       } else if (result.error === "AccountInactive") { // Changed from "Account inactive"
  //          setError("Your account is inactive. Please check your email or contact support.");
  //          // Optionally, redirect to OTP or a specific page:
  //          // router.push(`/auth/activate?email=${formData.get("email")}`);
  //       } else if (result.error === "AccountBanned") { // Changed from "Account banned"
  //          setError("Your account has been banned. Please contact support.");
  //       } else {
  //          // Display the error message from NextAuth or a generic one
  //          setError(errorMessage || "Login failed. Please try again.");
  //       }
  //     } else if (result?.ok) {
  //       // Login successful
  //       router.push("/");
  //     } else {
  //       // Fallback for unexpected response structure
  //       setError("An unexpected issue occurred during login. Please try again.");
  //     }
  //   } catch (e) {
  //     console.error("Login form submission error:", e);
  //     setError("Failed to submit login form. Please check your connection.");
  //   } finally {
  //     setIsPending(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      {!message?.success && (
        <div className="my-2 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded text-center">
          {/* Display the cleaned error state directly */}
          {message?.message}
        </div>
      )}

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
          onClick={handleGoogleSignIn}
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
