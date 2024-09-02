"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/react";
import NavigationSteps from "../../components/NavigationSteps";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useRouter } from "next/navigation";

export default function Title({ params }) {
  const [title, setTitle] = useState({ title: "", length: 0 });
  const axiosAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const newTitle = e.target.value;
    setTitle({
      title: newTitle,
      length: newTitle?.length,
    });
  };

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setIsLoading(false);
        const { propertyName } = res.data;
        const title = {
          title: propertyName || "",
          length: propertyName?.length || 0,
        };
        setTitle(title);
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
      propertyName: title.title,
    });
    if (res.status === 200) {
      setIsLoading(false);
      if (action === "next") {
        router.push(`/become-a-host/${params.id}/description`);
      }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };
  return (
    <div className="mx-auto  max-w-3xl md:h-[412px]  md:flex md:flex-col md:justify-center ">
      {" "}
      <div className="mb-6 animate-fade-up">
        <h1 className="mb-2">Now, let's give your house a title</h1>
        <span className="desc-become-a-host">
          Short titles work best. Have fun with it—you can always change it
          later.
        </span>
      </div>
      <div>
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          className="w-full animate-fade-up"
          minRows={5}
          onChange={handleChange}
          value={title.title}
          description={`${title.length}/32`}
          errorMessage={
            title.length > 32 && (
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
            step={4}
            isLoading={isLoading}
            disabled={title.length > 32 || !title.length}
          />
        </form>
      </div>
    </div>
  );
}
