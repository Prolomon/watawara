"use client";
import Image from "next/image";
import { images } from "@/constants";
import Link from "next/link";
import Password from "@/utilities/password/Password";
import { createAccount } from "@/backend/action/user";
import Select from "@/utilities/select/Select";
import Input from "@/utilities/input/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader/loader";

// export const metadata = {
//   title: `Watawara | Create Account`,
//   description: `Register to enjoy our wonderful offers, discount and immersive funds transfer with our wallet.`
// }

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true)

    const formData = new FormData(e.target);
    const result = await createAccount(formData);

    setMessage(result);

    router.replace("/auth/otp");
    setIsPending(false)
  };

  return (
    <main className="w-11/12 mx-auto h-full relative">
      {isPending && <Loader />}
      <div className="w-[25rem] max-md:w-full mx-auto h-auto relative top-8 bottom-16 bg-white">
        <Image
          priority
          width={100}
          height={100}
          alt="Watawara official logo"
          src={images.logo}
          className="aspect-square w-24 h-auto mx-auto"
        />
        <h1 className="mt-2 text-2xl font-bold text-black text-center">
          Welcome to Watawara
        </h1>
        <h5 className="text-base text-gray-600 text-center">
          Enter your Credentials to continue shopping with amazing offers and
          discounts.
        </h5>
        {message.message && message.success === true ? (
          <div className="text-sm  text-green-600 py-2">{message.message}</div>
        ) : message.success === false ? (
          <div className="text-sm text-red-600 py-2">{message.message}</div>
        ) : null}
        <form onSubmit={handleSubmit} className="my-2">
          {/* user fullname */}
          <Input title={`fullname`} type={`text`} name={`fullname`} />
          {/* user email address */}
          <Input title={`email`} type={`email`} name={`email`} />
          {/* user phone number */}
          <Input title={`phone no`} type={`tel`} name={`phone_no`} />
          {/* user date of birth */}
          <Input title={`date of birth`} type={`date`} name={`dob`} />
          {/* user gender */}
          <Select title="gender" name="gender" options={["Male", "Female"]} />
          {/* login input field */}
          <Password title="password" />
          <input
            type="submit"
            className="w-full rounded-md border-none outline-none text-gray-800 text-sm my-1 px-2 py-1.5 bg-primary cursor-pointer capitalize hover:bg-amber-400"
            value="join now"
          />
        </form>
        <p className="text-sm text-black text-center">
          Already with us?{" "}
          <Link
            href="/auth/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
        <p className="text-sm text-gray-500 text-center my-2">
          By Registering with us you have agreed to out{" "}
          <Link href="/w/privacy-policy" className=" hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/w/terms-and-conditions" className=" hover:underline">
            Terms and conditions
          </Link>
        </p>
        <br />
        <br />
      </div>
    </main>
  );
}
