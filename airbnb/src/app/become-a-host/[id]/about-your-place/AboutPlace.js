/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Video from "../../components/Video";
import NavigationSteps from "../../components/NavigationSteps";
import { useRouter } from "next/navigation";

export default function AboutPlace({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    router.push(`/become-a-host/${params.id}/structure`);
  };
  return (
    <div className="md:w-full md:flex md:items-center  md:justify-center mx-auto">
      <div className="flex justify-center basis-1/2 order-last overflow-hidden max-h-[474px] self-end	">
        <Video
          src={`https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high`}
        />
      </div>
      <div className="basis-1/2 max-w-[575px] text-left">
        <div className="font-bold md:mb-4 md:text-[1.275rem]">Step 1</div>
        <h1 className="md:mb-6 md:text-[3rem] leading-[3.375rem]">
          Tell us about your place
        </h1>
        <div className="md:text-[1.275rem]">
          In this step, we'll ask you which type of property you have and if
          guests will book the entire place or just a room. Then let us know the
          location and how many guests can stay.
        </div>
        <form onSubmit={handleSubmit}>
          <NavigationSteps isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
}
