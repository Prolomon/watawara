import EletricityForm from "./EletricityForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: `Watawara | Wallet - Eletricity`,
  description: `Jump in to an amazing world of sales and marketing.`,
};

export default function Home({ params }) {
  return (
    <section className="w-full h-full relative object-fit overflow-hidden py-4 block">
      <div className="flex gap-3 items-center mb-2">
        <Link
          href="/wallet"
          className="text-gray-800 inline-flex items-center gap-2 font-semibold text-base"
        >
          <ArrowLeft size={18} /> Back
        </Link>
        <h3 className="text-lg w-full text-center font-semibold text-gray-800">
          Eletricity
        </h3>
      </div>
      <EletricityForm />
    </section>
  );
}
