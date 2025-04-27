"use server"
import Logo from "./Logo"
import Accessibility from "./Accessibility"
import SearchBox from "./SearchBox"
import CategoryNavigation from "./CategoryNavigation"

export default async function Header () {
    return (
        <header className={`w-full py-3 sticky top-0 left-0 right-0  border-b border-gray-400 block bg-white z-[99999]`}>
            <div className="mx-auto w-11/12 gap-4 flex items-center max-md:justify-between">
                <Logo />
                <div className="max-md:hidden grow">
                    <SearchBox />
                </div>
                <Accessibility />
            </div>
            <CategoryNavigation />
            <div className="w-11/12 mx-auto mt-2 hidden max-md:block">
                <SearchBox />
            </div>
        </header>
    )
}                                                                                                                                                              