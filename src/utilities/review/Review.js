import { images } from "@/constants"
import Rating from "../rating/Rating"
import Image from "next/image"

export default function Review ({userId, comment, date, rating, image}) {
    return (
      <li className="py-4">
        <div className="w-full flex gap-2 items-center">
          <Image
            priority
            alt={date}
            width={40}
            height={40}
            src="/images/avatar.jpg"
            className="w-auto h-auto rounded-full aspect-square"
          />
          <div className="pt-2 w-full flex items-center justify-between">
            <div className="text-sm">
              <h3 className="font-semibold text-gray-800 text-sm">{userId}</h3>
              <div className="relative -left-2">
                <Rating size={16} rating={rating} />
              </div>
            </div>
            <p className="text-base text-gray-600">
              {new Date(date).toDateString()}
            </p>
          </div>
        </div>
        <p className="text-base text-gray-600 italic">{comment}</p>
      </li>
    );
}