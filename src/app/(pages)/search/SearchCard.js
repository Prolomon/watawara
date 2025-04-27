import Link from "next/link";
import Image from "next/image";
import Currency from "@/utilities/currency/Currency";
import { ShoppingCart } from "lucide-react";
import Rating from "@/utilities/rating/Rating";
import { add2CartBtn } from "@/backend/action/cart";

export default function SearchCard({
  productCode,
  images,
  name,
  price,
  reviews,
  brand,
  category,
}) {
  const rate = reviews.reduce((acc, r) => acc + Number(r.rating), 0);
  const rating = rate / reviews.length / 5;
  return (
    <div className="shadow-sm border border-gray-200 hover:bg-gray-50 rounded-lg p-2 relative">
      <Link
        href={`/category/${category
          ?.toLowerCase()
          .replace(/\s+/g, "-")}/product/${name
          ?.toLowerCase()
          .replace(/\s+/g, "-")}`}
        className="w-full relative"
      >
        <Image
          priority
          width="100"
          height="100"
          alt="product description"
          src={images[0]}
          className="w-full h-auto aspect-square rounded-lg"
        />
        <h4 className="text-gray-600 font-semibold mt-2 text-base line-clamp-1">
          {name}
        </h4>
        <div>
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
      <form action={add2CartBtn}>
        <input
          type="text"
          className="hidden"
          name="id"
          defaultValue={productCode}
        />
        <button
          type="submit"
          className="p-2.5 rounded-full text-gray-800 bg-primary hover:bg-secondary absolute bottom-12 right-2"
        >
          <ShoppingCart size="18" />
        </button>
      </form>
    </div>
  );
}
