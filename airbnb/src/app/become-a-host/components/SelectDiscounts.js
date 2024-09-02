"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Checkbox,
  CardFooter,
} from "@nextui-org/react";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { params } from "@/app/api/auth/callback/page";

export default function SelectDiscounts({
  selectedDiscounts,
  setSelectedDiscounts,
  params,
  discounts,
  setDiscounts,
}) {
  const handleChecked = (index) => {
    console.log(index);
    const updatedDiscounts = [...selectedDiscounts];
    if (index === selectedDiscounts.length - 1) {
      if (
        selectedDiscounts[index].value < selectedDiscounts[index - 1].value &&
        selectedDiscounts[index].status &&
        selectedDiscounts[index - 1].status &&
        selectedDiscounts[index].value !== 0
      ) {
        updatedDiscounts[
          index
        ].err = `Your monthly discount must be higher than your weekly discount of ${
          selectedDiscounts[index - 1].value
        }%`;
        updatedDiscounts[index - 1].err = "";
      } else {
        updatedDiscounts[index].err = "";
        updatedDiscounts[index - 1].err = "";
      }
    } else if (index > 0) {
      if (
        selectedDiscounts[index]?.value > selectedDiscounts[index + 1].value &&
        selectedDiscounts[index].status &&
        selectedDiscounts[index + 1].status &&
        selectedDiscounts[index + 1].value !== 0
      ) {
        updatedDiscounts[
          index
        ].err = `Your weekly discount must be lower than your monthly discount of ${
          selectedDiscounts[index + 1].value
        }%`;
        updatedDiscounts[index + 1].err = "";
      } else {
        updatedDiscounts[index].err = "";
        updatedDiscounts[index + 1].err = "";
      }
    }
    setSelectedDiscounts(updatedDiscounts);
  };
  const handleChange = (e, index) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    if (value > 99) return;
    const updatedDiscounts = [...selectedDiscounts];
    updatedDiscounts[index].value = parseInt(value.replace("%", "")) || 0;
    setSelectedDiscounts(updatedDiscounts);
    handleChecked(index);

    addDiscounts(
      updatedDiscounts[index].name,
      updatedDiscounts[index].value,
      index
    );
  };

  const addDiscounts = (name, value, index) => {
    if (index !== null) {
      const updatedDiscounts = [...selectedDiscounts];
      updatedDiscounts[index].value = value;
      updatedDiscounts[index].status = true;
      setSelectedDiscounts(updatedDiscounts);
    }
  };

  const removeDiscounts = (index) => {
    const cloneDiscounts = [...selectedDiscounts];
    cloneDiscounts[index].status = false;
    setSelectedDiscounts(cloneDiscounts);
  };
  // const checkIncludes = (name) => {
  //   return selectedDiscounts.some(
  //     (discount) => discount.name === name && discount.status
  //   );
  // };
  return (
    <div className="flex flex-col gap-3">
      {selectedDiscounts?.map((item, index) => (
        <div key={index} className="cursor-pointer animate-fade-up">
          <div>
            <Card
              className={`p-4 shadow-none	border-2 border-[#DDDD] bg-[#efdfdf5c]  px-0
                `}
            >
              <CardBody>
                <div className="flex justify-between  gap-1 items-center">
                  {!item.edit ? (
                    <div className="">
                      <div
                        className={` min-w-[60px] text-center  rounded-lg font-bold text-lg  ${
                          item.status ? "" : "text-black/15"
                        }`}
                      >
                        {item.value}%
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      <input
                        type="text"
                        className="max-w-[60px] text-center py-2  border-black/20 border-1 rounded-lg font-bold text-lg disabled:text-black/15 "
                        value={`${item.value}%`}
                        name={item.name}
                        onChange={(e) => handleChange(e, index)}
                        disabled={!item.status}
                      />
                    </div>
                  )}

                  <div className="basis-3/4">
                    <div>{item.title}</div>
                    <div>{item.desc}</div>
                  </div>
                  <div>
                    <Checkbox
                      isSelected={item.status}
                      onClick={() =>
                        item.status
                          ? removeDiscounts(index)
                          : addDiscounts(item.name, item.value, index)
                      }
                      onChange={(e) => handleChecked(index)}
                    ></Checkbox>
                  </div>
                </div>
              </CardBody>

              {item.err && (
                <div className="flex px-3 gap-1 items-center text-[10px] text-[#c13515] font-bold pt-4">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>{item.err}</span>
                </div>
              )}
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
