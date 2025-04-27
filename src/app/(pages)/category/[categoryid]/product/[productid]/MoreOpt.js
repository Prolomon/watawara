"use client";
import { Share2, BookmarkPlus, Bookmark } from "lucide-react";
import { wishlist } from "@/backend/action/wishlist";

export default function MoreOpt({ _id }) {
  return (
    <div className="w-full flex gap-3">
      <button
        onClick={() => wishlist(_id)}
        className="text-sm font-semibold flex gap-2 items-center border border-gray-400 text-gray-700 w-full py-2 rounded-md justify-center hover:text-primary hover:border-primary"
      >
        <BookmarkPlus size={18} />
        <span className="max-sm:hidden">Wishlist</span>
      </button>
      <button className="text-sm font-semibold flex gap-2 items-center border w-full py-2 border-gray-400 text-gray-700 rounded-md justify-center hover:text-primary hover:border-primary">
        <Share2 size={18} /> <span className="max-sm:hidden">Share</span>
      </button>
    </div>
  );
}
