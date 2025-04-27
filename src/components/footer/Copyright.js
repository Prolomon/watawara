import Link from "next/link"

export default function Copyright () {
    return (
        <ul className="py-6 border-t border-gray-400 text-sm flex flex-wrap items-center justify-center gap-3 text-gray-400">
            <li>&copy; 2025 <Link href="#" className="text-nowrap">Tr3G Innovative Limited</Link></li>
            <li><Link href="#" className="underline text-nowrap">Terms of use</Link></li>
            <li><Link href="#" className="underline text-nowrap">Privacy Policy</Link></li>
            <li><Link href="#" className="underline text-nowrap">Legal Agreement</Link></li>
            <li><Link href="#" className="underline text-nowrap">Advert choice</Link></li>
        </ul>
    )
}