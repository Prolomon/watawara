"use client";
import { useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import LimitedCard from "./LimitedCard";

export default function Limited({ icon, title, path, option, products }) {
  const moveProduct = useRef();
  const moveLeft = () => {
    moveProduct.current.style.transform = "translateX(0)";
  };
  const moveRight = () => {
    moveProduct.current.style.transform = "translateX(-100%)";
  };

  return (
    <section className="w-11/12 mx-auto mt-5 relative">
      <div className="w-full flex items-center justify-between text-gray-800 font-semibold text-lg my-1.25">
        <div className="flex w-auto gap-2 items-center capitalize">
          {icon}
          {title}
        </div>
        <Link
          href={path}
          className="hover:text-primary font-normal text-base inline-flex gap-2 items-center"
        >
          {option} <ArrowRight size={21} />
        </Link>
      </div>
      <div className="relative">
        <button
          type="button"
          className="aspect-square w-10 h-10 rounded-full shadow-md border border-gray-200 absolute -left-5 max-md:hidden z-30 hover:border-gray-300 top-2/4 bg-white grid place-content-center"
          onClick={moveLeft}
        >
          <ChevronLeft />
        </button>
        <div className="w-full overflow-hidden max-md:overflow-x-scroll scroll relative">
          <div
            className="flex flex-nowrap pt-3 transition-[300ms]"
            ref={moveProduct}
          >
            {products.map((p, index) => (
              <LimitedCard
                key={index}
                id={p.id}
                images={p.images}
                category={p.category}
                price={p.price}
                name={p.name}
                discount={p.discount}
                stock={p.stock}
                current_stock={p.current_stock}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="aspect-square w-10 h-10 rounded-full shadow-md border border-gray-200 absolute -right-5 max-md:hidden hover:border-gray-300 top-2/4 bg-white grid place-content-center"
          onClick={moveRight}
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
