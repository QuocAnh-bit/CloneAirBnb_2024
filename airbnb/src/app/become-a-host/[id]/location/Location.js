"use client";
import React, { useEffect, useState } from "react";
import SelectCountries from "../../components/SelectCountries";
import { Input } from "@nextui-org/react";
import NavigationSteps from "../../components/NavigationSteps";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import useAxiosAuth from "@/hook/useAxiosAuth";

export default function Location({ params }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const [selectedCountry, setSelectedCountry] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: "",
      street: "",
      city: "",
      province: "",
      apartment: "",
    },
  });

  const onSubmit = async (data, e) => {
    data.country = selectedCountry.label;
    const action = e.nativeEvent.submitter.name;

    setIsLoading(true);
    const res = await axiosAuth.post(`/locations/${params.id}`, {
      ...data,
    });
    if (res.status === 200) {
      setIsLoading(false);
      console.log(res);
      if (action === "next") {
        router.push(`/become-a-host/${params.id}/floor-plan`);
      }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="md:text-[2rem] mb-2">Confirm your address</h1>
        <span className="desc-become-a-host">
          Your address is only shared with guests after they’ve made a
          reservation.
        </span>
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)} id="save">
        <div className="flex flex-col gap-3">
          <SelectCountries
            register={register}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          <Input
            size={`sm`}
            type="text"
            label="Street address"
            variant="bordered"
            {...register("street")}
          />
          <Input
            size={`sm`}
            type="text"
            label="City / town / village"
            variant="bordered"
            {...register("city")}
          />
          <Input
            size={`sm`}
            type="text"
            label="Province / state / territory (if applicable) "
            variant="bordered"
            {...register("province")}
          />
          <Input
            size={`sm`}
            type="text"
            label="Apartment / floor / house (if any)"
            variant="bordered"
            {...register("apartment")}
          />
        </div>
        <NavigationSteps
          currentStep={1}
          totalStep={5}
          step={3}
          isLoading={isLoading}
          // disabled={!selectedCategory ? true : false}
        />
      </form>
    </div>
  );
}
