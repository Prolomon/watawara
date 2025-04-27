import { SquareChartGantt } from "lucide-react"
import Review from "@/utilities/review/Review"

export default function Reviews () {
    const review = false
    return (
        <section className="w-1/2 max-md:w-full border-t max-md:mt-4 max-md:pt-3 max-md:border-gray-300">
            <h3 className="text-lg font-semibold text-gray-700 text-left">Reviews</h3>
            {review ?
                <ul>
                    {/* {review.map(_r => <Review key={_r.review} {..._r} />)} */}
                </ul> : 
                <div className="w-full h-64 grid text-center place-content-center">
                    <SquareChartGantt size={45} className="text-gray-400 mx-auto" />
                    <h3 className="text-gray-700 font-semibold text-base py-2">Your Review is empty</h3>
                    <p className="text-gray-500 text-sm">You have no completed review or it has been deleted</p>
                </div> }

        </section>
    )
}