"use client";
import ChevronIcon from "@/app/components/icons/ChevronIcon";
import PenIcon from "@/app/components/icons/PenIcon";
import React, { useEffect, useState } from "react";
import NavigationSteps from "../../components/NavigationSteps";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useRouter } from "next/navigation";

export default function Price({ params }) {
  const [price, setPrice] = useState(null);
  const [edit, setEdit] = useState(false);

  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [visibility, setVisibility] = useState(false);
  const [detailFee, setDetailFee] = useState(false);

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      const res = await axiosAuth.get(`/properties/${params.id}`);
      if (res.status === 200) {
        setIsLoading(false);
        const { nightPrice } = res.data;
        setPrice(nightPrice || 10);
      } else {
        setIsLoading(false);
        console.log("Loi");
      }
    };
    getProperty();
  }, [axiosAuth, params.id]);

  const handleChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^\d]/g, "");

    if (value <= 10000) {
      setPrice(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price > 10000 || price < 10) return;
    setIsLoading(true);
    const action = e.nativeEvent.submitter.name;

    const res = await axiosAuth.put(`/properties/${params.id}`, {
      price,
    });
    if (res.status === 200) {
      setIsLoading(false);
      if (action == "next") {
        router.push(`/become-a-host/${params.id}/discount`);
      }
    } else {
      setIsLoading(false);
      console.log("Loi");
    }
  };

  const visibilityPrice = (price) => {
    if (price) {
      let formattedPrice = new Intl.NumberFormat("en-US", {}).format(price);
      return formattedPrice;
    }
    return 0;
  };
  const serviceFee = () => {
    const result = Math.round(price * 0.14);
    return result;
  };
  const hostFee = () => {
    const result = Math.round(price * 0.03);
    return result;
  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 animate-fade-up">
        <h1 className="mb-2">Now, set your price</h1>
        <span className="desc-become-a-host">You can change it anytime.</span>
      </div>
      <div className="flex flex-col  items-center justify-center min-h-[300px] gap-3 ">
        <div className="flex gap-1 text-7xl font-bold items-center  md:text-9xl animate-fade-up">
          {edit ? (
            <div className="w-full  flex gap-3">
              <input
                autoFocus
                type="text"
                className="focus:outline-none border-none w-full max-h-[72px] lg:max-h-none text-center p-0 text-7xl md:text-9xl leading-none "
                value={`$ ${visibilityPrice(price)}`}
                onBlur={() => setEdit(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setEdit(false);
                }}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div
              className="flex items-center gap-3 w-full"
              onClick={() => setEdit(!edit)}
            >
              <span>{`$ ${visibilityPrice(price)}`}</span>
              <span className="border-1 border-black/40 p-2 rounded-full ">
                <PenIcon className={"h-5 w-5"} />
              </span>
            </div>
          )}
        </div>
        {!detailFee && (
          <div
            className="font-bold flex items-center gap-2 text-[18px] animate-fade-up"
            onClick={() => setDetailFee(!detailFee)}
          >
            Guest price before taxes $
            {visibilityPrice(parseInt(serviceFee()) + parseInt(price))}
            <span>
              <ChevronIcon className={"w-4 h-4"} />
            </span>
          </div>
        )}
        {detailFee && (
          <>
            <div
              className={`w-full p-3 border-1 border-black rounded-lg transition-all ease-in-out		 ${
                !visibility ? "max-h-[135px]" : "max-h-[44px]"
              }`}
            >
              {!visibility && (
                <div className="text-[18px]">
                  <div className="flex justify-between w-full animate-fade-up ">
                    <div className="">Base price</div>
                    <div>${`${visibilityPrice(price)}`}</div>
                  </div>
                  <div className="flex justify-between w-full mt-3 animate-fade-up">
                    <div>Guest service fee</div>
                    <div>${`${visibilityPrice(serviceFee(price))}`}</div>
                  </div>
                  <hr className="my-3" />
                </div>
              )}
              <div className="text-[18px] ">
                <div
                  className="flex justify-between w-full "
                  onClick={() => setVisibility(false)}
                >
                  <div className="font-bold">Guest price before taxes</div>
                  <div>
                    ${visibilityPrice(parseInt(serviceFee()) + parseInt(price))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`w-full p-3 border-1 border-black rounded-lg transition-all ease-in-out		 ${
                visibility ? "max-h-[135px]" : "max-h-[44px]"
              }`}
            >
              {visibility && (
                <div className="text-[18px] ">
                  <div className="flex justify-between w-full animate-fade-down">
                    <div>Base price</div>
                    <div>${`${visibilityPrice(price)}`}</div>
                  </div>
                  <div className="flex justify-between w-full mt-3 animate-fade-down">
                    <div>Host service fee</div>
                    <div>-${`${visibilityPrice(hostFee(price))}`}</div>
                  </div>
                  <hr className="my-3" />
                </div>
              )}
              <div>
                <div
                  className="flex justify-between w-full text-[18px]"
                  onClick={() => setVisibility(true)}
                >
                  <div className="font-bold">You earn</div>
                  <div>
                    ${visibilityPrice(parseInt(price) - parseInt(hostFee()))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <form action="" onSubmit={handleSubmit} id="save">
        <NavigationSteps
          currentStep={3}
          totalStep={3}
          step={1}
          isLoading={isLoading}
          disabled={price > 10000 || price < 10}
        />
      </form>
    </div>
  );
}
