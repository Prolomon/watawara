"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Users, Newspaper, PackageCheck, Settings, MessageCircleQuestion, Map, Ticket } from "lucide-react"

export function Sidebar ({name}) {
    const pathname = usePathname()
    const info = [
        {
          "href": `/account/${name}`,
          "text": "Your Profile",
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
        <div className="w-3/12 flex max-md:hidden flex-col border-r border-gray-400">
            {info?.map(_i => (
               <Link key={_i.text} href={_i.href} className={`text-sm font-semibold p-3 flex gap-2 items-center text-gray-800 capitalize ${pathname === _i.href ? "border-l-4 border-primary bg-primary/10" : null}`}>{_i.icon}{_i.text}</Link> 
            ))}
            
        </div>
    )
}