import React from "react";

export default function ReturnStatus({ currentStep = "shipped" }) {
  const steps = [
    { id: "placed", label: "Order placed" },
    { id: "processing", label: "Processing" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
  ];

  const activeIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div>
      <input type="range" className="w-full h-4 accent-primary disabled:accent-primary" aria-readonly readOnly />
      <ul className="w-full flex justify-between border-none items-center">
        <li className="w-auto"></li>
        <li className="w-auto"></li>
        <li className="w-auto"></li>
        <li className="w-auto"></li>
      </ul>
    </div>
  );
};

