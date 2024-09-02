"use client";
import React, { useEffect, useState } from "react";
import NavigationSteps from "../../components/NavigationSteps";
import SelectCategory from "../../components/SelectCategory";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useRouter } from "next/navigation";

export default function Structure({ params }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setIsLoading(false);
        console.log(res.data);
        setSelectedCategory(res?.data?.category);
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
    const res = await axiosAuth.put(`/properties/${params.id}`, {
      [name]: value,
    });
    if (res.status === 200) {
      setIsLoading(false);
      if (action === "next") {
        console.log(action);
        router.push(`/become-a-host/${params.id}/privacy-type`);
      }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };

  return (
    <div className="max-w-3xl mx-auto ">
      <div className="mb-6">
        <h1 className="animate-fade-up">
          Which of these best describes your place?
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="" id="save">
        <SelectCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <NavigationSteps
          currentStep={1}
          totalStep={5}
          step={1}
          isLoading={isLoading}
          disabled={!selectedCategory ? true : false}
        />
      </form>
    </div>
  );
}
