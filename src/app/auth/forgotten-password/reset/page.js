import Image from "next/image"
import {images} from "@/constants"
import Link from "next/link"
import Password from "@/utilities/password/Password"
import { resetPassword } from "@/backend/action/user"
import Input from "@/utilities/input/Input"
// import Resend from "./Resend"

export const metadata = {
  title: `Watawara | Welcome Back`,
  description: `Forgot your password? No problem! Reset your account password quickly and securely. Enter your email address, and we'll send your otp to create a new password. Get back to enjoying amazing offers from us.`
}

export default async function Home({searchParams}) {
  const { email, status } = await searchParams
  return (
    <main className="w-11/12 mx-auto h-dvh flex items-center relative object-fit py-4">
      <div className="w-10/12 flex mx-auto border border-gray-400 max-md:border-none rounded-md overflow-hidden">
        <Image
          priority
          width={100}
          height={100}
          alt="Watawara official logo"
          src={`/images/default.png`}
          className="aspect-square border-r border-gray-300 w-1/2 h-auto mx-auto block max-md:hidden"
        />
        <div className="w-1/2 px-4 py-6 max-md:p-0 max-md:w-full mx-auto h-full grid place-content-center bg-white">
          <Image
            priority
            width={100}
            height={100}
            alt="Watawara official logo"
            src={images.logo}
            quality={100}
            className="aspect-square hidden max-md:block w-36 h-auto mx-auto"
          />
          <h1 className="mt-2 text-2xl font-bold text-black max-md:text-center">
            Watawara Password Reset
          </h1>
          <h5 className="text-base text-gray-600 max-md:text-center">
            Please enter the One-Time Password (OTP) that was sent to {email}
          </h5>
          {status && (
            <div className="my-2 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded text-center">
              {/* Display the cleaned error state directly */}
              {status}
            </div>
          )}
          <form action={resetPassword} className="mt-2">
            {/* one time password input field */}
            <Input title={`One Time Password`} type={`number`} name={`otp`} />
            {/* new password input field */}
            <Password />
            <input type="hidden" name="email" defaultValue={email} />
            <input
              type="submit"
              className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 my-1.5 bg-primary capitalize hover:bg-amber-300"
              value="Reset Password"
            />
          </form>
          {/* <Resend email={email} /> */}
          <p className="text-sm text-gray-800">
            Remembered your password?{" "}
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
