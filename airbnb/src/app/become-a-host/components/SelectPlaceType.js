"use client";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { Card, CardHeader, Image } from "@nextui-org/react";

import React, { useEffect, useState } from "react";

export default function SelectPlaceType({
  selectedPlaceType,
  setSelectedPlaceType,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [placeTypeItems, setPlaceTypeItems] = useState(null);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const getPlaceTypes = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get("/place-types");
      if (res.status === 200) {
        setIsLoading(false);
        console.log(res);
        setPlaceTypeItems(res.data);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    getPlaceTypes();
  }, [axiosAuth]);

  return (
    <div className="flex flex-col gap-3 animate-fade-up">
      <input type="hidden" name="placeType" value={selectedPlaceType} />
      {!isLoading &&
        placeTypeItems?.map((item) => (
          <div key={item.id} className="cursor-pointer md:min-h-[88px] ">
            <div onClick={() => setSelectedPlaceType(item.typeName)}>
              <Card
                className={` p-2 shadow-none	border-2 border-[#DDDD] ${
                  selectedPlaceType === item.typeName
                    ? "border-black border-2 bg-[#efdfdf5c]"
                    : ""
                } `}
              >
                <CardHeader>
                  <div className="flex justify-between w-full items-center">
                    <div className="basis-3/4">
                      <h2>{item.typeTitle}</h2>
                      <p className="md:max-w-[400px] text-[#6a6a6a]">
                        {item.typeDesc}
                      </p>
                    </div>
                    <Image
                      src={item.typeImg}
                      alt={item.typeName}
                      height={52}
                      width={52}
                      className={`${
                        selectedPlaceType === item.typeName
                          ? "animate-jump"
                          : ""
                      }`}
                    />
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        ))}
    </div>
  );
}
