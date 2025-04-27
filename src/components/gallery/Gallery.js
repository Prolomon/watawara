"use client";
import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images, name }) {
  const [src, setSrc] = useState(images[0]);
  const handleClick = (e) => {
    setSrc(e.target.id);
  };
  return (
    <div className="w-auto max-md:w-full me-3 max-md:me-0 grid max-md:flex max-sm:grid gap-2">
      <div className="h-[22.5rem] w-[22.5rem] max-md:w-full">
        <Image
          priority
          width={100}
          height={100}
          alt={name}
          src={src}
          className="w-full h-full aspect-square border border-gray-200 rounded-md"
        />
      </div>
      <div className="grid gap-1 grid-cols-6">
        {images.map((_i, index) => (
          <Image
            key={index}
            id={_i}
            onClick={handleClick}
            priority
            width={100}
            height={100}
            alt={index}
            src={_i}
            className={`aspect-square rounded-md border-2 hover:border-gray-800 w-14 h-14 ${
              src === _i ? "border-gray-800" : "border-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
