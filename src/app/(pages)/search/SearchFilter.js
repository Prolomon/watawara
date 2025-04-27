"use client"
import { X } from "lucide-react";
import { categories } from "@/backend/category";
import Link from "next/link";
import MiniSearch from "./MiniSearch";

export default function SearchFilter({ setOpen }) {
  const brands = [
    "Apple",
    "Samsung",
    "Nike",
    "Adidas",
    "Sony",
    "Microsoft",
    "Amazon",
    "Google",
    "Tesla",
    "Toyota",
    "Coca-Cola",
    "Pepsi",
    "Nestlé",
    "Unilever",
    "Procter & Gamble",
    "Gucci",
    "Louis Vuitton",
    "Chanel",
    "Zara",
    "H&M",
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Acer",
    "BMW",
    "Mercedes-Benz",
    "Honda",
    "Ford",
    "Volkswagen",
    "L'Oréal",
    "Estée Lauder",
    "Nivea",
    "Gillette",
    "Colgate",
    "Siemens",
    "Bosch",
    "LG",
    "Panasonic",
    "Philips",
    "Levi's",
    "Puma",
    "Under Armour",
    "Reebok",
    "New Balance",
    "Dior",
    "Prada",
    "Burberry",
    "Versace",
    "Calvin Klein",
  ];

  const sizes = ["xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl"];

  const stores = [
    "Tech Haven",
    "Urban Threads",
    "Fresh Mart",
    "Gadget Galaxy",
    "Style Outlet",
    "Home & Beyond",
    "Electro World",
    "Trendy Looks",
    "Quick Stop Shop",
    "Book Nook",
    "Sports Gear",
    "Beauty Spot",
    "Pet Paradise",
    "Auto Parts Plus",
    "Furniture Depot",
    "Kids Corner",
    "Gourmet Delights",
    "Fitness Central",
    "Jewelry Gallery",
    "Garden Oasis",
  ];

  const handleClick = () => {setOpen(false)};

  return (
    <div className="w-full max-md:w-2/1 max-sm:w-full bg-white p-3 rounded-md shadow-sm border border-gray-200">
      <div className="flex justify-between items-center gap-2 rounded-full text-gray-800">
        <h3 className="text-xl font-semibold">Filters</h3>
        <button onClick={handleClick} className="p-1 hover:border rounded-sm hover:border-gray-800">
          <X size={20} className="text-gray-800 hidden max-md:hidden" />
        </button>
      </div>
      <div className="mt-4">
        {/* search by product category */}
        <div className="border-t border-gray-300 py-3">
          <h5 className="font-semibold text-sm uppercase">Category</h5>
          <div className="my-2 scroll max-h-40 overflow-y-scroll">
            {categories.map((_c) => (
              <Link
                href={`/search?query=smart&category=${_c.category_name}`}
                key={_c.category_name}
                className="text-base text-gray-600 block hover:bg-gray-100 p-2"
              >
                {_c.category_name}
              </Link>
            ))}
          </div>
        </div>
        {/* search by product brand */}
        <MiniSearch title={`brand`} array={brands} />
        {/* search by price range */}
        <form className="border-t border-gray-300 py-3">
          <div className="w-full flex items-center justify-between">
            <h5 className="font-semibold text-sm uppercase">Price Range</h5>
            <button
              type="submit"
              className="border-none outline-none bg-transparent text-sm text-primary font-semibold"
            >
              Apply
            </button>
          </div>
          <div className="w-full flex gap-2 items-center mt-1">
            <input
              type="text"
              defaultValue={0}
              className="outline-primary w-full rounded-md border border-gray-400 p-1 mt-1"
            />
            -
            <input
              type="text"
              defaultValue={20000}
              className="outline-primary w-full rounded-md border border-gray-400 p-1 mt-1"
            />
          </div>
        </form>
        {/* search by shipped from */}
        {/* <div className="border-t border-gray-300 py-3">
            <h5 className="font-semibold text-sm uppercase">shipped from</h5>
            <ul className="my-2 scroll">
              <li className="flex items-center gap-2 text-base text-gray-500 mb-2">
                <input type="checkbox" className="accent-primary w-4 h-4" />
                Shipped from Abroad
              </li>
              <li className="flex items-center gap-2 text-base text-gray-500 mb-2">
                <input type="checkbox" className="accent-primary w-4 h-4" />
                Shipped from Nigeria
              </li>
            </ul>
          </div> */}
        {/* search by discount percentage */}
        {/* <div className="border-t border-gray-300 py-3">
            <h5 className="font-semibold text-sm uppercase">
              Discount Percentage
            </h5>
            <div className="w-full flex gap-2 items-center">
              <input
                type="range"
                min="0"
                max="100"
                placeholder="Search brand here..."
                className="w-full flex rounded-md accent-primary p-1 mt-1"
              />
              <span className="text-sm">0%</span>
            </div>
          </div> */}
        {/* search by product size */}
        <MiniSearch title={`size`} array={sizes} />
        {/* search by product store */}
        <MiniSearch title={`brand`} array={stores} />
      </div>
    </div>
  );
}