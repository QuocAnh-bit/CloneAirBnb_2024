"use client";
import Logo from "@/app/components/navbar/Logo";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { BeatLoader } from "react-spinners";

export default function NavBar() {
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsLoading(true);
  };
  return (
    <div className={``}>
      <div
        className={`fixed top-0 left-0 right-0 px-6 pt-4 pb-2  flex   md:px-12 md:pt-8 z-20 md:justify-between md:items-center ${
          !path.includes("publish-celebration") && "bg-white"
        }`}
      >
        <div className="hidden md:block">
          <Logo />
        </div>
        <div
          className={`${
            path.includes("publish-celebration") ? "hidden" : "flex"
          }  w-full justify-between md:justify-end md:gap-2`}
        >
          <div>
            {path == "/become-a-host/overview" || path == "/become-a-host" ? (
              <button className="px-4 py-2 border-[#2222] border-1 rounded-2xl font-bold 	hover:border-black">
                Exit
              </button>
            ) : (
              <button
                className="px-4 py-2 border-[#2222] border-1 rounded-2xl font-bold 	hover:border-black min-w-[115px]"
                form="save"
                onClick={handleClick}
                name="save"
              >
                {isLoading ? <BeatLoader size={7} /> : "Save & Exit"}
              </button>
            )}
          </div>
          <div className="order-first">
            {path !== "/become-a-host/overview" && (
              <button className="px-4 py-2 border-[#2222] border-1 rounded-2xl font-bold hover:border-black">
                Questions
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
