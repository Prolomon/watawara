import Image from "next/image"
import {images} from "@/constants"
import Link from "next/link"
import { forgottenPassword } from "@/backend/action/forgotten-password"
import Input from "@/utilities/input/Input"

export const metadata = {
  title: `Watawara | Welcome Back`,
  description: `Forgot your password? No problem! Reset your account password quickly and securely. Enter your email address, and we'll send your otp to create a new password. Get back to enjoying amazing offers from us.`
}

export default async function Home({params}) {
  return (
    <main className="w-11/12 mx-auto h-full relative object-fit py-4">
      <div className="w-[22rem] max-md:w-full mx-auto h-full grid place-content-center bg-white">
        <Image priority  width={100} height={100} alt="Watawara official logo" src={images.logo} className="aspect-video w-36 h-auto mx-auto" />
        <h1 className="mt-2 text-2xl font-bold text-black text-center">Watawara Password Recovery</h1>
        <h5 className="text-base text-gray-600 text-center">Enter your Email address to verify your account to continue.</h5>
        <form action={forgottenPassword} className="my-2">
          {/* input for email */}
          <Input title={`email`} type={`email`} name={`email`} />
          
          <input type="submit" className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-primary capitalize hover:bg-amber-300" value="submit" />
        </form>
        <p className="text-sm text-gray-800">Already with us? <Link href="/auth/login" className="text-primary font-semibold hover:underline">Login</Link></p>
        <p className="text-sm text-gray-800">Don&apos; have an account with us? <Link href="/auth/signup" className="text-primary font-semibold hover:underline">Create One</Link></p>
        <p className="text-gray-600 text-sm text-center mt-3">By continuing you have agreed to our Privacy Policy and our Terms and Conditions.</p>
      </div>
    </main>
  );
}
