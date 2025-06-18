"use client";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, BookmarkPlus, Box, PackageCheck } from "lucide-react";

export default function Cart({ carts, orders, wishlists, checkout }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [displayValues, setDisplayValues] = useState({
    carts,
    orders,
    wishlists,
    checkout,
  });
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  // Watch for changes in props and update display values
  useEffect(() => {
    setDisplayValues((prev) => ({
      carts: carts !== prev.carts ? carts : prev.carts,
      orders: orders !== prev.orders ? orders : prev.orders,
      wishlists: wishlists !== prev.wishlists ? wishlists : prev.wishlists,
      wishlists: checkout !== prev.checkout ? checkout : prev.checkout,
    }));
  }, [carts, checkout, orders, wishlists]);

  // Memoize the info array using displayValues
  const info = useMemo(
    () => [
      {
        href: "/cart",
        text: "Your Cart",
        quantity: displayValues.carts,
        icon: <ShoppingCart size={20} />,
      },
      {
        href: "/cart/checkout",
        text: "Your Checkout",
        quantity: displayValues.checkouts,
        icon: <PackageCheck size={20} />,
      },
      {
        href: "/cart/orders",
        text: "Your Orders",
        quantity: displayValues.orders,
        icon: <Box size={20} />,
      },
      {
        href: "/cart/wishlist",
        text: "Your Wishlist",
        quantity: displayValues.wishlists,
        icon: <BookmarkPlus size={20} />,
      },
    ],
    [displayValues.carts, displayValues.orders, displayValues.wishlists]
  );

  const toggleCart = useCallback(() => {
    setCartOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setCartOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setCartOpen(false);
  }, [pathname]);

  return (
    <div className="w-auto relative">
      <button
        onClick={toggleCart}
        className="bg-gray-200 text-gray-800 hover:text-primary rounded-full p-2.5 shadow-sm relative"
        aria-label="Shopping cart"
      >
        <span className="text-[10px] grid place-content-center w-4 h-4 absolute bg-red-700 p-1 text-white rounded-full -top-1 -right-1">
          {displayValues.carts}
        </span>
        <ShoppingCart size={17} />
      </button>

      {cartOpen && (
        <div
          ref={dropdownRef}
          className="w-48 rounded-md bg-white shadow-md border border-gray-300 absolute right-0 top-12 z-10 h-auto p-2.5 text-gray-600"
        >
          {info.map((item, index) => (
            <Link
              key={`${item.href}-${index}`}
              href={item.href}
              className="text-sm hover:bg-gray-200 w-full rounded-md font-semibold flex items-center p-2 gap-2 justify-between hover:text-primary"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </div>
              {item.quantity > 0 && (
                <span className="text-[10px] grid place-content-center w-4 h-4 bg-red-700 p-1 text-white rounded-full">
                  {item.quantity}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
