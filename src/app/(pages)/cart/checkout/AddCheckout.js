"use client"
import { add2Checkout } from "@/backend/action/cart";

export default function AddCheckout({ productId, quantity, color, size, price }) {
  const handleClick = () => {
    add2Checkout(productId, quantity, color, size, price);

    router.push("/cart?checkout=true");
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