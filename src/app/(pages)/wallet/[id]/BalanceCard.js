"use client"
import Link from "next/link"
import {ArrowLeftRight} from "lucide-react"

export default function BalanceCard ({ balance, point, unique }) {
    const handleSwap = () => {}
    return (
      <section className="rounded-lg shadow-md border border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-base font-semibold text-gray-800 capitalize">
              main balance
            </h6>
            <h1 className="text-2xl font-bold text-gray-800 pb-2.5">
              {balance}
            </h1>
            <Link
              href={`/wallet/${unique}/get-fund`}
              className="text-sm font-normal bg-primary text-gray-800 rounded-md py-2 px-3 capitalize mt-2"
            >
              add fund
            </Link>
          </div>
          <button
            type="button"
            onClick={handleSwap}
            className="text-gray-800 bg-primary p-2 rounded-md shadow-sm"
          >
            <ArrowLeftRight size={12} />
          </button>
          <div>
            <h6 className="text-base font-semibold text-gray-800 capitalize">
              ponit balance
            </h6>
            <h1 className="text-2xl font-bold text-gray-800 pb-2.5">{point}</h1>
            <Link
              href={`/wallet/${unique}/get-more-points`}
              className="text-sm font-normal bg-primary text-gray-800 rounded-md py-2 px-3 capitalize"
            >
              Get more points
            </Link>
          </div>
        </div>
      </section>
    );
}