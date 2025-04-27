"use client";
import { useState, useEffect } from "react";

export default function Popover({ message }) {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    setIsVisible(true); // Show when message changes

    if (!message) return; // Don't set timer if no message

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible) return null;

  return (
    <div className="animate-fade-in rounded-md border-green-800 text-green-800 bg-green-200 w-full p-3 text-sm absolute top-0 left-0 z-50 shadow-md">
      {message}
    </div>
  );
}
