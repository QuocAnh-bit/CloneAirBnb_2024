import React, { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";
// import { CiMenuBurger } from "react-icons/ci";
// import { FaUserCircle } from "react-icons/fa";
// import { MdOutlineLanguage, MdWindPower } from "react-icons/md";
import Search from "./Search";
import Link from "next/link";

export default function Header({ path }) {
  const [y, setY] = useState(document.scrollingElement.scrollHeight);

  const [shrink, setShrink] = useState(path === "/" ? true : false);

  const handleShrink = useCallback(
    (e) => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.scrollingElement.scrollHeight;

      if (y > scrollPosition) {
        if (path === "/") {
          setShrink(true);
        }
      } else if (y < scrollPosition) {
        if (path === "/") {
          setShrink(false);
        }
      }

      // Check if scrolled to the bottom
      if (scrollPosition + windowHeight >= fullHeight) {
        console.log("Scrolled to the bottom!");
        setShrink(false);

        // Add any additional logic here if needed when scrolled to the bottom
      }

      setY(scrollPosition);
    },
    [y, path]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleShrink);
    return () => {
      window.removeEventListener("scroll", handleShrink);
    };
  }, [handleShrink]);

  return (
    <div
      className={`hidden md:block  px-10  xl:px-20 transition-all duration-150 ${
        path.includes("/rooms") ? "max-w-[1280px] mx-auto" : "border-2"
      } ${shrink ? (path === "/" ? "h-60 lg:h-[176px]" : "h-20") : "h-20"}`}
    >
      <header className="h-20 flex items-center justify-between border-b-black/10 ">
        <Logo />
        <Search shrink={shrink} path={path} setShrink={setShrink} />
        {/* Control Menu  */}
        <div className="hidden md:flex items-center self-center justify-self-end gap-3 z-10">
          <div className="hover:bg-black/5 cursor-pointer px-2 py-3 rounded-xl">
            <Link href={"/become-a-host"} className="font-medium truncate">
              Airbnb your home
            </Link>
          </div>
          <div>{/* <MdOutlineLanguage size={20} /> */}</div>
          <div>
            <button>
              <div className="flex gap-x-2 items-center py-2 px-3 border-2 rounded-3xl">
                {/* <CiMenuBurger size={16} strokeWidth={2} />
                <FaUserCircle size={32} /> */}
              </div>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
