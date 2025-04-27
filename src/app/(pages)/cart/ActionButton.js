"use client";
import { wishlist } from "@/backend/action/wishlist";
import { delete4cart } from "@/backend/action/cart";
import { Trash2, BookmarkPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActionButton({ id }) {
  const router = useRouter();
  const handleDelete = () => {
    delete4cart(id);
    router.push(`/cart?delete=true`);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => wishlist(id)}
        className="text-gray-400"
      >
        <BookmarkPlus size={20} />
      </button>
      <button type="button" onClick={handleDelete} className="text-gray-400">
        <Trash2 size={20} />
      </button>
    </div>
  );
}
