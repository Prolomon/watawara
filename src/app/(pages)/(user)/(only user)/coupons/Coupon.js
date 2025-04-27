import Image from "next/image"
import { images } from "@/constants"

export default function Coupon ({code, expire, discount, merchant}) {
    const verify = false
    return (
        <div className="w-full mt-2 flex gap-3 items-center">
            <div className="w-auto flex gap-2">
                <Image src={images.coupon} className="rounded-md w-20 h-20" alt="coupon" width={50} height={50} />
            </div>
            <div>
                <p className="text-sm text-nowrap text-gray-800"><span className="py-1 px-1.5 rounded-md bg-gray-200 uppercase">code</span> Watawara2021</p>
                <h4 className="font-semibold text-lg">SHEIN Verified Discount Code - 90% Success Rate</h4>
                <div className="w-full flex gap-2 items-center">
                    <p className="text-sm text-gray-800">Expires in 2 days</p>
                    <button type="submit" className="py-1 px-2 text-[11px] bg-primary text-black rounded-md">Copy</button>
                    
                </div>
            </div>
        </div>
    )
}