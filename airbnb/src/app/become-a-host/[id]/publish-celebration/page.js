import React from "react";
import Video from "../../components/Video";
import { BeatLoader } from "react-spinners";

export default function page() {
  return (
    <div className="  mx-auto z-50  w-[100vw] h-[100vh] overflow-hidden bg-black">
      <div className="flex gap-2 items-center w-full h-full">
        <div className=" relative w-[100vw] h-[100vh]">
          <Video src={`http://localhost:8080/images/video/a.mp4`} />
          <div className="absolute inset-0  bg-gradient-to-br from-black/20 to-orange-400/50 flex justify-start pl-5 items-center">
            <div>
              <h1 className="text-white mb-3 text-6xl   max-w-[400px]">
                <span>Congratulations,</span>
                <span className="block">QuocAnh</span>
              </h1>
              <p className="max-w-[400px] text-white">
                Welcome to post rentals - Condolences from Landlord to Landlord.
                Thank you for sharing your home and helping create wonderful
                experiences for our guests.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 left-0 border-t-2 border-pink-400 p-3 flex justify-end ">
            <button className="text-[16px]  px-7 py-[14px] text-white w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm  text-center md:max-w-[200px]">
              Let's get stated
            </button>
          </div>
        </div>
        {/* <div
          className=" relative   w-1/2 select-none bg-cyan-700  h-full bg-cover overflow-hidden bg-center bg-no-repeat	order-first"
          style={{
            backgroundImage: `url("https://www.falstaff-travel.com/wp-content/uploads/2024/05/Ritz-Paris-Suite-de-prestige-Vendome-Bureau_2-verkleinert.jpg")`,
          }}
        >
       
        </div> */}
      </div>
    </div>
  );
}
