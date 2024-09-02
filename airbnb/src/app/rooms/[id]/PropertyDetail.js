"use client";

import SelectedGuests from "@/app/components/SelectedGuests";
import DatePiker from "@/app/components/datePiker/DatePiker";
import moment from "moment";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { Avatar } from "@nextui-org/react";
import { addDays, differenceInDays, format } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { transformString } from "@/utils/queryParams";
import AmenitiesDetail from "@/app/components/AmenitiesDetail";
import { useRouter } from "next/navigation";

export default function PropertyDetail({ params }) {
  const axiosAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState([]);
  const router = useRouter();
  const [roomPrices, setRoomPrices] = useState({
    totalPrice: 0,
    serviceFee: 0,
    beforeTaxes: 0,
  });

  const [quantityTypeGuest, setQuantityTypeGuest] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [calendar, setCalendar] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setProperty(res.data);
        console.log(res.data);

        setCalendar([
          { ...res.data.bookings.suggestedDates, key: calendar[0].key },
        ]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    getProperty();
  }, [axiosAuth, params.id]);
  console.log();

  useEffect(() => {
    const handlePrice = () => {
      const nightPrice = property.nightPrice;
      const totalNight = differenceInDays(
        calendar[0]?.endDate,
        calendar[0]?.startDate
      );
      const totalPrice = nightPrice * totalNight;
      const serviceFee = Math.round(totalPrice * 0.14);
      const beforeTaxes = totalPrice + serviceFee;
      setRoomPrices({
        totalPrice,
        serviceFee,
        beforeTaxes,
      });
    };
    handlePrice();
  }, [calendar, property.nightPrice]);

  const showFloorPlan = (data) => {
    const filteredObj = Object.keys(data).reduce((acc, key) => {
      if (key.startsWith("num")) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    const result = Object.keys(filteredObj).map(function (key) {
      return `${
        filteredObj[key]
      } ${filteredObj[key] > 1 ? key.replace("num", "") : key.replace("num", "").replace("s", "")}`;
    });
    return result;
  };

  const handleClick = () => {
    const queryParams = {
      numberOfAdults: quantityTypeGuest.adults,
      numberOfChildren: quantityTypeGuest.children,
      numberOfInfants: quantityTypeGuest.infants,
      checkin: format(calendar[0].startDate, "MM-dd-yyyy"),
      checkout: format(calendar[0].endDate, "MM-dd-yyyy"),
      // guestCurrency: "USD",
      productId: `${property?.id}`,
      // isWorkTrip: "false",
      // numberOfGuests: "1",
      photo: property?.propertyImages?.[0]?.imgName,
      // selectedCancellationPolicyId: "51",
      // code: "HM8YSMQKC8",
      // orderId: "1208424366547945091",
    };

    const queryString = transformString(queryParams);
    router.push(`/book/stays/${property?.id}?${queryString}`);
  };
  return (
    <div className="mx-auto max-w-[1280px] px-20 pb-20">
      <div className="py-6">
        <h1>{property.propertyName}</h1>
      </div>
      <div className="grid grid-cols-5 grid-rows-4  grid-flow-col rounded-xl overflow-hidden gap-2 relative">
        <button
          className="absolute bottom-3 border-black border-1 right-3 bg-white  px-3 py-1 rounded-lg"
          style={{ zIndex: 1 }}
        >
          Show all photos
        </button>
        <div className="col-span-3 row-span-4  bg-black/10 cursor-pointer">
          <div className="h-[308px] w-full relative flex ">
            <Image
              blurDataURL={property?.propertyImages?.[1]?.imgName}
              priority
              src={property?.propertyImages?.[0]?.imgName}
              alt={property?.propertyImages?.[0]?.imgName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className=" h-full w-full object-cover hover:brightness-75 "
            />
          </div>
        </div>
        <div className="row-span-2 col-start-4  bg-black/10 cursor-pointer">
          <div className="  h-[150px] w-full relative">
            <Image
              blurDataURL={property?.propertyImages?.[1]?.imgName}
              priority
              src={property?.propertyImages?.[1]?.imgName}
              alt={property?.propertyImages?.[1]?.imgName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="block h-full w-full object-cover hover:brightness-75"
            />
          </div>
        </div>
        <div className="row-span-2 col-start-5 bg-black/10 cursor-pointer">
          <div className="  h-[150px] w-full relative">
            <Image
              blurDataURL={property?.propertyImages?.[1]?.imgName}
              priority
              src={property?.propertyImages?.[2]?.imgName}
              alt={property?.propertyImages?.[2]?.imgName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="block h-full w-full object-cover hover:brightness-75"
            />
          </div>
        </div>
        <div className="row-span-2 col-start-4 row-start-3 bg-black/10 cursor-pointer">
          <div className="  h-[150px] w-full relative">
            <Image
              blurDataURL={property?.propertyImages?.[1]?.imgName}
              priority
              src={property?.propertyImages?.[3]?.imgName}
              alt={property?.propertyImages?.[3]?.imgName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="block h-full w-full object-cover hover:brightness-75"
            />
          </div>
        </div>
        <div className="row-span-2 col-start-5 row-start-3 bg-black/10 cursor-pointer">
          <div className="  h-[150px] w-full relative ">
            <Image
              blurDataURL={property?.propertyImages?.[1]?.imgName}
              priority
              src={property?.propertyImages?.[4]?.imgName}
              alt={property?.propertyImages?.[4]?.imgName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="block h-full w-full object-cover hover:brightness-75"
            />
          </div>
        </div>
      </div>
      <div className=" w-full ">
        <div className="flex ">
          <div className="basis-2/3  h-[1000px]">
            <div className="border-b-1 py-6">
              <h2 className=" text-2xl">
                <span className="capitalize">{property?.category}</span> in{" "}
                <span>{property?.location?.province}</span>
                {", "}
                <span>{property?.location?.country}</span>
              </h2>
              <span className="flex">
                {" "}
                {showFloorPlan(property).map((item, index) => {
                  if (index != showFloorPlan(property).length - 1) {
                    return (
                      <div key={index}>
                        <span>{item}</span>
                        <span className="px-2">&#8226;</span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index}>
                        <span>{item}</span>
                      </div>
                    );
                  }
                })}
              </span>
              <span>Rate</span>
              <div className="flex gap-4 items-center py-4">
                <Avatar
                  name={property?.user?.username}
                  size="lg"
                  classNames={{
                    base: "bg-[#222222]",
                  }}
                  className="text-white"
                />
                <div className="flex flex-col">
                  <span>Hosted by {property?.user?.username}</span>
                  <span>{moment(property?.user?.created_at).fromNow()}</span>
                </div>
              </div>
            </div>
            <div className="border-b-1 py-6">
              <h2 className=" text-2xl">What this place offers?</h2>
              <AmenitiesDetail property={property} />
            </div>
          </div>
          <div className="basis-1/3  relative justify-end ml-10 pt-6">
            <div className="sticky top-6">
              <div className="p-6 border-1 flex flex-col justify-center gap-2 rounded-lg shadow-lg">
                <div className="mb-6 ">
                  <span className="font-bold text-2xl ">
                    ${property.nightPrice}
                  </span>
                  <span> night</span>
                </div>
                <div className="">
                  <DatePiker
                    setCalendar={setCalendar}
                    calendar={calendar}
                    disableDates={property?.bookings?.orderedDates}
                  />
                  <SelectedGuests
                    maxGuest={property.numGuests}
                    quantityTypeGuest={quantityTypeGuest}
                    setQuantityTypeGuest={setQuantityTypeGuest}
                  />
                </div>
                <button
                  className="text-[16px] mx-auto px-7 py-[14px] text-white w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm  text-center "
                  onClick={handleClick}
                >
                  {isLoading ? (
                    <BeatLoader color="#36d7b7" size={11} />
                  ) : (
                    "Reserve"
                  )}
                </button>
                <div className="flex justify-between">
                  <div>
                    <span>
                      ${property.nightPrice} x{" "}
                      {differenceInDays(
                        calendar[0]?.endDate,
                        calendar[0]?.startDate
                      )}{" "}
                      night
                    </span>
                  </div>
                  <div>
                    <span>${roomPrices?.totalPrice}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <span>Airbnb service fee</span>
                  </div>
                  <div>
                    <span>${roomPrices.serviceFee}</span>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <div>
                    <span>Total before taxes</span>
                  </div>
                  <div>
                    <span>${roomPrices.beforeTaxes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
