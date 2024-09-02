"use client";
import React, { useEffect, useState } from "react";
import useAxiosAuth from "@/hook/useAxiosAuth";
import ModalReceipt from "../../components/ModalReceipt";
import NavigationSteps from "../../components/NavigationSteps";
import { useRouter } from "next/navigation";

export default function Receipt({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const [receipt, setReceipt] = useState({ imgName: "" });
  const router = useRouter();

  const handleSubmit = (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      console.log("OK");
      router.push(`/become-a-host/${params.id}/publish-celebration`);
    } catch (error) {
      console.log(error);
    }
  };

  const whatNext = [
    {
      title: "Confirm a few details and publish",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-9 h-9"
        >
          <path
            fillRule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      desc: "We’ll let you know if you need to verify your identity or register with the local government.",
    },
    {
      title: "Set up your calendar",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-9 h-9"
        >
          <path
            fillRule="evenodd"
            d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      desc: "Choose which dates your listing is available. It will be visible 24 hours after you publish.",
    },
    {
      title: "Adjust your settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-9 h-9"
        >
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
        </svg>
      ),
      desc: "Set house rules, select a cancellation policy, choose how guests book, and more.",
    },
  ];

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      try {
        const res = await axiosAuth.get(`/properties/${params.id}`);
        if (res.status === 200) {
          const {
            propertyImages,
            desc,
            propertyName,
            nightPrice,
            discounts,
            placeType,
            user,
            numBedrooms,
            numBeds,
            numGuests,
            amenities,
            location,
          } = res.data;
          console.log(res.data);
          setIsLoading(false);
          if (propertyImages && discounts) {
            const findCoverPhoto = propertyImages.findIndex(
              (item) => item.order === 1
            );
            const findDiscount = discounts.findIndex(
              (item) => item.discountType.typeName === "first 3 bookings"
            );
            console.log(findDiscount);
            setReceipt((prevState) => ({
              ...prevState,
              imgName: propertyImages[0].imgName,
              desc,
              propertyName,
              nightPrice,
              discount: discounts[findDiscount].status
                ? discounts[findDiscount].value
                : "",
              placeType,
              user,
              numBedrooms,
              numBeds,
              numGuests,
              amenities,
              location,
            }));
          }

          // onClose();
        } else {
          setIsLoading(false);
          console.log("Loi");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProperty();
  }, [axiosAuth, params.id]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 animate-fade-up">
        <h1 className="mb-2">Review your listing</h1>
        <span className="desc-become-a-host">
          Here's what we'll show to guests. Make sure everything looks good.
        </span>
      </div>
      <div className="md:grid md:grid-cols-2 py-2 animate-fade-up">
        <ModalReceipt receipt={receipt} />
        <div className="md:ml-12 ">
          <h2 className="mt-5 mb-8 md:text-[1.375rem]">What's next?</h2>
          <div className="flex flex-col gap-5">
            {whatNext.map((item, index) => (
              <div key={index}>
                <div className="flex gap-5">
                  <div>{item.icon}</div>
                  <div>
                    <h3 className="text-black font-[500] mb-1">{item.title}</h3>
                    <span className="text-[#6a6a6a]">{item.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <NavigationSteps
          currentStep={3}
          totalStep={3}
          step={3}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
