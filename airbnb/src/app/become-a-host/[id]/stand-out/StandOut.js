/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Video from "../../components/Video";
import NavigationSteps from "../../components/NavigationSteps";
import { useRouter } from "next/navigation";

export default function StandOut({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    router.push(`/become-a-host/${params.id}/amenities`);
  };
  return (
    <div className="md:w-full md:flex md:items-center  md:justify-center mx-auto ">
      <div className="flex justify-center overflow-hidden  order-last max-h-[474px] self-end	">
        <Video
          src={`https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high`}
        />
      </div>
      <div className="basis-1/2 max-w-[500px] text-left">
        <div className="font-bold md:mb-4 md:text-[1.275rem]">Step 2</div>
        <h1 className="md:mb-6 text-[3rem] ">Make your place stand out</h1>
        <div className="md:text-[1.275rem]">
          In this step, you’ll add some of the amenities your place offers, plus
          5 or more photos. Then, you’ll create a title and description.
        </div>
        <form onSubmit={handleSubmit}>
          <NavigationSteps
            currentStep={2}
            totalStep={5}
            step={0}
            isLoading={isLoading}
            // disabled={!selectedPlaceType ? true : false}
          />
        </form>
      </div>
    </div>
  );
}
