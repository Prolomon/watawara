"use client";
import Link from "next/link";
import Image from "next/image";
import Currency from "@/utilities/currency/Currency";
import ProductButton from "./ProductButton";
import Rating from "@/utilities/rating/Rating";
import Popover from "./Popover";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Product({
  id,
  images,
  name,
  price,
  brand,
  category,
  reviews
}) {
  const search = useSearchParams();
  const [showPopover, setShowPopover] = useState(false);

  const rate = reviews.reduce(
      (acc, r) =>
        acc + Number(r.rating),
      0
    );
  const rating = rate / reviews.length / 5

  useEffect(() => {
    if (search.get("cart") === id) {
      setShowPopover(true);
      const timer = setTimeout(() => {
        setShowPopover(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [id, search]);

  // Generate URL-safe slugs
  const categorySlug = category?.toLowerCase().replace(/\s+/g, "-");
  const productSlug = name?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-1/4 max-md:w-2/6 max-sm:w-1/2 max-md:grow-0 shadow-sm border border-gray-200 hover:bg-gray-50 rounded-lg p-2 relative group">
      {showPopover && <Popover />}

      <Link
        href={`/category/${categorySlug}/product/${productSlug}`}
        className="w-full relative block"
        aria-label={`View ${name} details`}
      >
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            priority
            fill
            alt={name || "Product image"}
            src={images[0]}
            className="object-cover w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 20vw"
          />
        </div>

        <h4 className="text-gray-600 font-semibold mt-2 text-base line-clamp-1">
          {name}
        </h4>

        <div className="mt-1">
          <h3 className="font-bold text-lg text-black">{Currency(price)}</h3>
          <h6 className="text-sm inline-block relative -top-1">
            <span className="font-semibold text-green-700">{brand}</span>
          </h6>
          <div className="flex gap-1 items-center text-sm">
            <div className="relative -left-2 -top-2 flex items-center">
              <Rating rating={rating} size={18} />
              <span>({rating})</span>
            </div>
          </div>
        </div>
      </Link>

      <ProductButton
        id={id}
        className="group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
