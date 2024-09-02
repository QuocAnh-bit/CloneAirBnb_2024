"use client";

import { usePathname } from "next/navigation";

export default function Main({ children }) {
  const path = usePathname();

  return (
    <main
      className={` ${
        !path.includes("publish-celebration") &&
        "mt-[80px] pb-[96px]  px-6 md:mt-[88px] md:mb-[82px]  md:pb-0 md:px-20 scrollbar-hide overflow-y-hidden"
      } `}
    >
      {children}
    </main>
  );
}
