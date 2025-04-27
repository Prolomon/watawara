"use client"
import { add2Checkout } from "@/backend/action/checkout";
import { useRouter } from "next/navigation";

export default function AddCheckout({ productId, quantity, color, size, price, name }) {
  const router = useRouter()
  const handleClick = () => {
    add2Checkout(productId, quantity, color, size, price);

    router.push(`/cart?checkout=${productId}`);
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