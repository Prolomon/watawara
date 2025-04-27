import Rating from "@/utilities/rating/Rating"
import Link from "next/link"
import Image from "next/image"
import {CircleCheck} from "lucide-react"


export default function Merchant ({image, name, rating, reviews, followers, id}) {
    return (
        <div className="w-1/5 max-md:w-3/6 max-sm:w-full max-md:grow-0 shadow-sm border border-gray-100 hover:bg-gray-50 rounded-lg p-2 relative">
            <Image priority width="100" height="100" alt="product description" src={image} className="w-full h-auto aspect-square rounded-lg" />
            <div className="w-full">
                <div className="w-full flex mx-auto items-center justify-center gap-1">
                   <h3 className="text-base font-semibold text-center py-1.5 text-black">{name}</h3>
                    <CircleCheck size={18} fill="#fbbf24" className="text-white" /> 
                </div>
                {/* section for reviews, following, rating */}
                <ul className="flex">
                    <li className="w-full flex flex-col place-content-center text-center">
                        <h2 className="text-sm text-gray-700">{followers}</h2>
                        <h6 className="text-[12px] text-gray-500 font-semibold">Following</h6>
                    </li>
                    <li className="w-full flex flex-col place-content-center text-center">
                        <h2 className="text-sm text-gray-700">{reviews.length}</h2> 
                        <h6 className="text-[12px] text-gray-500 font-semibold">Reviews</h6>
                    </li>
                    <li className="w-full flex flex-col place-content-center text-center">
                        <h2 className="text-sm text-gray-700">{rating}</h2> 
                        <h6 className="text-[12px] text-gray-500 font-semibold">Rating</h6>
                    </li>
                </ul>
                <div className="mx-auto">
                    <Rating rating={rating} size={18} />
                </div>
                {/* seller rating star */}
            </div>
            <div className="w-full flex justify-center">
                <button className="w-2/4 rounded-full text-gray-800 bg-primary hover:bg-secondary text-sm capitalize">unfollow</button>
                <Link href={`/followed-stores/${name.toLowerCase()?.replace(/\s+/g, "-")}`} className="text-sm w-2/4 text-center text-nowrap hover:underline capitalize ">visit store</Link>
            </div>  
        </div>
    )
}