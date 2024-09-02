import React, { useState } from "react";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineControl } from "react-icons/ai";
import ModalFilter from "./ModalFilter";
import Categories from "./Categories";

export default function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    console.log("ok");
    setOpen(!open);
  };
  return (
    <>
      <div
        className={`flex flex-wrap items-center gap-x-2 gap-y-6 w-full bg-white z-20  md:hidden  px-[24px] pt-[14px]  `}
      >
        {/* Search Mobile */}
        <div className="flex-1 md:hidden ">
          <button className="flex gap-2 w-full items-center px-4 shadow-lg min-h-14 rounded-full border">
            <span>{/* <BiSearch size={20} strokeWidth={1} /> */}</span>
            <span className="flex-1 text-[14px] font-semibold text-left">
              <div>Anywhere</div>
              <div className="font-light text-[12px] ">
                <span>Any week - </span>
                <span>Add guest</span>
              </div>
            </span>
          </button>
        </div>
        {/* Filters Mobile */}
        <div className="md:hidden">
          <button
            className="border border-stone-500 h-10 w-10 rounded-full "
            onClick={handleModal}
          >
            {/* <AiOutlineControl size={20} className="mx-auto" /> */}
          </button>
        </div>
      </div>
      <ModalFilter open={open} handleModal={handleModal} />
    </>
  );
}
