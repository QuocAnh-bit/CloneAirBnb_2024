"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function NavigationSteps({
  currentStep,
  totalStep,
  disabled,
  step,
  link,
  isLoading,
}) {
  const router = useRouter();
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    const calculateProgress = () => {
      const percentage = (step / totalStep) * 100;
      setProgressWidth(`${percentage}%`);
    };

    calculateProgress();
  }, [step, totalStep]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 py-4 bg-white  ">
      <div className="absolute w-full flex gap-1  top-0 left-0 right-0">
        <div className=" bg-[#DDDD] h-1 basis-1/3 overflow-x-hidden">
          <div
            className={`relative w-full h-full left-[-100%]  bg-black transition  `}
            style={{
              transform: `translateX(${
                currentStep > 1
                  ? "100%"
                  : currentStep === 1
                  ? progressWidth
                  : ""
              })`,
            }}
          ></div>
        </div>
        <div className="bg-[#DDDD] h-1 basis-1/3 overflow-x-hidden">
          <div
            className={`relative w-full h-full left-[-100%]  bg-black transition duration-1000	`}
            style={{
              transform: `translateX(${
                currentStep > 2
                  ? "100%"
                  : currentStep === 2
                  ? progressWidth
                  : ""
              })`,
            }}
          ></div>
        </div>
        <div className="bg-[#DDDD] h-1 basis-1/3 overflow-x-hidden">
          <div
            className={`relative w-full h-full left-[-100%]  bg-black transition duration-1000	`}
            style={{
              transform: `translateX(${
                currentStep > 3
                  ? "100%"
                  : currentStep === 3
                  ? progressWidth
                  : ""
              })`,
            }}
          ></div>
        </div>
      </div>
      <div className="mx-6 flex justify-between">
        <button onClick={() => router.back()}>Back</button>
        <button
          type="submit"
          className={`text-lg font-bold text-white ${
            isLoading ? "bg-slate-200" : "bg-black"
          } py-[12px] px-7 rounded-xl disabled:bg-slate-200`}
          disabled={disabled}
          name="next"
        >
          {isLoading ? <BeatLoader color="#36d7b7" size={11} /> : "Next"}
        </button>
      </div>
    </div>
  );
}
