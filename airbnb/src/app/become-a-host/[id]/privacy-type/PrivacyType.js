"use client";
import React, { useEffect, useState } from "react";
import SelectPlaceType from "../../components/SelectPlaceType";
import NavigationSteps from "../../components/NavigationSteps";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useRouter } from "next/navigation";

export default function PrivacyType({ params }) {
  const [selectedPlaceType, setSelectedPlaceType] = useState("");
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setIsLoading(false);
        console.log(res.data);
        setSelectedPlaceType(res?.data?.placeTypeName);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    getProperty();
  }, [axiosAuth, params.id]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    const { name, value } = e?.target[1];
    console.log({ [name]: value });
    const res = await axiosAuth.put(`/properties/${params.id}`, {
      [name]: value,
    });
    console.log(e.target);
    if (res.status === 200) {
      setIsLoading(false);
      if (action === "next") {
        router.push(`/become-a-host/${params.id}/location`);
      }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="animate-fade-up">
          What type of place will guests have?
        </h1>
      </div>
      <form onSubmit={handleSubmit} id="save">
        <SelectPlaceType
          selectedPlaceType={selectedPlaceType}
          setSelectedPlaceType={setSelectedPlaceType}
        />
        <NavigationSteps
          currentStep={1}
          totalStep={5}
          step={2}
          isLoading={isLoading}
          disabled={!selectedPlaceType ? true : false}
        />
      </form>
    </div>
  );
}
