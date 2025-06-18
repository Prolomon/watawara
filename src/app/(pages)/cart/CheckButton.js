"use client"
import { checkRedirect } from "@/backend/action/checkout";
import { useState } from "react";

export default function CheckButton({
  subTotal,
  tax,
  shipping,
  total,
  length,
  active
}) {

  const [show, setShow] = useState(false);

  const handleClick = () => {

    checkRedirect(subTotal, tax, shipping, total)

    if (!show) {
        setShow(true);
        const timer = setTimeout(() => {
          setShow(false);
        }, 5000); // 2 minutes = 120,000ms
  
        return () => clearTimeout(timer); // Cleanup on unmount
      }

  }

  return (
    <button
      type="button"
      onClick={handleClick }
      className="w-full mt-3 text-sm bg-primary hover:bg-secondary rounded-ms py-1 rounded-md text-black"
      disabled={active ? true : false}
    >
      {show ? "Redirecting..." : `Checkout(${length})`}
    </button>
  );
}
