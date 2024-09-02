"use client";
import React, { useCallback, useEffect, useState } from "react";
import NavBar from "./navbar/Navbar";
import Navigation from "./navigation/Navigation";
import { usePathname } from "next/navigation";

export default function View({ children, currentUser }) {
  const [navbarHeight, setNavbarHeight] = useState(0);

  const path = usePathname();

  return (
    <div>
      <NavBar user={currentUser} setNavbarHeight={setNavbarHeight} />
      <Navigation user={currentUser} />
      <div
        className={`${
          !path.includes("become-a-host") && !path.includes("book/stays")
            ? "mt-0 md:pt-5 lg:pt-0 xl:px-20 px-6 pb-48"
            : ""
        }`}
        style={{
          marginTop: `${
            path.includes("rooms") || path.includes("book/stays")
              ? "0px"
              : navbarHeight + "px"
          }`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
