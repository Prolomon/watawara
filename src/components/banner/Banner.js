"use client";
import Image from "next/image";
import { images } from "@/constants";
import { useState, useEffect, useRef } from "react";

export default function Banner({large, small}) {
  // Default banner images for non-medium screens
  const defaultBannerImages = large

  // Medium screen banner images
  const mediumBannerImages = small

  const [current, setCurrent] = useState(0);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const intervalRef = useRef(null);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      // Medium screens are typically 768px to 1023px
      setIsMediumScreen(window.innerWidth <= 768);
    };

    // Check on mount
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Reset current index when screen size changes to avoid out-of-bounds errors
  useEffect(() => {
    setCurrent(0);
  }, [isMediumScreen]);

  useEffect(() => {
    // Get the appropriate array length based on screen size
    const imagesArray = isMediumScreen
      ? mediumBannerImages
      : defaultBannerImages;

    // Auto-advance carousel for all screen sizes
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imagesArray.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [isMediumScreen, defaultBannerImages.length, mediumBannerImages.length]);

  const goTo = (idx) => setCurrent(idx);

  // Get the current array of images based on screen size
  const currentBannerImages = isMediumScreen
    ? mediumBannerImages
    : defaultBannerImages;

  return (
    <section className="w-full h-52 max-md:h-auto relative border-b border-gray-400 overflow-hidden">
      <Image
        priority
        alt={`banner image ${current + 1}`}
        width={1200}
        height={400}
        src={currentBannerImages[current]}
        className="w-full h-full aspect-video object-cover text-base text-primary transition-all duration-500"
      />

      {/* Carousel indicators for all screen sizes */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {currentBannerImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-primary" : "bg-gray-300"
            } border border-white`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
