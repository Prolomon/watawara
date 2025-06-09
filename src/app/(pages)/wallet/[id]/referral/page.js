import Referal from "./Referal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: `Watawara | Wallet - Referal`,
  description: `Jump in to an amazing world of sales and marketing.`,
};

export default function Home({ params }) {
  return (
    <section className="w-full h-full relative object-fit overflow-hidden py-4 block">
      <Link
        href="/wallet"
        className="text-gray-800 inline-flex gap-2 items-center font-semibold text-base"
      >
        <ArrowLeft size={18} /> Back
      </Link>
      <Referal />
    </section>
  );
}
