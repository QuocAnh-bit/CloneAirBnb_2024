"use client";
import React, { useEffect, useState } from "react";
import SelectDiscounts from "../../components/SelectDiscounts";
import useAxiosAuth from "@/hook/useAxiosAuth";
import NavigationSteps from "../../components/NavigationSteps";
import { useRouter } from "next/navigation";

export default function Discount({ params }) {
  const router = useRouter();
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const axiosAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const getDiscounts = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/discounts/${params.id}`);

      if (res.status === 200) {
        setIsLoading(false);
        console.log(res.data);
        const data = res.data.map((item) => {
          return {
            ...item.discountType,
            value: item.value,
            discount_id: item.id,
            name: item.discountType.typeName,
            status: item.status,
          };
        });
        console.log(data);
        console.log(res.data);
        setDiscounts(data);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setIsLoading(false);
        const { discounts } = res?.data;
        console.log(res.data);
        const data = discounts.map((item) => {
          return {
            ...item.discountType,
            value: item.value,
            discount_id: item.id,
            name: item.discountType.typeName,
            status: item.status,
          };
        });
        setSelectedDiscounts(data);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    getDiscounts().then(() => getProperty());
  }, [axiosAuth, params.id]);

  const handleSubmit = async (e) => {
    // setIsLoading(true);
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;

    try {
      if (
        selectedDiscounts[1]?.value !== 0 &&
        selectedDiscounts[1]?.status &&
        selectedDiscounts[2]?.status &&
        selectedDiscounts[2]?.value !== 0 &&
        selectedDiscounts[1]?.value > selectedDiscounts[2]?.value &&
        selectedDiscounts[2]?.value < selectedDiscounts[1]?.value
      )
        return;
      console.log(selectedDiscounts);
    } catch (error) {
      console.log(error);
    }
    const res = await axiosAuth.post(`/discounts`, {
      discounts: selectedDiscounts,
      idProperty: params.id,
    });

    if (res.status === 200) {
      setIsLoading(false);
      if (action === "next") {
        router.push(`/become-a-host/${params.id}/receipt`);
      }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 animate-fade-up">
        <h1 className="mb-2">Add discounts</h1>
        <span className="desc-become-a-host">
          Help your place stand out to get booked faster and earn your first
          reviews.
        </span>
      </div>
      <SelectDiscounts
        selectedDiscounts={selectedDiscounts}
        setSelectedDiscounts={setSelectedDiscounts}
        params={params}
        discounts={discounts}
        setDiscounts={setDiscounts}
      />

      <form onSubmit={handleSubmit} id="save">
        <NavigationSteps
          currentStep={3}
          totalStep={3}
          step={2}
          isLoading={isLoading}
          disabled={
            selectedDiscounts[1]?.value !== 0 &&
            selectedDiscounts[1]?.status &&
            selectedDiscounts[2]?.status &&
            selectedDiscounts[2]?.value !== 0 &&
            selectedDiscounts[1]?.value > selectedDiscounts[2]?.value &&
            selectedDiscounts[2]?.value < selectedDiscounts[1]?.value
          }
        />
      </form>
    </div>
  );
}
