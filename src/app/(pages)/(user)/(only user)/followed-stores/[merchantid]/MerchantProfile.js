import Image from "next/image";
import { CircleCheck, Earth } from "lucide-react";
import Rating from "@/utilities/rating/Rating";

export default function MerchantProfile({
  name,
  image,
  location,
  followers,
  reviews,
  sold,
  contactPhone,
  contactEmail,
  rating,
  description,
  merchantId,
}) {
  return (
    // merchant profile information
    <div className="w-full rounded-md border border-gray-300 shadow-md border-collapse overflow-hidden">
      <div className="w-full flex gap-2 items-center justify-between max-md:flex-col max-md:justify-normal p-3">
        <div className="w-auto flex items-center gap-2">
            <Image alt={name} className="rounded-full aspect-square w-20 h-20" width={100} height={100} src={image}/>
            <div className="flex flex-col">
                <div className="inline-flex gap-1 justify-normal items-center">
                    <h3 className="w-full font-bold text-xl text-black text-nowrap capitalize">{name}</h3>
                    <CircleCheck size={19} fill="#fbbf24" className="text-white" />
                </div>
                <div className="inline-flex items-center gap-1 text-sm"><Earth size={14} />{location}</div>
            </div>
        </div>
        <div className="">
            <button className="text-[12px] text-left max-md:text-right font-semibold px-1.5 rounded-full bg-primary mx-auto">Unfollow</button>
            <Rating rating={rating} size={20} />
        </div>
      </div>
      <ul className="w-full grid grid-cols-4 max-sm:grid-cols-2 border border-gray-300 border-collapse">
        <li className="w-full flex flex-col place-content-center text-center border border-gray-200 p-3">
          <h2 className="text-base text-gray-700">{followers}</h2>
          <h6 className="text-sm text-gray-500 font-semibold">Following</h6>
        </li>
        <li className="w-full flex flex-col place-content-center text-center border border-gray-200 p-3">
          <h2 className="text-base text-gray-700">{sold}</h2>
          <h6 className="text-sm text-gray-500 font-semibold">Sold</h6>
        </li>
        <li className="w-full flex flex-col place-content-center text-center border border-gray-200 p-3">
          <h2 className="text-base text-gray-700">{rating}</h2>
          <h6 className="text-sm text-gray-500 font-semibold">Rating</h6>
        </li>
        <li className="w-full flex flex-col place-content-center text-center border border-gray-200 p-3">
          <h2 className="text-base text-gray-700">{reviews.length}</h2>
          <h6 className="text-sm text-gray-500 font-semibold">Reviews</h6>
        </li>
      </ul>
    </div>
  );
}
