import React, { useEffect, useRef, useState } from "react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation"; // Ensure you import Swiper CSS for navigation
import useAxiosAuth from "@/hook/useAxiosAuth";
import ChevronIcon from "../icons/ChevronIcon";
import Adjustments from "../icons/Adjustments";
import ChevronBtn from "../button/ChevronBtn";
import CategoriesSkeleton from "../skeleton/CategoriesSkeleton";
import { Skeleton } from "@nextui-org/react";

export default function Categories({ path }) {
  const swiper = useSwiper();
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [indexChange, setIndexChange] = useState({
    start: true,
    end: false,
  });
  const [selected, setSelected] = useState(0);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axiosAuth.get("/categories");
        if (res.status === 200) {
          setCategories(res.data);
          console.log(res.data);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } else {
          console.log("Loi");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, [axiosAuth]);

  const onChange = (index) => {
    setSelected(index);
  };

  return (
    <div
      className={`${
        path === "/" ? "" : "hidden"
      } w-full mx-auto pl-10 md:px-10 xl:px-20 sticky md:flex items-center justify-between gap-2 `}
    >
      {loading ? (
        <CategoriesSkeleton />
      ) : (
        <>
          <div className="relative flex items-center justify-between md:max-w-[65%] xl:max-w-[80%] ml-[-30px] ">
            <div
              ref={prevRef}
              className={`absolute left-0  hidden top-0 bottom-0 items-center z-10 cursor-pointer ${
                !indexChange.start ? " md:flex" : ""
              }`}
            >
              <div className="bg-white  h-full flex justify-center items-center">
                <ChevronBtn rotate={"left"} />
              </div>
              <div className="w-7 h-full bg-gradient-to-l from-white/40 to-white/100"></div>
            </div>
            <div
              ref={nextRef}
              className={`absolute hidden right-0 top-0 bottom-0 items-center z-10 cursor-pointer ${
                !indexChange.end ? "md:flex" : ""
              }`}
            >
              <div className="w-7 h-full bg-gradient-to-r from-white/40 to-white/100"></div>
              <div className="bg-white  h-full flex justify-center items-center">
                <ChevronBtn rotate={"right"} />
              </div>
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
              className="]"
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
              slidesPerView={3}
              slidesPerGroupSkip={1}
              modules={[Navigation, Pagination, A11y]}
              breakpoints={{
                300: {
                  slidesPerView: 4.5,
                },
                500: {
                  slidesPerView: 5.5,
                },
                600: {
                  slidesPerView: 6.5,
                },
                700: {
                  slidesPerView: 7.5,
                },
                768: {
                  slidesPerView: 5,
                },
                800: {
                  slidesPerView: 6,
                },
                900: {
                  slidesPerView: 7,
                },
                1280: {
                  slidesPerView: 10,
                  allowTouchMove: false,
                },
              }}
            >
              {categories.map((item, index) => (
                <SwiperSlide
                  onClick={() => onChange(index)}
                  key={index}
                  className={`flex justify-center w-fit cursor-pointer group`}
                >
                  <div
                    className={`w-fit flex  cursor-pointer ${
                      index !== selected
                        ? "group-hover:border-b-1"
                        : "border-b-2 border-black"
                    }`}
                  >
                    <label htmlFor={`${index}`} className="cursor-pointer">
                      <input
                        type="checkbox"
                        checked={index === selected}
                        onChange={() => onChange(index)}
                        id={`${index}`}
                        hidden
                      />
                      <div className="py-2">
                        <div
                          className={`flex justify-center ${
                            index !== selected
                              ? "opacity-55 group-hover:opacity-100"
                              : ""
                          }`}
                        >
                          <Image
                            alt={`item`}
                            src={item.categoryImg}
                            width={32}
                            height={32}
                          />
                        </div>
                        <div
                          className={`text-left text-xs py-1 truncate  ${
                            index !== selected
                              ? "group-hover:font-bold"
                              : "font-bold"
                          }`}
                        >
                          {item.categoryTitle}
                        </div>
                      </div>
                    </label>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
      <div className="hidden md:block">
        <div>
          <button className="bg-white border-1 p-2 hover:bg-black/5 hover:border-black flex gap-2 items-center rounded-md">
            <span>
              <Adjustments className={"h-6 w-6"} />
            </span>
            {loading ? <Skeleton className="h-4 w-12 rounded-lg" /> : "Filters"}
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <div>
          <button className="bg-white border-1 p-2 hover:bg-black/5 hover:border-black flex gap-2 rounded-md truncate">
            {loading ? (
              <Skeleton className="h-6 w-40 rounded-lg" />
            ) : (
              " Display total before taxes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
