"use client";
import React, { useEffect, useState } from "react";
import ItemQuantity from "../../components/ItemQuantity";
import NavigationSteps from "../../components/NavigationSteps";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useRouter } from "next/navigation";
export default function FloorPlan({ params }) {
  const axiosAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [number, setNumber] = useState({
    guests: 4,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setIsLoading(false);
        const { numGuests, numBedrooms, numBeds, numBathrooms } = res.data;
        const quantity = {
          guests: numGuests ? numGuests : 4,
          bedrooms: numBedrooms ? numBedrooms : 1,
          beds: numBeds ? numBeds : 1,
          bathrooms: numBathrooms ? numBathrooms : 1,
        };
        setNumber(quantity);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    getProperty();
  }, [axiosAuth, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const action = e.nativeEvent.submitter.name;
    const res = await axiosAuth.put(`/properties/${params.id}`, {
      quantity: number,
    });
    if (res.status === 200) {
      setIsLoading(false);
      if (action === "next") {
        router.push(`/become-a-host/${params.id}/stand-out`);
      }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };
  const increment = (name, num = 1) => {
    setNumber((prevState) => ({
      ...prevState,
      [name]: prevState[name] + num,
    }));
  };

  const decrement = (name, num = 1) => {
    setNumber((prevState) => ({
      ...prevState,
      [name]: prevState[name] - num,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 animate-fade-up">
        <h1 className="md:text-[2rem] mb-2 ">
          Share some basics about your place
        </h1>

        <span className="desc-become-a-host">
          You'll add more details later, like bed types.
        </span>
      </div>

      <form
        action=""
        className="flex flex-col gap-[8px]"
        onSubmit={handleSubmit}
        id="save"
      >
        <ItemQuantity
          label="Guests"
          value={number.guests}
          minValue={1}
          maxValue={50}
          onIncrement={() => increment("guests")}
          onDecrement={() => decrement("guests")}
        />
        <hr />
        <ItemQuantity
          label="Bedrooms"
          value={number.bedrooms}
          minValue={1}
          maxValue={50}
          onIncrement={() => increment("bedrooms")}
          onDecrement={() => decrement("bedrooms")}
        />
        <hr />
        <ItemQuantity
          label="Beds"
          value={number.beds}
          minValue={1}
          maxValue={50}
          onIncrement={() => increment("beds")}
          onDecrement={() => decrement("beds")}
        />
        <hr />
        <ItemQuantity
          label="Bathrooms"
          value={number.bathrooms}
          minValue={1}
          maxValue={50}
          onIncrement={() => increment("bathrooms")}
          onDecrement={() => decrement("bathrooms")}
        />
        <NavigationSteps
          currentStep={1}
          totalStep={5}
          step={4}
          isLoading={isLoading}
          // disabled={!selectedCategory ? true : false}
        />
      </form>
    </div>
  );
}
