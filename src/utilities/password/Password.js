"use client"
import {useState} from "react"
import { Eye, EyeOff } from "lucide-react"

export default function Password ({title}) {
    const [show, setShow] = useState(false)
    const reveal = () => {
        setShow(!show)
    }
    return (
        <div className="mb-1.5">
            <label htmlFor={title?.replace(/\s+/g, "-")} className="text-sm font-semibold text-gray-700 capitalize">{title? title : "new password"}</label>
            <div className="flex items-center w-full rounded-md border border-gray-400 px-2 py-1.5 mt-1 bg-transparent">
                <input id={title?.replace(/\s+/g, "-")} type={show ? "text" : "password"} name="password" className="w-full border-none  outline-none text-gray-800 text-sm mt-1 bg-transparent" />
                <button type="button" onClick={reveal} >
                    {!show? <Eye size={18} className="text-gray-600" />  : <EyeOff size={18} className="text-gray-600" /> }
                </button>
            </div>
            
        </div>
    )
}