"use client"
import { ListFilter } from "lucide-react";
import SearchResult from "./SearchResult";
import SearchFilter from "./SearchFilter";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchData ({searchResult}) {

    const [open, setOpen] = useState(false);

    const pathname = usePathname();

    const toggleFilter = () => {
        setOpen(!open);
    };

    useEffect(() => {
        setOpen(false);
    }, [pathname]);
    return (
      <>
        <button
          type="button"
          onClick={toggleFilter}
          className="w-auto hidden max-md:inline-flex px-4 py-1.5 border-gray-500 bg-gray-100 text-gray-600 rounded-3xl font-normal items-center gap-2"
        >
          <ListFilter size={18} />
          Filter
        </button>
        <SearchResult products={searchResult} />
        {open ? (
          <div className="w-auto absolute top-0 left-0 h-dvh">
            <SearchFilter setOpen={setOpen} />
          </div>
        ) : null}
      </>
    );
} 