"use server";
import { Categories } from "@/backend/models/category.schema";
import { dbConnect } from "@/backend/server/server";
import Link from "next/link";

export default async function Sidebar() {
    await dbConnect()
    const categories = await Categories.find({})
  return (
    <aside
      className={`w-3/12 max-md:hidden h-auto rounded-lg shadow-sm border border-gray-200 pt-2`}
    >
        <h4 className="p-2.5 border-b border-gray-300 font-semibold">All Categories</h4>
        <ul className="w-full block">
          {categories?.map((_c, index) => (
            <li key={index}>
              <Link
                href={`/category/${_c.category?.replace(/\s+/g, "-")}`}
                className="text-sm font-normal hover:text-primary text-nowrap capitalize block px-2.5 py-1.5"
              >
                {_c.category}
              </Link>
            </li>
          ))}
        </ul>
    </aside>
  );
}
