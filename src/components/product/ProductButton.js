"use client"
import {ShoppingCart} from "lucide-react"
import { add2CartBtn } from "@/backend/action/cart";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ProductButton ({id}) {
    const router = useRouter()
    const pathname = usePathname()
    const handleClick = () => {
      add2CartBtn(id);
      router.push(`${pathname}?cart=${id}`)
    }
    return (
      <button
        type="button"
        className="p-2.5 rounded-full text-gray-800 bg-primary hover:bg-secondary absolute bottom-12 max-md:mt-9 right-2"
        onClick={handleClick}
      >
        <ShoppingCart size="18" />
      </button>
    );
}