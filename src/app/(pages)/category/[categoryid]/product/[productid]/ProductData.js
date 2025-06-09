"use client";
import Preference from "./Preference";
import { add2Cart } from "@/backend/action/cart";
import MoreOpt from "./MoreOpt";
import { Minus, Plus } from "lucide-react";
import { checkoutNow } from "@/backend/action/checkout";
import { useState} from "react";

export default function ProductData({ colors, id, material, stock, size }) {
  const [quant, setQuant] = useState(1);
  const [value, setValue] = useState("Add to cart");

  const decre = () => {
    if (quant >= 2) {
      setQuant(quant - 1);
    } else {
      setQuant(1);
    }
  };
  const incre = () => {
    if (quant === stock) {
      setQuant(stock);
    } else {
      setQuant(quant + 1);
    }
  };

  const handleCart = async () => {

    const result = await add2Cart(quant, id);

    if (!result.success) {
      setValue(result.message);
    }

    setValue(result.message);
  };


  return (
    <>
      <Preference colors={colors} material={material} size={size} />
      {/* section for quant, share, wishlist */}
      <div className="w-full items-end flex gap-3 pt-2">
        <div className="w-full">
          <h5 className="text-gray-800 text-base font-semibold mb-2">Quant</h5>
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
              name="quant"
              value={quant}
              onChange={(e) => setQuant(e.target.value)}
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
          className="text-sm font-semibold block border w-full py-2 border-gray-400 text-gray-700 rounded-md"
        >
          {value}
        </button>
      </div>
      <div className="flex gap-3 mt-2">
        <button
          onClick={() => checkoutNow(quant, id)}
          className="text-sm font-semibold block text-gray-800 w-full py-1.5 bg-primary rounded-md hover:bg-secondary"
        >
          Buy Now
        </button>
        <MoreOpt _id={id} />
      </div>
    </>
  );
}
