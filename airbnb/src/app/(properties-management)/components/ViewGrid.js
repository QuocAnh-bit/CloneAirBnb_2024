import Image from "next/image";
import React from "react";
import ModalListings from "./ModalListings";
import SkeletonView from "./SkeletonView";

export default function ViewGrid({
  isLoading,
  session,
  properties,
  moment,
  handleClick,
  selectedId,
  disclosure,
  router,
  getHighlightedText,
}) {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {!isLoading && session ? (
          properties.map((item, index) => (
            <div key={item.id} className="pb-8 cursor-pointer">
              <div
                className="relative aspect-[5/5] bg-black/10 flex items-center justify-center rounded-lg  bg-cover overflow-hidden bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${`${item?.propertyImages[0]?.imgName}`})`,
                }}
                onClick={() => handleClick(item.id, item)}
              >
                <div className="absolute left-2 top-3 bg-white flex items-center gap-2 py-2 px-3 font-medium rounded-full shadow-lg">
                  <span
                    className={`h-3 w-3 ${
                      item.status === "Verification required"
                        ? "bg-red-600"
                        : "bg-green-600"
                    } block rounded-full`}
                  ></span>
                  {item?.status}
                </div>
              </div>
              <div>
                <div className="text-balance font-bold mt-2 ">
                  {item?.propertyName ? (
                    getHighlightedText(item?.propertyName)
                  ) : (
                    <>
                      Your <span>{item?.category}</span> listing started{" "}
                      <span>{moment(item.updatedAt).format("MMM D, YY")}</span>
                    </>
                  )}
                </div>
                <span>{getHighlightedText(item?.location?.city)}, </span>
                <span>{getHighlightedText(item?.location?.province)}</span>
              </div>
              <ModalListings
                key={item.id}
                idProperty={selectedId}
                disclosure={disclosure}
                router={router}
              />
            </div>
          ))
        ) : (
          <SkeletonView view={"gird"} />
        )}
      </div>
    </div>
  );
}
