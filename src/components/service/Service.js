import Link from "next/link"
import Rating from "@/utilities/rating/Rating"
import Image from "next/image"
import {images} from "@/constants"

export default function Product ({image, title, rating, merchant, path}) {
    return (
        <div className="max-sm:w-1/2 max-md:w-1/3 w-1/5 shadow-sm border border-gray-100 hover:bg-gray-100 rounded-lg p-2 -mx-1">
            <Image priority width="100" height="100" alt="product description" src={images.shoe} className="w-full aspect-square rounded-lg" />
            <h2 className="text-gray-600 font-semibold mt-2 text-base line-clamp-1">3&apos; Inch Sneakers from Louis Viton</h2>
            <h6 className="text-sm inline-block relative -top-1"><span className="font-normal text-primary">Heaar  stylist</span></h6>
            <Rating rating={2.5} size={16} />
            {/* <Rating initialRating={2.4} fractions={2} readonly={true} emptySymbol={} fullSymbol={} /> */}
            <Link href={`/specials/service/service_id`} className="w-full capitalize p-3 rounded-full text-gray-800 bg-primary">book now</Link>
        </div>
    )
}