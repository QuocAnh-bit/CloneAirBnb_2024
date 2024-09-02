import Link from "next/link";
import React from "react";
import ArrowIcon from "./icons/ArrowIcon";

export default function Item({
  Icon = null,
  link,
  title,
  desc = null,
  required = false,
}) {
  return (
    <Link href={link} className=" flex justify-between items-center w-full ">
      <div className="flex gap-5 items-center py-4">
        {Icon && <Icon className={"h-7 w-7"} strokeWidth={2} />}
        <div className="flex flex-col gap-2">
          <div className="font-normal">
            <div>{title}</div>
          </div>
          {desc && (
            <div>
              <p>{desc}</p>
            </div>
          )}
          {required && (
            <div>
              <p className="font-bold">required</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <ArrowIcon className={"h-6 w-6"} strokeWidth={2} />
      </div>
    </Link>
  );
}
