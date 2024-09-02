"use client";
import moment from "moment";

import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import { useSession } from "next-auth/react";
import PlusIcon from "../components/icons/PlusIcon";
import DuplicateIcon from "../components/icons/DuplicateIcon";
import useAxiosAuth from "@/hook/useAxiosAuth";
import HouseIcon from "../components/icons/HouseIcon";
import Link from "next/link";
import ModalListing from "./components/ModalListing";
// import { TbHomePlus } from "react-icons/tb";
// import { IoDuplicateOutline } from "react-icons/io5";

export default function BecomeAHost({ user }) {
  const axiosAuth = useAxiosAuth();
  const [properties, setProperties] = useState([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const getProperty = async () => {
      const res = await axiosAuth.get(
        `/users/${user?.id}/properties/incomplete`
      );
      if (res.status === 200) {
        console.log(res.data.data);
        setProperties(res.data.data);
      } else {
        console.log("Loi");
      }
    };
    getProperty();
  }, [axiosAuth, user?.id]);
  return (
    <div className="pt-8 mb-10 max-w-3xl mx-auto">
      <div className="animate-fade-up animate-once animate-duration-1000 ">
        <h1 className=" truncate mt-6 ">
          Welcome back
          <span className="block md:inline">
            {"  "}
            {user?.username}
          </span>
        </h1>
      </div>
      {properties?.length !== 0 && (
        <div className="animate-fade-up animate-once animate-duration-1000 flex flex-col gap-3">
          <h2 className="text-[22px] font-bold mt-4">Finish your listing</h2>
          {properties.map((item, index) => {
            const condition = showAll ? true : index < 3;
            if (condition) {
              return (
                <div key={item.id}>
                  <Link href={`/become-a-host/${item.id}`}>
                    <div className="p-6 border-1 flex gap-3 items-center rounded-lg hover:bg-black/5 hover:border-black">
                      <div
                        className="w-11 h-11 bg-black/10 flex items-center justify-center rounded-lg  bg-cover overflow-hidden bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${`${item?.propertyImages[0]?.imgName}`})`,
                        }}
                      >
                        {!item?.propertyImages[0] && (
                          <HouseIcon className={`size-7  `} />
                        )}
                      </div>
                      <div>
                        {item?.propertyName ? (
                          item?.propertyName
                        ) : (
                          <>
                            Your <span>{item?.category}</span> listing started{" "}
                            <span>
                              {moment(item.updatedAt).format("MMM D, YY")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
          })}

          <span
            className="underline font-bold cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            {!showAll ? "Show all" : "Show less"}
          </span>
        </div>
      )}
      <div className="animate-fade-up animate-once animate-duration-1000">
        <h2 className="text-[22px] font-bold mt-4">Start a new listing</h2>
        <div>
          <Item
            title={"Create a new listing"}
            Icon={PlusIcon}
            link={"/become-a-host/overview"}
          />

          <ModalListing properties={properties} moment={moment} />
        </div>
      </div>
    </div>
  );
}
