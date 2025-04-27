"use client"
import Currency from "@/utilities/currency/Currency";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Delivery({express}) {
    const router = useRouter()
    const handleClick = () => {
        Cookies.set("wata_delivery", express, { expires: 1 }); 
        Cookies.set("wata_delivery_type", "express", { expires: 1 });
        router.push("/checkout")
    }
    const handleClicks = () => {
      Cookies.set("wata_delivery", 0, { expires: 1 });
      Cookies.set("wata_delivery_type", "pickup", { expires: 1 });
      router.push("/checkout");
    };
  return (
    <li>
      <div className="w-full flex gap-2 justify-between">
        <div className="w-full flex gap-2 items-center" onClick={handleClicks}>
          <input
            type="radio"
            name="delivery"
            className="w-4 h-4  accent-primary"
            id="pickup"
            defaultChecked aria-checked
          />
          <label htmlFor="pickup" className="text-base text-gray-500">
            In-Store Pickup
          </label>
        </div>
        <span className="text-base font-semibold">{Currency(0)}</span>
      </div>
      <div className="w-full flex gap-2 justify-between">
        <div className="w-full flex gap-2 items-center" onClick={handleClick}>
          <input
            type="radio"
            name="delivery"
            className="w-4 h-4  accent-primary"
            id="express"
          />
          <label htmlFor="express" className="text-base text-gray-500">
            Express Delivery
          </label>
        </div>
        <span className="text-base font-semibold">{Currency(2500)}</span>
      </div>
    </li>
  );
}
