import React from "react";
import Image from "next/image";

export default function Logo({ full = false }) {
  return (
    <div className={`hidden md:block ${!full ? "w-[46px]" : "w-[118px]"}`}>
      {!full && (
        <Image
          src="/images/airbnb-1.svg"
          width={35}
          height={35}
          alt="Picture of the author"
        />
      )}
      {full && (
        <Image
          src="/images/logo.png"
          width={118}
          height={64}
          alt="Picture of the author"
        />
      )}
    </div>
  );
}
