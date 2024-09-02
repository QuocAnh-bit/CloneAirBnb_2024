import Trash from "@/app/components/icons/Trash";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
const MemoizedImage = ({ item, deleteImg, index, numUpload, progressImg }) => {
  const imageRef = useRef(null);
  // xu ly khi anh bi nhay
  // Khi component được render lần đầu, set background-image cho ảnh
  useEffect(() => {
    if (imageRef.current && imageRef.current.style.backgroundImage === "") {
      imageRef.current.style.backgroundImage = `url(${URL.createObjectURL(
        item
      )})`;
    }
  }, [item]);
  return (
    <div
      key={item.name}
      className={`aspect-square bg-cover overflow-hidden bg-center bg-no-repeat	rounded-lg relative `}
      ref={imageRef}
    >
      {numUpload !== null && (
        <div className="inset-0 absolute bg-black/70 z-20 text-white flex items-center justify-center">
          <div className="">
            {progressImg[item.name] !== undefined ? (
              <CircularProgress
                aria-label="Loading..."
                size="lg"
                value={progressImg[item.name]}
                color="warning"
                showValueLabel={true}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {numUpload == null && (
        <div
          onClick={() => deleteImg(index)}
          className=" bg-black rounded-full w-8 h-8 flex justify-center items-center absolute top-1 right-1"
        >
          <Trash className={`h-4 w-4 text-white text-center leading-10`} />{" "}
        </div>
      )}
    </div>
  );
};

export default MemoizedImage;
