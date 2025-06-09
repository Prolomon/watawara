import Image from "next/image";
import { images } from "@/constants";
import Link from "next/link";
import { forgottenPassword } from "@/backend/action/user";
import Input from "@/utilities/input/Input";

export const metadata = {
  title: `Watawara | Welcome Back`,
  description: `Forgot your password? No problem! Reset your account password quickly and securely. Enter your email address, and we'll send your otp to create a new password. Get back to enjoying amazing offers from us.`,
};

export default async function Home({ searchParams }) {
  const { message } = await searchParams;
  return (
    <main className="w-11/12 mx-auto flex items-center justify-center h-dvh relative object-fit py-4">
      <div className="w-10/12 flex mx-auto border border-gray-400 max-md:border-none rounded-md overflow-hidden">
        <Image
          priority
          width={100}
          height={100}
          alt="Watawara official logo"
          src={`/images/default.png`}
          className="aspect-square border-r border-gray-300 w-1/2 h-auto mx-auto block max-md:hidden"
        />
        <div className="w-1/2 max-md:w-full mx-auto h-full grid place-content-center px-4 py-6 aspect-square max-md:aspect-auto max-md:p-0">
          <Image
            priority
            width={100}
            height={100}
            alt="Watawara official logo"
            src={images.logo}
            className="aspect-video w-36 h-auto mx-auto hidden max-md:block"
          />
          <h1 className="mt-2 text-2xl font-bold text-black max-md:text-center">
            Watawara Password Recovery
          </h1>
          <h5 className="text-base text-gray-600 max-md:text-center">
            Enter your Email address to verify your account to continue.
          </h5>
          {message && (
            <div className="my-2 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded">
              {/* Display the cleaned error state directly */}
              {message}
            </div>
          )}
          <form action={forgottenPassword} className="my-2">
            {/* input for email */}
            <Input title={`email`} type={`email`} name={`email`} />

            <input
              type="submit"
              className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-primary capitalize hover:bg-amber-300"
              value="Send One-Time Password"
            />
          </form>
          <p className="text-sm text-gray-800">
            Already with us?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
          <p className="text-sm text-gray-800">
            Don&apos; have an account with us?{" "}
            <Link
              href="/auth/signup"
              className="text-primary font-semibold hover:underline"
            >
              Create One
            </Link>
          </p>
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
      </div>
    </main>
  );
}
