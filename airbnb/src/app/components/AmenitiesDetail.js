import useAxiosAuth from "@/hook/useAxiosAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function AmenitiesDetail({ property }) {
  const [amenityItems, setAmenityItems] = useState(null);
  const axiosAuth = useAxiosAuth();
  const selectAmenities = property?.amenities?.map((i) => i.name);
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
      <div className=" animate-fade-up">
        <div className="grid grid-cols-2 gap-3  animate-fade-up">
          {property?.amenities?.map(({ id, imgName, name }, index) => (
            <div key={id} className="flex gap-2 items-center">
              <Image src={imgName} alt={imgName} height={45} width={45} />
              <div
                className={`${
                  selectAmenities?.includes(name) ? "" : "line-through"
                }`}
              >
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
