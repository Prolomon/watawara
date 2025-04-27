"use client";
import Color from "./Color";
// import Quantity from "./Quantity"
import { add2Cart } from "@/backend/action/cart";
import MoreOpt from "./MoreOpt";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { checkoutNow } from "@/backend/action/checkout";
import { useState, useEffect } from "react";
import Popover from "./Popover";

export default function ProductData({ images, id }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [showPopover, setShowPopover] = useState(false);

  const decre = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };
  const incre = () => {
    setQuantity(quantity + 1);
  };

  const handleCart = () => {
    add2Cart(quantity, id);

    router.push(`${pathname}?cart=${id}`);
  };

  useEffect(() => {
    if (search.get("cart") === id) {
      setShowPopover(true);
      const timer = setTimeout(() => {
        setShowPopover(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [id, search]);

  return (
    <>
      <Color images={images} />
      {showPopover && <Popover />}
      {/* section for quantity, share, wishlist */}
      <div className="w-full items-end flex gap-3 pt-2">
        <div className="w-full">
          <h5 className="text-gray-800 text-base font-semibold mb-2">
            Quantity
          </h5>
          <div className="w-full flex gap-2 border border-gray-200 p-1 rounded-md">
            <button
              type="button"
              onClick={decre}
              className="rounded-md px-2.5 py-2 text-gray-800 bg-primary"
            >
              <Minus size={16} />
            </button>
            <input
              type="text"
              className="rounded-md text-center px-2.5 w-full py-1 text-gray-800"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              type="button"
              onClick={incre}
              className="rounded-md px-2.5 py-2 text-gray-800 bg-primary"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <button
          onClick={handleCart}
          className="text-base font-semibold block border w-full py-1.5 border-gray-400 text-gray-700 rounded-md"
        >
          Add to cart
        </button>
      </div>
      <div className="flex gap-3 mt-2">
        <button
          onClick={() => checkoutNow(quantity, id)}
          className="text-base font-semibold block text-gray-800 w-full py-1.5 bg-primary rounded-md hover:bg-secondary"
        >
          Buy Now
        </button>
        <MoreOpt _id={id} />
      </div>
    </>
  );
}
