"use server"
import Logo from "./Logo"
import Accessibility from "./Accessibility"
import SearchBox from "./SearchBox"
import CategoryNavigation from "./CategoryNavigation"
import { dbConnect } from "@/backend/server/server"
import { Tag } from "@/backend/models/tag.schema"
import { Categories } from "@/backend/models/category.schema"

export default async function Header () {
    await dbConnect()
    const tags = await Tag.find()
    const categories = await Categories.find({})
    return (
      <header
        className={`w-full py-3 sticky top-0 left-0 right-0  border-b border-gray-400 block bg-white z-[99999]`}
      >
        <div className="mx-auto w-11/12 gap-4 flex items-center max-md:justify-between">
          <Logo
            categories={categories.map((c) => ({
              category: c.category,
              subcategory: c.subcategory,
            }))}
            tags={tags.map((t) => t.tag)}
          />
          <div className="max-md:hidden grow">
            <SearchBox />
          </div>
          <Accessibility />
        </div>
        <CategoryNavigation
          categories={categories.map((c) => ({
            category: c.category,
            subcategory: c.subcategory,
          }))}
          tags={tags.map((t) => t.tag)}
        />
        <div className="w-11/12 mx-auto mt-2 hidden max-md:block">
          <SearchBox />
        </div>
      </header>
    );
}                                                                                                                                                              