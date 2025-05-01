import {Search} from "lucide-react"
import Link from "next/link"

export default function History () {
    const history = false
    return (
        <section className="rounded-lg shadow-md border border-gray-200 p-3">
            <div className="flex border border-gray-500 items-center rounded-md gap-1 p-1">
                <Search className="text-gray-500" size={18} />
                <input type="search" name="search" className="text-base w-full outline-none border-none" placeholder="Search history" />
            </div>
            <ul className={`w-full h-auto mt-2 ${history ? "grid place-content-center" : null}`}>
                {history ? 
                    <li className="w-full flex items-start py-2 border-b border-gray-400 justify-between">
                        <div>
                            <Link href="wallet/history/history_id" className="font-semibold text-base">Taiwo Oyetade Solomon</Link>
                            <h1 className="text-sm font-normal text-gray-500 relative -top-1">03/06/45|02:00PM</h1>
                        </div>
                        <h3 className="text-base font-semibold">₦322.00</h3>
                    </li> : <p className="text-lg text-gray-400 text-center my-12 font-normal">No History. Make a transaction to get one.</p>}
            </ul>
        </section>
    )
}