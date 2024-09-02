"use client";
import ChevronIcon from "@/app/components/icons/ChevronIcon";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { differenceInDays, format, isSameDay } from "date-fns";
import ModalDatePiker from "@/app/components/datePiker/ModalDatePiker";
import SelectedGuests from "@/app/components/SelectedGuests";
import ModalSelectedGuests from "@/app/components/ModalSelectedGuests";
import Image from "next/image";
import StripePayment from "./StripePayment";
import ErrorBooking from "./ErrorBooking";

export default function Payment({ params, user, searchParams }) {
  // const searchParams = useSearchParams();
  const axiosAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState([]);
  const [clientSecret, setClientSecret] = useState();

  const [quantityTypeGuest, setQuantityTypeGuest] = useState({
    adults: parseInt(searchParams.numberOfAdults, 10),
    children: parseInt(searchParams.numberOfChildren, 10),
    infants: parseInt(searchParams.numberOfInfants, 10),
  });

  const [roomPrices, setRoomPrices] = useState({
    totalPrice: 0,
    serviceFee: 0,
    beforeTaxes: 0,
  });

  const [totalGuest, setTotalGuest] = useState({
    guest:
      parseInt(searchParams.numberOfAdults, 10) +
      parseInt(searchParams.numberOfChildren, 10),
    infants: parseInt(searchParams.numberOfInfants, 10),
  });

  const [calendar, setCalendar] = useState([
    {
      startDate: searchParams.checkin,
      endDate: searchParams.checkout,
      key: "selection",
    },
  ]);

  useEffect(() => {
    const getProperty = async () => {
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setProperty(res.data);
        console.log(res.data);
      } else {
        console.log("Loi");
      }
    };
    getProperty();
  }, [axiosAuth, params.id]);

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

  // Payment Icon
  const paymentIcons = [
    {
      name: "Visa card",
      src: "https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg",
    },
    {
      name: "Mastercard",
      src: "https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg",
    },
    {
      name: "American Express Card",
      src: "https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg",
    },
    {
      name: "JCB Card",
      src: "https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_jcb.2cf0077e2220c67895e5f3058813e601.svg",
    },
    {
      name: "Discover Card ",
      src: "https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_discover.7f05c82f07d62a0f8a69d54dbcd7c8be.svg",
    },
  ];

  return (
    <div className="px-20 ">
      <div className="pb-8">
        <div className="max-w-[1120px] mx-auto w-full pt-16 pb-4 relative flex  items-center">
          <h1>Confirm and pay</h1>
          <span className="absolute left-0 -ml-12 p-3 hover:bg-black/10  rounded-full cursor-pointer">
            <ChevronIcon className={"w-5 h-5 rotate-90 "} />
          </span>
        </div>
      </div>
      <div className="max-w-[1120px] mx-auto w-full flex justify-between">
        <div className="basis-3/4 ">
          {!isLoading && !clientSecret && <ErrorBooking />}
          <div>
            <h2 className="mb-6">Your Trip</h2>
            <div className="flex justify-between items-start">
              <div className="pb-6">
                <div className="font-bold">Dates</div>
                <div className="text-[#6A6a6a]">
                  {!isSameDay(calendar[0]?.startDate, calendar[0]?.endDate) ? (
                    <div>
                      <span>{format(calendar[0]?.startDate, "MMM d")}</span>
                      <span className="px-2">-</span>
                      <span>{format(calendar[0]?.endDate, "MMM d")}</span>
                    </div>
                  ) : (
                    <div>Add your travel dates for exact pricing</div>
                  )}
                </div>
                {!isLoading && !clientSecret && (
                  <div className="flex items-center gap-1 ">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 "
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-[#C13515] font-medium">
                      This place is no longer available
                    </span>
                  </div>
                )}
              </div>
              <ModalDatePiker
                searchParams={searchParams}
                productId={searchParams.productId}
                setCalendar={setCalendar}
                calendar={calendar}
                disableDates={property?.bookings?.orderedDates}
              />
            </div>
            <div className="flex justify-between items-start">
              <div className="pb-6 ">
                <div className="font-bold">Guests</div>
                <span>
                  {totalGuest.infants
                    ? `${totalGuest.guest} guest, ${totalGuest.infants} infants`
                    : `${totalGuest.guest} guest`}
                </span>
              </div>
              <ModalSelectedGuests
                searchParams={searchParams}
                productId={searchParams.productId}
                maxGuest={property.numGuests}
                quantityTypeGuest={quantityTypeGuest}
                setQuantityTypeGuest={setQuantityTypeGuest}
                setTotalGuest={setTotalGuest}
                totalGuest={totalGuest}
              />
            </div>
          </div>
          <hr className="mb-6" />
          <div>
            {clientSecret && (
              <div className="flex justify-between items-center mb-6">
                <h2 className="">Pay with</h2>

                <div className="flex">
                  {paymentIcons.map(({ src, name }, index) => (
                    <Image
                      key={name}
                      src={src}
                      width={30}
                      height={5}
                      alt={name}
                    />
                  ))}

                  <Image
                    src="/images/momo_icon_no_bg_hz.svg"
                    width={30}
                    height={5}
                    alt="Picture of the author"
                  />
                </div>
              </div>
            )}
            {/* <button className="min-w-[150px] py-[14px] px-6  rounded-lg flex justify-center gap-2 items-center border-2 hover:bg-pink-100">
              <Image
                src="/images/momo_icon_bg.svg"
                width={30}
                height={5}
                alt="Picture of the author"
              />
              <div className="text-[#A50064] font-bold">MoMo Wallet</div>
            </button> */}
            {roomPrices?.beforeTaxes && (
              <StripePayment
                clientSecret={clientSecret}
                setClientSecret={setClientSecret}
                totalPrice={roomPrices?.beforeTaxes}
                idProperty={searchParams.productId}
                user={user}
                calendar={calendar}
                quantityTypeGuest={quantityTypeGuest}
                setIsLoading={setIsLoading}
              />
            )}
          </div>
        </div>
        <div className="basis-2/4 relative justify-end ml-20">
          <div className="sticky top-6">
            <div className="p-6 border-1 rounded-lg ">
              <div className="flex gap-3 w-full items-center pb-6">
                <div
                  className=" min-w-[104px] h-[104px] bg-black/10 flex items-center justify-center rounded-lg  bg-cover overflow-hidden bg-center bg-no-repeat  justify-self-center"
                  style={{
                    backgroundImage: `url(${searchParams.photo})`,
                  }}
                ></div>
                <div className="gap-2">
                  <div className="">
                    <b>Couple Bungalow - Mountain + Terraces View</b>
                  </div>
                  <div>Type Rooms</div>
                  <div>review</div>
                </div>
              </div>
              <hr />
              {!isLoading && !clientSecret ? (
                <ErrorBooking type="whiteError" />
              ) : (
                <>
                  <h2 className="py-6">Price details</h2>
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
                      <span>${roomPrices.totalPrice}</span>
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
                  <hr className="my-6" />
                  <div className="flex justify-between">
                    <div>
                      <b>Total (USD)</b>
                    </div>
                    <div>
                      <span>${roomPrices.beforeTaxes}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
