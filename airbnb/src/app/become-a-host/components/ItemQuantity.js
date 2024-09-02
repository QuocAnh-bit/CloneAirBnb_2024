"use client";
import React from "react";
import MinusIcon from "@/app/components/icons/MinusIcon";
import PlusIcon from "@/app/components/icons/PlusIcon";

export default function ItemQuantity({
  label,
  value,
  minValue,
  maxValue,
  onIncrement,
  onDecrement,
  size = "",
  desc = "",
  isMax = false,
  animate = "animate-fade-up",
}) {
  const handleIncrement = () => {
    if (value < maxValue) {
      onIncrement();
    }
  };

  const handleDecrement = () => {
    if (value > minValue) {
      onDecrement();
    }
  };
  return (
    <div
      className={`flex justify-between py-4 ${animate} ${size} items-center`}
    >
      <div className="flex flex-col">
        <div className="text-[1.125rem] font-medium">{label}</div>
        {desc && <div className="text-[1rem] ">{desc}</div>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value > minValue ? false : true}
          className="disabled:text-blue-300"
        >
          <MinusIcon className={"h-[30px] w-[30px]"} strokeWidth={1} />
        </button>
        <div className="min-w-[35px] text-center">{value}</div>
        <button
          onClick={handleIncrement}
          type="button"
          disabled={!isMax ? (value < maxValue ? false : true) : true}
          className="disabled:text-blue-300"
        >
          <PlusIcon className={"h-[30px] w-[30px]"} strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}
