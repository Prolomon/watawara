import { LoginForm } from "./LoginForm";
import Image from "next/image";

export const metadata = {
  title: `Watawara | Welcome Back`,
  description: `Login to enjoy our wonderful offers, discount and immersive funds transfer with our wallet.`,
};

export default async function Home({ params }) {
  return (
    <main className="w-11/12 mx-auto h-dvh flex items-center justify-center relative object-fit py-4">
      <div className="w-10/12 max-md:w-full flex mx-auto border border-gray-400 max-md:border-none rounded-md overflow-hidden">
        <Image
          priority
          width={100}
          height={100}
          alt="Watawara official logo"
          src={`/images/default.png`}
          className="aspect-square border-r border-gray-300 w-1/2 h-auto mx-auto block max-md:hidden"
        />
        <LoginForm />
      </div>
    </main>
  );
}
