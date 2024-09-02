"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { debounce } from "lodash";
import Image from "next/image";
import HeaderMobile from "./HeaderMobile";
import Header from "./Header";
import Categories from "./Categories";
// import CarouselHeader from "./CarouserHeader";

export default function NavBar({ user, setNavbarHeight }) {
  const navBarRef = useRef(null);
  const path = usePathname();
  useEffect(() => {
    // Sau khi component được render, lấy chiều cao của header
    if (navBarRef.current) {
      setNavbarHeight(navBarRef.current.clientHeight);
    }

    // Theo dõi sự thay đổi kích thước của cửa sổ và cập nhật chiều cao của header
    const handleResize = () => {
      if (navBarRef.current) {
        setNavbarHeight(navBarRef.current.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div
      ref={navBarRef}
      className={`nav-bar ${
        !path.includes("/rooms") ? "fixed md:p-0  md:border-0 " : "relative"
      } top-0 w-full  bg-white z-50 border-b-[1px] border-black/5 ${
        path === "/" || path.includes("/rooms") ? "" : "hidden "
      }`}
    >
      <HeaderMobile />
      <Header path={path} />
      {/* Tablet */}
      {/* Logo Tablet */}
      {path === "/" && <Categories path={path} />}
      {/* Search */}

      {/* Filter Mobile */}
    </div>
  );
}
