"use client";
import React, { useEffect, useState } from "react";
import SelectAmenities from "../../components/SelectAmenities";
import NavigationSteps from "../../components/NavigationSteps";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useRouter } from "next/navigation";
export default function Amenities({ params }) {
  const router = useRouter();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setIsLoading(false);
        console.log(res?.data);
        const { amenities } = res?.data;
        const dataAmenities = amenities.map((item) => item.name);
        setSelectedAmenities(dataAmenities);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    getProperty();
  }, [axiosAuth, params.id]);

  const handleSubmit = async (e) => {
    // setIsLoading(true);
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;

    console.log(selectedAmenities);
    const res = await axiosAuth.post(`/amenities`, {
      amenities: selectedAmenities,
      idProperty: params.id,
    });

    if (res.status === 200) {
      setIsLoading(false);
      if (action === "next") {
        router.push(`/become-a-host/${params.id}/photos`);
      }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 animate-fade-up">
        <h1 className="mb-2">Tell guests what your place has to offer</h1>
        <span className="desc-become-a-host">
          You can add more amenities after you publish your listing.
        </span>
      </div>
      <form onSubmit={handleSubmit} id="save">
        <SelectAmenities
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
        />
        <NavigationSteps
          currentStep={2}
          totalStep={5}
          step={2}
          isLoading={isLoading}
          disabled={selectedAmenities.length === 0 ? true : false}
        />
      </form>
    </div>
  );
}
