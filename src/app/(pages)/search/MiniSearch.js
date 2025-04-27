"use client"
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";

export default function MiniSearch ({array, title}) {
    const [search, setSearch] = useState("")

    const data = array.filter((product) => {
        return product.toLowerCase().includes(search?.toLowerCase())
    });

    return (
      <div className="border-t border-gray-300 py-3">
        <h5 className="font-semibold text-sm uppercase mb-2">{title}</h5>
        <div className="w-full flex rounded-md border border-gray-400 p-1 gap-2 items-center">
          <Search size={22} className="" />
          <input
            type="text"
            placeholder="Search brand here..."
            className="w-full border-none outline-none"
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="my-2 scroll max-h-40 overflow-y-scroll">
          {data.map((b) => (
            <Link
              key={b}
              href={`/search?query=smart&brand=${b}`}
              className="block text-sm text-gray-500 mb-2 uppercase"
            >
              {b}
            </Link>
          ))}
        </div>
      </div>
    );
}