import BettingForm from "./BettingForm"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"

export const metadata = {
  title: `Jumora | Wallet - Betting`,
  description: `Jump in to an amazing world of sales and marketing.`,
}

export default function Home({params}) {
  return (
    <section className="w-full h-full relative object-fit overflow-hidden py-4 block">
      <div className="flex gap-3 items-center mb-2">
        <Link href="/wallet" className="text-gray-800 inline-flex gap-2 items-center font-semibold text-base"><ArrowLeft size={18} /> Back</Link>
        <h3 className="w-full text-center font-semibold text-gray-800 text-lg">Betting</h3>
      </div>
      <BettingForm />
    </section>
  );
}
