"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/react";
import NavigationSteps from "../../components/NavigationSteps";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useRouter } from "next/navigation";

export default function Description({ params }) {
  const router = useRouter();
  const [description, setDescription] = useState({
    description: "",
    length: 0,
  });
  const axiosAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const newDescription = e.target.value;
    setDescription({
      description: newDescription,
      length: newDescription.length,
    });
  };

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      const test = true;

      if (res.status === 200) {
        setIsLoading(false);
        const { desc } = res.data;
        const description = {
          description: desc,
          length: desc?.length || 0,
        };
        setDescription(description);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    getProperty();
  }, [axiosAuth, params.id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;

    if (!description.description.length || description.description.length > 500)
      return;

    setIsLoading(true);

    const res = await axiosAuth.put(`/properties/${params.id}`, {
      desc: description.description,
    });
    if (res.status === 200) {
      setIsLoading(false);
      if (action == "next") {
        router.push(`/become-a-host/${params.id}/finish-setup`);
      }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };
  return (
    <div className="mx-auto  max-w-3xl md:h-[412px]  md:flex md:flex-col md:justify-center">
      {" "}
      <div className="mb-6 animate-fade-up">
        <h1 className="mb-2">Create your description</h1>
        <span className="desc-become-a-host">
          Share what makes your place special.
        </span>
      </div>
      <div>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          className="w-full animate-fade-up"
          minRows={5}
          onChange={handleChange}
          value={description.description}
          description={`${description.length}/500`}
          errorMessage={
            description.length > 500 && (
              <div className="flex">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span> The maximum number of characters allowed is 32.</span>
              </div>
            )
          }
          classNames={{
            description: "text-[#6a6a6a] font-bold pt-4",
            errorMessage: "text-[#c13515] font-bold pt-4",
            input: "text-[18px] font-medium",
          }}
        />
        <form action="" onSubmit={handleSubmit} id="save">
          <NavigationSteps
            currentStep={2}
            totalStep={5}
            step={5}
            isLoading={isLoading}
            disabled={description.length > 500 || !description.length}
          />
        </form>
      </div>
    </div>
  );
}
