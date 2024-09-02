"use client";
import React, { useEffect, useState } from "react";
import useAxiosAuth from "@/hook/useAxiosAuth";
import Item from "@/app/components/Item";
import { BeatLoader } from "react-spinners";
import Loading from "../../loading";

export default function VerifyListing({ params }) {
  const axiosAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState([]);

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setProperty(res.data);
        console.log(res.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    getProperty();
  }, [axiosAuth, params.id]);

  const handleLocation = () => {
    if (property && property?.location) {
      const { apartment, street, city, country } = property?.location;
      const locationParts = [
        apartment ? apartment : "",
        street ? street : "",
        city ? city : "",
        country ? country : "",
      ].filter((part) => part); // Remove any empty strings

      return locationParts.join(", ");
    }
  };
  const handlePublic = async () => {
    setIsLoading(true);

    const res = await axiosAuth.put(`/properties/${params.id}`, {
      public: true,
    });
    if (res.status === 200) {
      setIsLoading(false);
      // if (action === "next") {
      //   console.log(action);
      //   router.push(`/become-a-host/${params.id}/privacy-type`);
      // }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-8 mx-auto max-w-6xl flex  md:flex-row flex-col  gap-2 w-full justify-between pb-28 xl:pb-0">
          <div className="basis-1/2">
            <h1>Key details to take care of</h1>
            <div>
              <Item
                title={"Verify your identity"}
                desc={
                  "This is a simple way to help guests feel confident booking your place."
                }
                required={true}
                link={"aaa"}
              />
              <hr />
              <Item
                title={"Verify your identity"}
                desc={
                  "This is a simple way to help guests feel confident booking your place."
                }
                required={true}
                link={"aaa"}
              />
            </div>
          </div>
          <div className="basis-1/2 flex  flex-col items-center  md:items-end justify-end order-first md:order-last">
            <div
              className=" w-80 h-60 bg-black/10 flex items-center justify-center rounded-t-lg  bg-cover overflow-hidden bg-center bg-no-repeat  justify-self-center"
              style={{
                backgroundImage: `url(${property?.propertyImages?.[0]?.imgName})`,
              }}
            ></div>
            <div className="border-1 w-80 rounded-b-lg p-4 gap-2 flex flex-col border-black/15 border-t-0 shadow-sm">
              <b className="">{property?.propertyName}</b>
              <span className="">{handleLocation()}</span>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-1">
            <div className="max-w-6xl mx-auto flex justify-end py-4 px-4 md:px-20 xl:px-0">
              <button
                onClick={handlePublic}
                className={`w-full md:w-fit text-lg font-bold text-white bg-black py-[12px] px-7 rounded-xl disabled:bg-slate-200`}
              >
                {isLoading ? (
                  <BeatLoader color="#36d7b7" size={11} />
                ) : (
                  "Publish listing"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
