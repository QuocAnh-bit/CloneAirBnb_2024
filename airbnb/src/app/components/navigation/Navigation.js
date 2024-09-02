"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import HeartIcon from "../icons/HeartIcon";
import TripsIcon from "../icons/TripsIcon";
import InboxIcon from "../icons/InboxIcon";
import UserIcon from "../icons/UserIcon";

export default function Navigation({ user }) {
  const path = usePathname();

  const [navigation, setNavigation] = useState(true);
  const [y, setY] = useState(window.scrollY);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setNavigation(true);
      } else if (y < window.scrollY) {
        setNavigation(false);

        // console.log("scrolling down");
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <nav
      className={`transition-all md:hidden bg-white   ${
        navigation ? "bottom-0" : "bottom-[-68px]"
      }  ${
        path !== "/" ? "hidden" : "fixed"
      } left-0 right-0 flex justify-center items-center  border-t-2 z-50`}
    >
      <div
        className={`${
          user ? "w-full" : "w-2/3"
        } flex justify-evenly py-3 text-black/65 text-xs`}
      >
        <div
          className={`basis-1/3  ${
            path === "/" ? "text-[#E81948]  font-bold" : ""
          }`}
        >
          <Link href={`/`} className="">
            <div className="w-full mb-1">
              <SearchIcon
                strokeWidth={path === "/" ? 2 : 1}
                className={"h-6 w-6 mx-auto"}
              />
            </div>
            <div className="text-center">Explore</div>
          </Link>
        </div>
        <div
          className={`basis-1/3  ${
            path === "/wishlists" ? "text-[#E81948]  font-bold" : ""
          }`}
        >
          <Link href={`#`}>
            <div className="w-full mb-1">
              <HeartIcon
                strokeWidth={path === "/wishlists" ? 3 : 1}
                className={"h-6 w-6 mx-auto"}
              />
            </div>
            <div className="text-center">Wishlists</div>
          </Link>
        </div>
        <div
          className={`${user ? "" : "hidden"} basis-1/3  ${
            path === "/trips" ? "text-[#E81948]  font-bold" : ""
          }`}
        >
          <Link href={`#`}>
            <div className="w-full mb-1">
              <TripsIcon
                strokeWidth={path === "/trips" ? 2 : 1}
                className={"w-6 h-6 mx-auto -rotate-90"}
              />
            </div>
            <div className="text-center">Trips</div>
          </Link>
        </div>
        <div
          className={`${user ? "" : "hidden"} basis-1/3  ${
            path === "/inbox" ? "text-[#E81948]  font-bold" : ""
          }`}
        >
          <Link href={`#`}>
            <div className="w-full mb-1">
              <InboxIcon
                strokeWidth={path === "/inbox" ? 2 : 1}
                className={"w-6 h-6 mx-auto "}
              />
            </div>
            <div className="text-center">Inbox</div>
          </Link>
        </div>
        <div
          className={`basis-1/3  ${
            path === "/login" || path === "/account-settings"
              ? "text-[#E81948] font-bold"
              : ""
          }`}
        >
          <Link href={user ? "/account-settings" : "/login"}>
            <div className="w-full mb-1">
              <UserIcon
                strokeWidth={
                  path === "/login" || path === "/account-settings" ? 2 : 1
                }
                className={"w-6 h-6 mx-auto "}
              />
            </div>
            <div className="text-center ">{user ? "Profile" : "Login"}</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
