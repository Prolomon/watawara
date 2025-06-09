"use client"
import Image from "next/image";
import Link from "next/link";
import Currency from "@/utilities/currency/Currency";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { add2CartBtn } from "@/backend/action/cart";

export default function LimitedCard({
  id,
  images,
  category,
  price,
  name,
  discount,
  quantity,
  stock,
}) {
  const [message, setMessage] = useState("");
  const [showPopover, setShowPopover] = useState(false);

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
    <div className="w-1/5 max-md:w-2/6 max-sm:w-1/2 max-md:grow-0 shrink-0 relative p-2 rounded-lg hover:bg-gray-50 shadow-sm border border-gray-200">
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
          alt={name}
          width="100"
          height="100"
          className="rounded-lg w-full aspect-square"
          src={images[1] || "/images/default.png"}
        />
        <div className="w-full mt-1">
          <h4 className="text-sm font-semibold text-gray-600 line-clamp-1">
            {name}
          </h4>
          <div className="w-full flex items-center justify-between relative">
            <div>
              <h3 className="text-lg max-md:text-base font-bold text-black">
                {discount.type === "percentage"
                  ? Currency(((100 - discount.amount) * price) / 100)
                  : discount.type === "none"
                    ? Currency(price)
                    : Currency(price - discount.amount)}
              </h3>
              <h5 className="line-through text-gray-400 text-base max-md:text-sm -mt-1">
                {Currency(price)}
              </h5>
            </div>
          </div>
        </div>
        <p className="text-sm text-primary font-semibold capitalize ">
          {stock} of {quantity} in Stock
        </p>
      </Link>
      <button
        type="button"
        className="p-2.5 rounded-full text-gray-800 bg-primary hover:bg-secondary absolute bottom-6 right-2 max-md:bottom-9"
        onClick={() => {
          console.log("button action");
          add2CartBtn(id);
        }}
      >
        <ShoppingCart size="16" />
      </button>
    </div>
  );
}
