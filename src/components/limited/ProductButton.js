"use client"
import {ShoppingCart} from "lucide-react"
import { add2CartBtn } from "@/backend/action/cart";

export default function ProductButton ({id}) {
    return (
      <button
        type="button"
        className="p-2.5 rounded-full text-gray-800 bg-primary hover:bg-secondary absolute bottom-12 right-2"
        onClick={() => {
            console.log("button action")
            add2CartBtn(id)}}
      >
        <ShoppingCart size="18" />
      </button>
    );
}