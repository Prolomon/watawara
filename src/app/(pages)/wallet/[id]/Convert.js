"use client"
import {ArrowLeftRight} from "lucide-react"
import {useRef} from "react"

export default function History () {
    const main = useRef()
    const crypto = useRef()
    const handleSwap = () => {
        if (main.current.classList.contains("order-1")) {
            alert("yes")
            main.current.classList.add("order-3")
            main.current.classList.remove("order-1")
            main.current.classList.add("order-1")
            main.current.classList.remove("order-3")
        }else {
            alert("no")
            main.current.classList.add("order-1")
            main.current.classList.remove("order-3")
            main.current.classList.add("order-1")
            main.current.classList.remove("order-3")
        }
    }
    return (
        <form className="rounded-lg shadow-md border border-gray-200 p-3">
            <h3 className="text-base font-semibold relative -top-1">Convert</h3>
            <div className="flex gap-2 items-center">
                <input name="main_balance" type="number" className="w-full order-1 rounded-md border border-gray-600 text-gray-600 p-1 text-lg " ref={main} defaultValue="0" />
                <button type="button" onClick={handleSwap} className="order-2 text-gray-800 bg-primary p-2 rounded-md shadow-sm"><ArrowLeftRight size={12} /></button>
                <input name="crypto" type="number" className="w-full order-1 rounded-md border border-gray-600 text-gray-600 p-1 text-lg" ref={crypto} defaultValue="0" />
            </div>
            <input type="submit" className="w-full border-none outline-none hover:bg-yellow-500 rounded-md capitalize text-gray-800 bg-primary p-1 text-base mt-1" value="swap" />
        </form>
    )
}