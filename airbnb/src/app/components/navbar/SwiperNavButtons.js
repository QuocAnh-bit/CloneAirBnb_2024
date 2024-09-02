import React from "react";
import { useSwiper } from "swiper/react";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return <button onClick={() => swiper.slideNext()}>Prev</button>;
};
