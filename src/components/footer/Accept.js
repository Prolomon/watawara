import Image from "next/image"
import {images} from "@/constants"

export default function Accept () {
    return (
        <div className="w-full mt-4 mb-8">
            <h4 className="text-white font-bold text-sm mb-2">We transact with</h4>
            <div className="w-full flex gap-2 flex-wrap items-center">
                <Image priority width={100} height={100} alt="verve" src={images.flutterwave} className="aspect-auto h-7 w-12 rounded-sm" />
                <Image priority width={100} height={100} alt="verve" src={images.paystack} className="aspect-auto h-7 w-12 rounded-sm" />
                <Image priority width={100} height={100} alt="verve" src={images.verve} className="aspect-auto h-7 w-12 rounded-sm" />
                <Image priority width={100} height={100} alt="verve" src={images.mastercard} className="aspect-auto h-7 w-12 rounded-sm" />
                <Image priority width={100} height={100} alt="verve" src={images.visa} className="aspect-auto h-7 w-12 rounded-sm" />
                <Image priority width={100} height={100} alt="verve" src={images.discover} className="aspect-auto h-7 w-12 rounded-sm" />
                <Image priority width={100} height={100} alt="verve" src={images.america} className="aspect-auto h-7 w-12 rounded-sm" />
            </div>
        </div>
    )
}