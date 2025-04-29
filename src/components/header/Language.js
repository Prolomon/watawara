"use client"
import { useState, useRef, useEffect } from "react"
import {images} from "@/constants"
import Image from "next/image"
import { userSession } from "@/backend/server/userSession"

export default function Language () {
    const [account, setAccount] = useState(false)
    const dropdownRef = useRef(null)
    
    const handleChange = () => {
        setAccount(!account)
    } 
    
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setAccount(false)
        }
    }
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const countries = [
        {
            country: "Nigeria",
            short: "NG"
        },
    ];

    const currencies = [
        {
            currency: "Naira",
            short: "NGN"
        },
    ];

    const languages = [
        {
            lang: "English",
            short: "en-NG"
        },
    ];

    return (
        <div className="w-auto relative">
            <button onClick={handleChange} className="w-auto gap-1 flex text-normal max-md:hidden font-semibold uppercase items-center">
                <Image width={100} height={100} alt="country flag" src={images.nigeria} priority className="aspect-square rounded-full w-8 h-8" />
                <span className="text-sm">EN</span>
            </button>
            <form ref={dropdownRef} className={`${!account ? "hidden" : "block"} w-48 rounded-md bg-white shadow-md border border-gray-300 absolute right-0 top-12 z-10 h-auto p-2.5 text-gray-600`}>
                {/* select for countries */}
                <div className="mb-1.5">
                    <label htmlFor="countries" className="text-sm font-semibold text-gray-700 capitalize">Country</label>
                    <div className="w-full rounded-md border border-gray-400 text-gray-800 text-sm mt-1 px-2 py-1.5">
                        <select name={`countries`} id={`countries`} className="capitalize w-full border-none outline-none bg-transparent" defaultValue={userSession?.country}>
                        {countries?.map(_o => (
                            <option key={_o.short}  value={_o.short} className="capitalize">{_o.country}</option>
                        ))}
                        </select>
                    </div>
                </div>
                {/* select for language */}
                <div className="mb-1.5">
                    <label htmlFor="language" className="text-sm font-semibold text-gray-700 capitalize">Language</label>
                    <div className="w-full rounded-md border border-gray-400 text-gray-800 text-sm mt-1 px-2 py-1.5">
                        <select name={`language`} id={`language`} className="capitalize w-full border-none outline-none bg-transparent" defaultValue={userSession.language}>
                        {languages?.map(_o => (
                            <option key={_o.short} value={_o.short} className="capitalize">{_o.lang}</option>
                        ))}
                        </select>
                    </div>
                </div>
                {/* select for currency */}
                <div className="mb-1.5">
                    <label htmlFor="currency" className="text-sm font-semibold text-gray-700 capitalize">Currency</label>
                    <div className="w-full rounded-md border border-gray-400 text-gray-800 text-sm mt-1 px-2 py-1.5">
                        <select name={`currency`} id={`currency`} className="capitalize w-full border-none outline-none bg-transparent" defaultValue={userSession.currency}>
                        {currencies?.map(_o => (
                            <option key={_o.short} value={_o.short} className="capitalize">{_o.currency}</option>
                        ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="text-sm hover:bg-gray-700 w-full rounded-full font-semibold p-1.5 mt-2 text-center text-white gap-2 bg-gray-800">Save</button>
            </form>
        </div>
    )
}