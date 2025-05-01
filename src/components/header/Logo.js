"use client";
import Image from "next/image";
import { images } from "@/constants";
import Link from "next/link";
import { AlignLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Logo({ tags, categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  const specials = ["stores", "best seller", ...tags, "services"];
  const handleMenu = () => {
      setIsOpen(!isOpen)
  };
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <div className="inline-flex gap-2 items-center">
        <AlignLeft
          size={30}
          onClick={handleMenu}
          className="text-gray-800 block md:hidden"
        />
        <Link href={`/`}>
          <Image
            priority
            width="100"
            height="100"
            className="aspect-square w-14 h-14 hidden max-md:block"
            alt="our logo"
            src={images.logo}
          />
          <Image
            priority
            width="100"
            height="100"
            className="aspect-video w-48 h-12 block max-md:hidden"
            alt="our logo"
            src={images.long}
          />
        </Link>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden w-full h-screen  fixed top-0 left-0 shadow-sm bg-gray-black bg-opacity-50 z-[999999] transition transition-discrete duration-150 ease-in`}
      >
        <div
          className="bg-transparent w-full h-full backdrop-blur"
          onClick={handleMenu}
        ></div>
        <div className="w-10/12 h-full rounded-lg shadow-sm bg-white p-3 absolute overflow-y-scroll top-0 left-0">
          <div className="flex items-start justify-between">
            <Image
              priority
              width="100"
              height="100"
              className="w-48 h-12 aspect-video"
              alt="our logo"
              src={images.long}
            />
            <button
              className="border-none outline-none bg-transparent"
              onClick={handleMenu}
            >
              <X size={24} />
            </button>
          </div>
          <ul className=" w-full block mt-3">
            {/* specials list */}
            <h5 className="text-sm font-semibold pt-4 text-gray-800 pb-2 border-b border-gray-400 capitalize">
              Specials
            </h5>
            {specials?.map((_c) => (
              <li key={_c}>
                <Link
                  href={`/category/${_c?.replace(/\s+/g, "-")}`}
                  className="text-base font-normal hover:text-primary text-nowrap capitalize block my-2"
                >
                  {_c}
                </Link>
              </li>
            ))}
            {/* categories list */}
            <h5 className="text-sm font-semibold pt-4 text-gray-800 pb-3 border-b border-gray-400 capitalize">
              Categories
            </h5>
            {categories?.map((_c, index) => (
              <li key={index}>
                <Link
                  href={`/category/${_c.category?.replace(/\s+/g, "-")}`}
                  className="text-base font-normal hover:text-primary text-nowrap capitalize block my-2"
                >
                  {_c.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
