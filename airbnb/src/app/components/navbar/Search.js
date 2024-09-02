import React from "react";
// import { BiSearch } from "react-icons/bi";

export default function Search({ shrink, path, setShrink }) {
  if (path.includes("/rooms")) setShrink(false);
  return (
    <div
      className={`flex basis-2/4 px-5 justify-center ${
        path === "/" || path.includes("/rooms") ? "" : "hidden"
      }`}
    >
      <div
        className={`flex h-11 border-2  rounded-full w-full max-w-[400px] items-center text-center text-[14px] font-bold ${
          shrink ? "hidden" : "shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
        }`}
      >
        <button className="basis-2/6 px-4 truncate">Anywhere</button>
        <div className="border-r-2 border-black/5 h-6 "></div>
        <button className="basis-2/6  px-4 truncate">Any week</button>
        <div className="border-r-2 border-black/5 h-6"></div>
        <div className="basis-4/6 flex  justify-between items-center">
          <div className="basis-2/3 truncate pl-2">Add guest</div>
          <div className="pr-[6px]">
            <button className="bg-red-400 p-2 rounded-full   text-white tex-center">
              {/* <BiSearch size={16} /> */}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`absolute  top-[64px] lg:top-0 flex flex-col items-center left-0 right-0 px-10 w-full transition-all duration-150	 ${
          shrink ? "" : "-translate-y-[150%] w-0 "
        }`}
      >
        <form action="" className={`${shrink ? "" : "animate-jump-out"}`}>
          <div className="flex w-full justify-center items-center gap-3 h-20">
            <div className="flex gap-3">
              <button>
                <div className="mx-3 my-[10px] ">Stays</div>
              </button>
              <button>
                <div className="mx-3 my-[10px] ">Experiences</div>
              </button>
            </div>
            <div className="px-3 py-[10px]">Online Experiences</div>
          </div>
          <div className="border-2 flex items-center rounded-full overflow-hidden w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] max-w-[850px]">
            <div className="grow px-8 py-3 basis-1/3 ">
              <div className="text-xs">Where</div>
              <input
                type="text"
                placeholder="Search destinations"
                className="text-[14px]"
              />
            </div>
            <div className="border-r-2 border-black/5 h-8"></div>
            <div className="flex items-center basis-1/3">
              <div className="basis-1/2 px-8 py-3">
                <div className="text-xs">Check in</div>
                <div className="text-[14px] truncate">Add Date</div>
              </div>
              <div className="border-r-2 border-black/5 h-8"></div>

              <div className="basis-1/2 px-8 py-3">
                <div className="text-xs">Check out</div>
                <div className="text-[14px] truncate">Add Date</div>
              </div>
            </div>
            <div className="border-r-2 border-black/5 h-8"></div>

            <div className=" flex  basis-1/3 justify-between">
              <div className="px-8 py-3">
                <div className="text-xs">Who</div>
                <div className="text-[14px] ">Add guest</div>
              </div>
              <button className="bg-red-400 p-3 rounded-full self-center mr-4 text-white">
                {/* <BiSearch size={20} /> */}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
