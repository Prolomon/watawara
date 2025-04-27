"use client"
import Image from "next/image"
import {images} from "@/constants"
import Link from "next/link"
import Password from "@/utilities/password/Password"
import { login } from "@/backend/action/login"
import Input from "@/utilities/input/Input"
import { googleLogAuth } from "@/backend/action/login"
// import { facebookLogAuth } from "@/backend/action/login"

export function LoginForm () {
    return (
        <div className="w-[22rem] max-md:w-full mx-auto h-full grid place-content-center bg-white">
        <Image priority  width={100} height={100} alt="Watawara official logo" src={images.logo} className="aspect-square w-28 h-auto mx-auto" />
        <h1 className="mt-2 text-2xl font-bold text-black text-center">Welcome back to Watawara</h1>
        <h5 className="text-base text-gray-600 text-center">Enter your Login Credentials to continue enjoying our amazing offers.</h5>
        <form action={login} className="my-2">
          {/* username/email/phone no input field */}
          <Input title={`Email`} type={`email`} name={`email`} />
          {/* password input field */}
          <Password title="password" />
          <div className="flex justify-end">
            <Link href="/auth/forgotten-password" className="text-sm text-gray-800 hover:underline">Lost Password?</Link>
          </div>
          <input type="submit" className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-primary capitalize hover:bg-amber-300" value="login" />
        </form>
        <p className="text-sm text-gray-800 py-1">Don&apos;t have an Account Yet? <Link href="/auth/signup" className="text-primary font-semibold hover:underline">Create One</Link></p>
        {/* other login options */}
        <div className="flex gap-2 items-center"><span className="w-full h-0 border border-gray-200"></span><span className="text-gray-400 text-[12px] text-nowrap">Or continue with</span><span className="w-full h-0 border border-gray-200"></span></div>
        <div className="block mt-1">
          <button type="button" onClick={() => googleLogAuth()} className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-primary capitalize hover:bg-amber-300 flex gap-2 items-center justify-center cursor-pointer" >Continue with Google</button>
          {/* <button type="button" onClick={() => facebookLogAuth()} className="w-full rounded-md border-none outline-none text-gray-800 text-sm px-2 py-1.5 mt-2 bg-primary capitalize hover:bg-amber-300 flex gap-2 items-center justify-center cursor-pointer">Continue with Facebook</button> */}
        </div>
        <p className="text-gray-600 text-sm text-center mt-3">By continuing you have agreed to our Privacy Policy and our Terms and Conditions.</p>
      </div>
    )
}