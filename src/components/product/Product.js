"use client";
import Link from "next/link";
import Image from "next/image";
import Currency from "@/utilities/currency/Currency";
import Rating from "@/utilities/rating/Rating";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { add2CartBtn } from "@/backend/action/cart";
import { Trash2 } from "lucide-react";
import { removeWishlist } from "@/backend/action/wishlist";

export default function Product({
  id,
  images,
  name,
  price,
  brand,
  category,
  reviews,
  wish,
}) {
  const [message, setMessage] = useState("");
  const [showPopover, setShowPopover] = useState(false);

  const rating = reviews.length
    ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / reviews.length).toFixed(1)
    : 0;
  // Generate URL-safe slugs
  const categorySlug = category?.toLowerCase().replace(/\s+/g, "-");
  const productSlug = name?.toLowerCase().replace(/\s+/g, "-");

  const handleClick = async () => {

    const result = await add2CartBtn(id);

    if (!result.success) {
      setMessage(result.message);
    }
    setMessage(result.message);

    if (result.success) {
      setShowPopover(true);
      const timer = setTimeout(() => {
        setShowPopover(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  };
  return (
    <div className="w-1/5 max-md:w-2/6 max-sm:w-1/2 max-md:grow-0 shadow-sm border border-gray-200 hover:bg-gray-50 rounded-lg p-2 relative group">
      {showPopover && (
        <div
          className={`rounded-md text-green-800 bg-green-200 w-full p-3 text-sm absolute top-0 left-0 z-10`}
        >
          {message}
        </div>
      )}
      { wish && ( <button onClick={async () => { await removeWishlist(id) }} className="absolute top-2 right-2 text-white z-10 p-1 rounded-sm bg-red-600 hover:bg-red-500">
            <Trash2 size="16" />
      </button> ) }
      <Link
        href={`/category/${categorySlug}/product/${productSlug}`}
        className="w-full h-24"
        aria-label={`View ${name} details`}
      >
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            priority
            fill
            alt={name || "Product image"}
            src={images[0] || "/images/default.png"}
            className="object-cover w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw"
          />
        </div>
        <h4 className="text-gray-600 font-semibold mt-1 text-sm line-clamp-1">
          {name}
        </h4>
        <h3 className="font-bold max-md:text-base text-lg text-black">
          {Currency(price)}
        </h3>
        <h6 className="text-[12px] inline-block relative -top-2">
          <span className="font-semibold text-green-700">{brand}</span>
        </h6>
        <div className="h-auto flex gap-1 items-center text-sm relative -left-2 -top-3 bottom-0 mb-0 pb-0">
          <Rating rating={rating} size={18} />
          <span>({rating})</span>
        </div>
      </Link>
      <button
        type="button"
        className="p-2.5 rounded-full text-gray-800 bg-primary hover:bg-secondary absolute bottom-10 right-2"
        onClick={handleClick}
      >
        <ShoppingCart size="16" />
      </button>
    </div>
  );
}
