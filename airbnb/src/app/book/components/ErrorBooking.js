import React from "react";

export default function ErrorBooking({ type = "redError" }) {
  return type === "redError" ? (
    <div className="p-4 border-1 rounded-lg flex gap-3 mb-6 items-center justify-center">
      <div className="bg-[#C13515] h-11 w-11 flex justify-center items-center rounded-full">
        <span className="text-2xl font-bold text-white">!</span>
      </div>
      <div>
        <h1 className="font-bold text-[20px]">
          This place is no longer available
        </h1>
        <p>
          Edit your dates to get updated pricing or search for another place to
          stay.
        </p>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col py-4">
      <div className=" h-11 w-11 flex justify-center items-center rounded-full border-2 ">
        <span className="text-2xl font-bold text-black">!</span>
      </div>
      <div className="text-center">
        It looks like this place is already booked for your dates. If you’re set
        on it, change your trip dates and try again.
      </div>
    </div>
  );
}
