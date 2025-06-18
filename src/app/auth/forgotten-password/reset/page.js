import Image from "next/image"
import {images} from "@/constants"
import Link from "next/link"
import ResetForm from "./ResetForm"
import { dbConnect } from "@/backend/server/server"
import { User } from "@/backend/models/user.schema"
import { cookies } from "next/headers"

export const metadata = {
  title: `Watawara | Welcome Back`,
  description: `Forgot your password? No problem! Reset your account password quickly and securely. Enter your email address, and we'll send your otp to create a new password. Get back to enjoying amazing offers from us.`
}

export default async function Home({searchParams}) {
  const { id } = await searchParams
  await dbConnect()

  const user = await User.findOne({ _id: id})

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
            Please enter the One-Time Password (OTP) that was sent to{" "}
            {user?.email || (await cookies()).get("auth.watawara.email").value}
          </h5>
          <ResetForm id={id} />
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
