"use client"
import {RatingStar} from "rating-star"
import {Star} from "lucide-react"
import { useState } from "react"
function RateStarIcon () {
    return (
        <Star color="#fbbf24" />
    )
}

export default function CreateReview ({status}) {
    const [rating, setRating] = useState(0);

    return (
        <form className={`mt-2 ${status === "delivered" ? null : "hidden"}`}>
            <h3 className="font-semibold text-lg text-black">Review Product</h3>
            <div className="w-auto relative -top-1 -bottom-2 -left-2">
                <RatingStar starIcon={RateStarIcon} rating={rating / 10} maxScore={5} id="88" size={22} numberOfStar={5} colours={{mask: "#fbbf24"}} />
            </div>
            <div className="w-full flex justify-between mb-1 gap-2">
                <input type="range" name={`rating`} min={0} max={50} className="w-1/2 relative -top-1 max-md:w-full accent-primary" value={rating} onChange={e => setRating(e.target.value)} />
                <button className="py-1 px-2 text-sm text-white bg-gray-800 rounded-md">Post</button>
            </div>
            <textarea name={`review`} className="w-full field-content list-none rounded-md border border-gray-400 outline-none text-gray-800 text-sm mt-1 px-2 py-1.5 bg-transparent resize-none"></textarea>
        </form>
    )
}