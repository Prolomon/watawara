"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/products", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search fetch error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchResult = products.filter((product) => {
    const searchLower = search.toLowerCase();
    return (
      product.name?.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower)
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`);
      setOpen(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={searchRef}
      className="relative flex items-center w-full h-10 p-1 border-2 border-gray-800 rounded-full"
    >
      <input
        type="search"
        name="query"
        className="w-full mx-2 text-gray-700 bg-transparent border-none outline-none placeholder:text-gray-500"
        placeholder="Search products..."
        onChange={searchChange}
        value={search}
        aria-label="Search products"
      />

      <button
        type="submit"
        className="grid w-auto aspect-square h-full text-white bg-gray-900 border-none rounded-full outline-none place-content-center hover:bg-gray-800"
        aria-label="Submit search"
      >
        <Search size={16} />
      </button>

      {open && (
        <div className="absolute left-0 z-50 w-full mt-1 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg top-full">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
          ) : searchResult.length > 0 ? (
            searchResult.map((product) => (
              <Link
                key={product._id}
                href={`/category/${product.category
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}/product/${product.name
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                {product.name}
              </Link>
            ))
          ) : search ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No products found
            </div>
          ) : null}
        </div>
      )}
    </form>
  );
}
