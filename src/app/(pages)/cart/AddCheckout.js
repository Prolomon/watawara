"use client"
import { add2Checkout } from "@/backend/action/checkout";

export default function AddCheckout({ productId, quantity, color, size, price, name }) {
  const handleClick = async () => {
      await add2Checkout(productId, quantity, color, size, price);
  };

  return (
    <button
      onClick={handleClick}
      type="submit"
      className="text-sm text-black rounded-md py-1 px-2 bg-primary"
    >
      Checkout
    </button>
  );
}