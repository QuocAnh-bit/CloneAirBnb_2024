import React from "react";
import ChevronIcon from "../icons/ChevronIcon";

export default function ChevronBtn({ rotate }) {
  return (
    <div
      className={`border-1 border-black/10 rounded-full p-1 shadow-md bg-white transition-all hover:shadow-[0px_7px_5px_0px_#cbd5e0] ${
        rotate == "left" ? "hover:pr-2" : "hover:pl-2"
      } group cursor-pointer`}
    >
      <ChevronIcon
        className={`h-5 w-5  transition-all  ${
          rotate == "left"
            ? "rotate-90 group-hover:-translate-x-1"
            : rotate == "right"
            ? "-rotate-90 group-hover:translate-x-1"
            : "rotate-180"
        }`}
      />
    </div>
  );
}
