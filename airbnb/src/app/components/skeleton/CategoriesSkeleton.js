import React from "react";
import ChevronBtn from "../button/ChevronBtn";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Skeleton } from "@nextui-org/react";

export default function CategoriesSkeleton() {
  const categories = Array(10).fill(0);
  return (
    <div className="relative flex items-center justify-between  overflow-x-hidden">
      <div className="flex ">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`flex justify-center w-fit cursor-pointer group mr-14`}
          >
            <div className={`w-fit flex  `}>
              <div>
                <div className="py-2 flex flex-col gap-1">
                  {" "}
                  <Skeleton className="flex rounded-full w-12 h-12 " />
                  <Skeleton className="h-3 w-5/5 rounded-lg " />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
