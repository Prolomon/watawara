import Review from "@/utilities/review/Review"
import { images } from "@/constants"

export default function Reviews ({reviews}) {
    return (
        <div className="w-full">
            {reviews.length !== 0 ?
            (<>
            <ul>
                {reviews.map((review, i) => (
                    <Review key={i} {...review} image={images.user} />
                ))}
            </ul>
            <div className="w-full grid place-content-center">
                {reviews.length < 4 ? null : <button className="text-sm mt-2 text-gray-600">Load More</button>}
            </div></>): null }
        </div>
    )
}