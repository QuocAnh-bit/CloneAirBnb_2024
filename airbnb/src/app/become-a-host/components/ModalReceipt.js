import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  useDisclosure,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import Image from "next/image";
import StarIcon from "@/app/components/icons/StarIcon";

export default function ModalReceipt({ receipt }) {
  const showDiscount = (percentDiscount, price) => {
    return Math.round(price - (percentDiscount / 100) * price);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const showFloorPlan = (data) => {
    const filteredObj = Object.keys(data).reduce((acc, key) => {
      if (key.startsWith("num")) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    const result = Object.keys(filteredObj).map(function (key) {
      return `${
        filteredObj[key]
      } ${filteredObj[key] > 1 ? key.replace("num", "") : key.replace("num", "").replace("s", "")}`;
    });
    return result;
  };

  return (
    <>
      <div onClick={onOpen}>
        <Card className="py-4">
          <CardBody className="overflow-visible py-2">
            <div
              className={`bg-cyan-700 w-full aspect-[5/4] bg-cover overflow-hidden bg-center bg-no-repeat	rounded-lg relative `}
              style={{
                backgroundImage: `url(${`${receipt.imgName}`})`,
              }}
            >
              <div className="absolute top-2 left-2 px-2 bg-white/85 rounded-md leading-7 font-bold">
                Show preview
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex justify-between items-start">
            <div>
              <div className="font-bold ">{receipt.propertyName}</div>
              <div>
                <span
                  className={` ${
                    receipt.discount ? "line-through" : "font-semibold"
                  }`}
                >
                  ${receipt.nightPrice}
                </span>{" "}
                {receipt?.discount && (
                  <b className="font-bold ">
                    ${showDiscount(receipt.discount, receipt.nightPrice)}
                  </b>
                )}{" "}
                night
              </div>
            </div>
            <div className="flex gap-1 ">
              <span>New</span>{" "}
              <StarIcon className={"h-5 w-5 text-yellow-400"} />
            </div>
          </CardFooter>
        </Card>
      </div>
      <Modal
        isOpen={isOpen}
        placement="bottom"
        size="5xl"
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        classNames={{
          closeButton: "left-3 top-3 w-[35px]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between border-b-1 gap-1">
                <div className="text-center font-semibold w-full">
                  Full preview
                </div>
              </ModalHeader>
              <ModalBody className="py-5 md:overflow-hidden">
                <div className="md:flex ">
                  <div
                    className={`md:w-[50%] md:max-h-[400px]  bg-cyan-700 w-full aspect-[5/4] bg-cover overflow-hidden bg-center bg-no-repeat	rounded-lg relative min-h-[300px]`}
                    style={{
                      backgroundImage: `url(${`${receipt.imgName}`})`,
                    }}
                  ></div>
                  <div className="md:ml-12 flex-grow md:max-h-[400px] md:px-4 overflow-y-scroll">
                    <div className="py-6 font-semibold border-b-1">
                      {receipt.propertyName}
                    </div>
                    <div className="py-6 font-semibold border-b-1 flex justify-between ">
                      <h2 className="basis-2/3">
                        {receipt?.placeType?.typeName === "shared"
                          ? "Shared room in a barn"
                          : receipt?.placeType?.typeName === "entire"
                          ? "Entire rental"
                          : "Place to stay in a rental"}{" "}
                        <span>unit hosted by {receipt?.user?.username}</span>{" "}
                      </h2>
                      <Avatar
                        name={receipt?.user?.username}
                        size="lg"
                        classNames={{
                          base: "bg-[#222222]",
                        }}
                        className="text-white"
                      />
                    </div>
                    <div className="flex items-center py-6 font-semibold border-b-1">
                      {showFloorPlan(receipt).map((item, index) => {
                        if (index != showFloorPlan(receipt).length - 1) {
                          return (
                            <div key={index}>
                              <span>{item}</span>
                              <span className="px-2">&#8226;</span>
                            </div>
                          );
                        } else {
                          return (
                            <div key={index}>
                              <span>{item}</span>
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className="py-6 font-semibold border-b-1">
                      {receipt.desc}
                    </div>
                    <div className="py-6 font-semibold border-b-1">
                      <h2>Amenities</h2>
                      <div>
                        {receipt.amenities.map((item, index) => {
                          if (index < 4) {
                            return (
                              <ul
                                className={` ${
                                  index == receipt.amenities.length - 1
                                    ? ""
                                    : "border-b-1 pb-4 my-4"
                                }`}
                                key={index}
                              >
                                <li className="flex w-full justify-between items-center">
                                  <div>{item.name}</div>
                                  <div>
                                    <Image
                                      src={`${item.imgName}`}
                                      alt={item.imgName}
                                      height={45}
                                      width={45}
                                    />
                                  </div>
                                </li>
                              </ul>
                            );
                          } else if (index == 4) {
                            return (
                              <ul className={`mt-4  `} key={index}>
                                <li className="flex w-full justify-between items-center">
                                  <div>
                                    +{receipt.amenities.length - 4} more
                                  </div>
                                </li>
                              </ul>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <div className="py-6 font-semibold border-b-1">
                      <h2>Location</h2>
                      <span>{receipt.location.apartment}, </span>
                      <span>{receipt.location.street}, </span>
                      <span>{receipt.location.city}, </span>
                      <span>{receipt.location.province}, </span>
                      <span>{receipt.location.country} </span>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
