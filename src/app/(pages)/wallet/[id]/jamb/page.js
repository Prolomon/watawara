import TransferForm from "./JambForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: `Watawara | Wallet - Jamb`,
  description: `Jump in to an amazing world of sales and marketing.`,
};

export default function Home({ params }) {
  return (
    <section className="w-full h-full relative object-fit overflow-hidden py-4 block">
      <div className="flex gap-3 items-center mb-2">
        <Link
          href="/wallet"
          className="inline-flex items-center gap-2 text-base font-semibold text-gray-800"
        >
          <ArrowLeft size={18} /> Back
        </Link>
        <h3 className="text-lg w-full text-center font-semibold text-gray-800">
          Jamb
        </h3>
      </div>
      <TransferForm />
    </section>
  );
}
