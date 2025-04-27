"use client"
import { useState } from "react"
import { coupon } from "@/backend/action/coupon"

export default function Coupon () {
    const [code, setCode] = useState("")
    const handleClick = () => {
        coupon(code)
    }
    return (
      <div className="w-full p-3 bg-white border border-gray-200 rounded-md">
        <h2 className="font-bold text-lg text-black mb-2">Have a Coupon?</h2>
        <div className="w-full flex items-center border border-gray-300 py-2 px-3 rounded-md">
          <input
            type="text"
            name="coupon"
            className="outline-none border-none bg-transparent w-full text-base pr-3"
            placeholder="Coupon Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <input
            type="button"
            className="text-primary text-base outline-none border-none bg-transparent"
            value="Apply"
            onClick={handleClick}
          />
        </div>
      </div>
    );
}