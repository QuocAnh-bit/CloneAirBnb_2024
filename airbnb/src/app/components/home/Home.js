"use client";
import React, { useEffect, useRef, useState } from "react";
import axiosClient from "@/api/axiosClient";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import ChevronBtn from "../button/ChevronBtn";
import HeartIcon from "../icons/HeartIcon";
import Link from "next/link";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [indexChange, setIndexChange] = useState({
    start: true,
    end: false,
  });
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await axiosClient.get("/properties");
        if (res.status === 200) {
          setProperties(res.data);
          console.log(res);
        } else {
          console.log("Loi");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getProperties();
  }, []);

  return (
    <div className=" pt-4">
      <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-5 lg:grid-cols-3 w-full">
        {properties?.map((property, index) => (
          <Link
            href={`/rooms/${property.id}`}
            target="_blank"
            key={property.id}
            className="relative  select-none "
          >
            <div className="absolute top-4 left-3 px-3 py-[2px] bg-white rounded-2xl font-medium z-10 shadow-lg">
              <span>Guest favorite</span>
            </div>
            <div className="absolute top-4 right-3 rounded-2xl  z-10 shadow-lg cursor-pointer">
              <HeartIcon
                className={
                  "h-7 w-7 text-white transition-all hover:h-8 hover:w-8"
                }
                strokeWidth={2}
              />
            </div>
            <Swiper
              onRealIndexChange={(e) => {
                if (!e.isBeginning) {
                  setIndexChange((prev) => ({ ...prev, start: false }));
                } else {
                  setIndexChange((prev) => ({ ...prev, start: true }));
                }
                if (!e.isEnd) {
                  setIndexChange((prev) => ({ ...prev, end: false }));
                } else {
                  setIndexChange((prev) => ({ ...prev, end: true }));
                }
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              pagination={{
                dynamicBullets: true,
              }}
              breakpoints={{
                1280: {
                  allowTouchMove: false,
                },
              }}
              modules={[Navigation, Pagination]}
              className="h-72  w-full rounded-lg  relative group/item"
              style={{
                "--swiper-pagination-color": "#FFFFFF",
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "8px",
              }}
            >
              <div
                ref={prevRef}
                className={`absolute z-10 left-3  top-[50%] bottom-[50%] -translate-y-1/2  hidden ${
                  !indexChange.start ? "group-hover/item:block" : ""
                } `}
              >
                <ChevronBtn rotate={"left"} />
              </div>
              <div
                ref={nextRef}
                className={`absolute z-10 right-3  top-[50%] bottom-[50%] -translate-y-1/2   hidden ${
                  !indexChange.end ? "group-hover/item:block" : ""
                }`}
              >
                <ChevronBtn rotate={"right"} />
              </div>
              {console.log(property.propertyImages)}

              {property.propertyImages.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className=" flex h-full w-full items-center justify-center relative ">
                    <Image
                      placeholder="blur"
                      blurDataURL={item.imgName}
                      priority
                      src={item.imgName}
                      alt={item.imgName}
                      fill
                      className="block h-full w-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-3	">
              <div className="flex justify-between items-center ">
                <div className="font-bold">
                  <span>{property?.location?.province}</span>
                  {", "}
                  <span>{property?.location?.country}</span>
                </div>
                <div>Rate</div>
              </div>
              <div>
                <span>Host: </span>
                <span>{property?.user?.username}</span>
              </div>
              <div>Calendar</div>
              <div>
                <span className="font-bold">${property?.nightPrice}</span>
                <span> / night</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
