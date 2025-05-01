import AirtimeForm from "./AirtimeForm"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"

export const metadata = {
  title: `Jeara | Airtime`,
  description: `Jump in to an amazing world of sales and marketing.`,
}

export default function Home({params}) {
  return (
    <section className="w-full h-full relative object-fit overflow-hidden py-4 block">
      <div className="flex gap-4 items-center mb-2">
        <Link href="/wallet" className="text-gray-800 inline-flex items-center gap-2 font-semibold"><ArrowLeft size={18} /> Back</Link>
        <h3 className="w-full text-lg font-semibold text-gray-800 text-center">Get Airtime</h3>
      </div>
      <AirtimeForm />
    </section>
  );
}
