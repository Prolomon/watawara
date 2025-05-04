import Image from "next/image";
import { images } from "@/constants";
import Link from "next/link";
import Input from "@/utilities/input/Input";
import { userOtp } from "@/backend/action/user";

export const metadata = {
  title: `Watawara | Verify account`,
  description: `Register to enjoy our wonderful offers, discount and immersive funds transfer with our wallet.`,
};

export default async function Home({ searchParams }) {
  const {email, authType} = await searchParams;
  return (
    <main className="w-11/12 mx-auto h-dvh grid place-content-center relative">
      <div className="w-10/12 flex mx-auto border border-gray-400 max-md:border-none rounded-md overflow-hidden">
        <Image
          priority
          width={100}
          height={100}
          alt="Watawara official logo"
          src={`/images/default.png`}
          className="aspect-square border-r border-gray-300 w-1/2 h-auto mx-auto block max-md:hidden"
        />
        <div className="w-1/2 p-4 max-md:p-0 grid max-md:block place-content-center max-md:w-full mx-auto h-auto bg-white">
          <Image
            priority
            width={100}
            height={100}
            alt="Watawara official logo"
            src={images.logo}
            className="aspect-square w-24 hidden max-md:block h-auto mx-auto"
          />
          <h1 className="mt-2 text-2xl font-bold text-black max-md:text-center">
            Account Verification
          </h1>
          <h5 className="text-base max-md:text-sm text-gray-600 max-md:text-center">
            To continue enter the One-Time Password sent to ({email}).
            Please check your inbox and follow the instructions to verify your
            account.
          </h5>
          <form action={userOtp} className="my-2">
            {message === "all-fields-required" ? (
              <div className="w-full text-sm border-red-600 border rounded-md bg-red-300 text-red-700 p-2">
                Provide a valid OTP code
              </div>
            ) : message === "invalid-otp" ? (
              <div className="w-full text-sm border rounded-md bg-red-300 text-red-700 p-2">
                Incorrect OTP code provided
              </div>
            ) : null}
            {/* user email address */}
            <Input title={`One-Time Password`} type={`number`} name={`otp`} />
            <input type="hidden" name="email" defaultValue={message.email} />
            <input
              type="hidden"
              name="authType"
              defaultValue={authType} />
            <input
              type="submit"
              className="w-full rounded-md border-none outline-none text-gray-800 text-sm my-1 px-2 py-1.5 bg-primary cursor-pointer capitalize hover:bg-amber-400"
              value="Verify OTP"
            />
          </form>
          <div className="text-sm text-gray-500 text-center my-2">
            By verifying, you have agreed to out{" "}
            <p href="/wata/privacy-policy" className=" hover:underline">
              Privacy Policy
            </p>{" "}
            and{" "}
            <p
              href="/wata/terms-and-conditions"
              className=" hover:underline"
            >
              Terms and conditions
            </p>
          </div>
          <br />
          <br />
        </div>
      </div>
    </main>
  );
}
