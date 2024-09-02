"use client";
import useAxiosAuth from "@/hook/useAxiosAuth";
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

export default function SelectAmenities({
  selectedAmenities,
  setSelectedAmenities,
}) {
  const [amenityItems, setAmenityItems] = useState(null);

  const axiosAuth = useAxiosAuth();

  const addAmenity = (name) =>
    setSelectedAmenities([...selectedAmenities, name]);

  const removeAmenity = (name) => {
    const indexRemove = selectedAmenities.findIndex((item) => item === name);
    if (indexRemove !== -1) {
      const cloneAmenities = [...selectedAmenities];
      cloneAmenities.splice(indexRemove, 1);
      setSelectedAmenities(cloneAmenities);
    }
  };

  useEffect(() => {
    const getAmenities = async () => {
      const res = await axiosAuth.get("/amenities");
      if (res.status === 200) {
        const data = res.data.sort((a, b) => a.order - b.order);
        console.log(data);
        setAmenityItems(data);
      } else {
        console.log("Loi");
      }
    };
    getAmenities();
  }, [axiosAuth]);

  return (
    <div>
      {amenityItems?.map((type, index) => (
        <div key={index} className="mb-12 animate-fade-up">
          <h2 className="mb-[15px] ">{type.desc}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 animate-fade-up">
            {type?.dataAmenities?.map(({ id, imgName, name }, index) => (
              <div
                className="animate-fade-up"
                key={id}
                onClick={() =>
                  selectedAmenities?.includes(name)
                    ? removeAmenity(name)
                    : addAmenity(name)
                }
              >
                <Card
                  className={`p-4 shadow-none	border-2 border-[#DDDD] h-full ${
                    selectedAmenities?.includes(name)
                      ? "border-black border-2 bg-[#efdfdf5c]"
                      : ""
                  } `}
                >
                  <CardHeader>
                    <Image
                      src={imgName}
                      alt={imgName}
                      height={45}
                      width={45}
                      className={`${
                        selectedAmenities?.includes(name) ? "animate-jump" : ""
                      }`}
                    />
                  </CardHeader>
                  <p className="font-bold break-all text-left px-3">{name}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
