"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserRound, ChevronDown, Newspaper, PackageCheck, ChevronUp, User, Users, Settings, MessageCircleQuestion, Map, Ticket } from "lucide-react"

export default function Account({avatar, fullname}) {
    const [account, setAccount] = useState(false)
    const dropdownRef = useRef(null)
    const pathname = usePathname()

    const handleAccount = () => {
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

    useEffect(() => {
        setAccount(false)
    }, [pathname])

    const info = [
        {
          "href": `/account/${fullname.toLowerCase().slice(0, fullname.indexOf(" "))}`,
          "text": "Profile",
          "icon": <User size={20} />
        },
        {
          "href": "/followed-stores",
          "text": "Followed Stores",
          "icon": <Users size={20} />
        },
        {
            "href": "/checkout",
            "text": "Checkout",
            "icon": <PackageCheck size={20} />
        },
        {
            "href": "/reviews",
            "text": "Reviews",
            "icon": <Newspaper size={20} />
        },
        {
          "href": "/address",
          "text": "Address",
          "icon": <Map size={20} />
        },
        {
            "href": "/coupons",
            "text": "Coupons",
            "icon": <Ticket size={20} />
          },
        {
          "href": "/frequently-asked-questions",
          "text": "Frequently asked Questions",
          "icon": <MessageCircleQuestion size={20} />
        },
        {
          "href": "/settings",
          "text": "Settings",
          "icon": <Settings size={20} />
        }
      ]
    return (
        <div>
            {fullname ? 
                <>
                <Link href={`/account/${fullname.toLowerCase().slice(0, fullname.indexOf(" "))}`} className="flex gap-2 items-center text-base text-gray-800 font-semibold max-md:hidden">
                    <Image alt="avatar image" width={40} height={40} priority src={avatar ? avatar : "/images/avatar.jpg"} className="text-gray-800 aspect-square bg-primary rounded-full inline-flex place-content-center" />
                    <span className="max-md:hidden capitalize">{fullname.toLowerCase().slice(0, fullname.indexOf(" "))}</span>
                </Link>
                <div onClick={handleAccount} className="hidden max-md:flex gap-2 items-center text-base text-gray-800 font-semibold">
                    <Image alt="avatar image" width={40} height={40} priority src={avatar ? avatar : "/images/avatar.jpg"} className="text-gray-800 aspect-square bg-primary rounded-full inline-flex place-content-center" />
                    {!account ? <ChevronDown size={16} className="mt-1 -ml-1" /> : <ChevronUp size={16} className="mt-1 -ml-1" />}
                </div>
                </> :
                <Link href="/auth/login" className="w-auto font-semibold flex gap-2 items-center text-gray-800 max-md:p-3 max-md:bg-gray-200 max-md:rounded-full text-base hover:text-primary"><UserRound size={20} />
                    <span className="max-md:hidden">Login/Sign up</span>
                </Link>
            }
            <div ref={dropdownRef} className={`${!account ? "hidden" : "block"} w-64 rounded-md bg-white shadow-md border border-gray-300 absolute right-0 top-12 z-10 h-auto p-2.5 text-gray-600`}>
                {info.map((item, index) => (
                    <Link key={index} href
                    ={item.href} className="text-sm hover:bg-gray-200 w-full rounded-md font-semibold flex items-center p-2 gap-2 hover:text-primary">
                        {item.icon}
                        <span>{item.text}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}