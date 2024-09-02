/* eslint-disable react/no-unescaped-entities */
"use client";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function OverView() {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    const res = await axiosAuth.post("/properties", {
      id: session?.id,
    });
    if (res.status === 200) {
      setIsLoading(false);
      router.push(`/become-a-host/${res.data.id}/about-your-place`);
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };
  return (
    <div className="md:flex md:h-full md:justify-center md:w-full md:items-center ">
      <div className="mb-6 md:w-[50vw] max-w-[700px] mr-12 flex flex-col items-start justify-center">
        <h1 className="md:max-w-[514px] md:text-[3.5rem] md:leading-[4rem]">
          It’s easy to get started on Airbnb
        </h1>
      </div>
      <div className="md:w-[50vw] max-w-[600px]">
        <div className="grid grid-cols-[0fr_2fr_1fr] lg:grid-cols-[0fr_3fr_1fr] mb-8">
          <div className="font-[500] md:text-[1.375rem] md:leading-[1.675rem] pr-3">
            1
          </div>
          <div className="pr-3 md:max-w-448px">
            <h2 className="pb-2 leading-[-0.01375rem] md:text-[1.375rem] md:leading-[1.675rem]">
              Tell us about your place
            </h2>
            <h3 className="md:text-[1.275rem] md:leading-[1.5rem]">
              Share some basic info, like where it is and how many guests can
              stay.
            </h3>
          </div>
          <div className="ml-auto">
            <Image
              src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
              width={86}
              height={86}
              alt="Picture of the author"
              className=" md:w-[120px] object-cover	object-center	"
            />
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-[0fr_2fr_1fr] lg:grid-cols-[0fr_3fr_1fr] my-8">
          <div className="font-[500] md:text-[1.375rem] md:leading-[1.675rem] pr-3">
            2
          </div>
          <div className="pr-3 md:max-w-448px">
            <h2 className="pb-2 leading-[-0.01375rem]">Make it stand out</h2>
            <h3 className="">
              Add 5 or more photos plus a title and description—we’ll help you
              out.
            </h3>
          </div>
          <div className="ml-auto">
            <Image
              src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
              width={86}
              height={86}
              alt="Picture of the author"
              className=" md:w-[120px] object-cover	object-center	"
            />
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-[0fr_2fr_1fr] lg:grid-cols-[0fr_3fr_1fr] my-8">
          <div className="font-[500] md:text-[1.375rem] md:leading-[1.625rem] pr-3">
            3
          </div>
          <div className="pr-3 md:max-w-448px">
            <h2 className="pb-2 leading-[-0.01375rem]">
              Finish up and publish
            </h2>
            <h3 className=" ">
              Choose if you'd like to start with an experienced guest, set a
              starting price, and publish your listing.
            </h3>
          </div>
          <div className="ml-auto">
            <Image
              src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
              width={86}
              height={86}
              alt="Picture of the author"
              className=" md:w-[120px] object-cover	object-center	"
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10 py-4 bg-white border-[#DDDDDD] border-t-[5px]">
        <div className="px-6 md:flex md:w-full md:justify-end">
          <button
            onClick={handleClick}
            className="text-[16px] px-7 py-[14px] text-white w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm  text-center md:max-w-[200px]"
          >
            {isLoading ? (
              <BeatLoader color="#36d7b7" size={11} />
            ) : (
              "Get started"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
