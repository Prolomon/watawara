import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Disclaimer from "./Disclaimer";

export default function Safety () {
    return (
        <>
        <Disclaimer />
      <div>
        <Link
          href="#"
          className="p-3 border text-gray-600 font-semibold text-base border-gray-200 rounded-md shadow-sm flex items-center justify-between mt-1.5"
        >
          <span>Return Policy</span>
          <ChevronRight size={18} />
        </Link>
        <Link
          href="#"
          className="p-3 border text-gray-600 font-semibold text-base border-gray-200 rounded-md shadow-sm flex items-center justify-between mt-1.5"
        >
          <span>Fraud Penalty</span>
          <ChevronRight size={18} />
        </Link>
        <Link
          href="#"
          className="p-3 border text-gray-600 font-semibold text-base border-gray-200 rounded-md shadow-sm flex items-center justify-between mt-1.5"
        >
          <span>Customer&apos;s Agreement</span>
          <ChevronRight size={18} />
        </Link>
      </div>
      </>
    );
}