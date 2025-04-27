"use client"
import Link from "next/link"
import { AlignLeft, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { categories } from "@/backend/category"

export default function CategoryNavigation() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const pathname = usePathname()

    const minCategory = ["stores", "best seller", "top rated", "limited sale", "sponsored sales", "mystery box", "services"]
    const catalogue = ["fashion & clothing", "agriculture & garden", "electronics", "accessories", "toys & games", "health & beauty", "sport & entertainment", "home & kitchen", "book", "furniture", "phone and telecommunications", "babies and kids"]

    const handleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])
    return (
        <div className={`block max-md:hidden ${pathname.slice(0, 7) === '/wallet' ? "hidden": null}`}>
            <nav className="w-full overflow-x-auto scroll relative">
                <div className="w-11/12 flex flex-nowrap items-center mx-auto mt-2 justify-between">
                    <button className="text-[14px] inline-flex items-center gap-2 py-1.5 text-nowrap px-3.5 rounded-full bg-gray-200 text-gray-800" onClick={handleMenu}>
                        <AlignLeft size={20} />
                        All Categories
                    </button>
                    {minCategory?.map(_c => (
                        <p key={_c} href={`/category/${_c?.toLowerCase().replace(/\s+/g, "-")}`} className="text-[14px] text-gray-800 font-semibold px-4 py-1.5 text-nowrap rounded-full hover:bg-gray-200 capitalize">{_c}</p>
                    ))}
                </div>
            </nav>
            <div ref={dropdownRef} className={`w-64 h-auto rounded-lg shadow-sm transition transition-discrete duration-150 ease-in bg-white px-3 border border-gray-200 absolute top-[6.7rem] left-[4%] ${isOpen ? "block" : "hidden"}`}>
                <ul className="w-full block">
                    {categories?.map(_c => (
                        <li key={_c.category_name}><Link href={`/category/${_c.category_name?.replace(/\s+/g, "-")}`} className="text-base font-normal hover:text-primary text-nowrap capitalize block my-2">{_c.category_name}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}