/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Video from "../../components/Video";
import NavigationSteps from "../../components/NavigationSteps";
import { useRouter } from "next/navigation";

export default function FinishSetup({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    router.push(`/become-a-host/${params.id}/price`);
  };
  return (
    <div className="md:w-full md:flex md:items-center  md:justify-center mx-auto">
      <div className="flex justify-center basis-1/2 order-last overflow-hidden max-h-[474px] self-end	">
        <Video
          src={`https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high`}
        />
      </div>
      <div className="basis-1/2 max-w-[575px] text-left">
        <div className="font-bold md:mb-4 md:text-[1.275rem]">Step 3</div>
        <h1 className="md:mb-6 md:text-[3rem] leading-[3.375rem]">
          Finish up and publish
        </h1>
        <div className="md:text-[1.275rem]">
          Finally, you'll choose booking settings, set up pricing, and publish
          your listing.
        </div>
        <form onSubmit={handleSubmit}>
          <NavigationSteps
            currentStep={3}
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
