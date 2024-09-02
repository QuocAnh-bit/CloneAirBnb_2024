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
      <div className="relative bg-white top-0 left-0 right-0 px-6 py-4  flex   justify-between items-center border-b-1">
        <div className="">
          <Logo />
        </div>
        <div className="flex gap-3">
          <div>Today</div>
          <div>Calender</div>
          <div>Listings</div>
          <div>Inbox</div>
          <div>Menu</div>
        </div>
        <div>Menu</div>
      </div>
    </div>
  );
}
