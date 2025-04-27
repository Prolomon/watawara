"use client"
import { cancelOrder } from "@/backend/action/cancelOrder";
import { useRouter } from "next/navigation";

export default function TimeBtn ({orderId}) {
  const router = useRouter()
  const handleReturn = () => {
    router.push(`/cart/orders/return?=${orderId}`);
  }
    return (
      <>
        <div className="flex gap-3 max-sm:flex-col p-4 border-t border-gray-300">
          <button
            onClick={handleReturn}
            type="button"
            className="text-gray-700 bg-gray-100 hover:bg-gray-200 text-sm rounded-md py-2 px-4 w-full transition-colors"
          >
            Return Order
          </button>
          <button
            type="button"
            onClick={() => cancelOrder(orderId)}
            className="text-white hover:bg-red-700 bg-red-600 text-sm rounded-md py-2 px-4 w-full transition-colors"
          >
            Cancel Order
          </button>
        </div>
      </>
    );
}