"use client"
import {ArrowLeft} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Back () {
    const router = useRouter()
    return (
        <button type={`button`} onClick={() => {router.back()}} href="/airtime" className="text-gray-800 bg-transparent inline-flex items-center gap-2 font-semibold absolute left-0"><ArrowLeft size={18} /> Back</button>
    )
}