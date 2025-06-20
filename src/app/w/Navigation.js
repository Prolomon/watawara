"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, HomeIcon } from "lucide-react";

export default function Navigation() {
    const pathname = usePathname();
    return (
      <nav className="w-11/12 mx-auto flex items-center gap-2 py-4 text-sm">
        <Link href={'/'} className="text-gray-500 inline-flex items-center gap-2 hover:text-primary">
            <HomeIcon size={18} />
            Home
        </Link>
        <ChevronRight size={18} />
        <p className="text-gray-700 inline-flex items-center gap-2 capitalize hover:text-primary">
            {pathname.split("/")[2].replaceAll("-", " ")}
        </p>
      </nav>
    );
}