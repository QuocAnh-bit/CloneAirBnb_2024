import React from "react";
import ModalListings from "./ModalListings";
import SkeletonView from "./SkeletonView";

export default function ViewTable({
  isLoading,
  session,
  properties,
  handleClick,
  moment,
  getHighlightedText,
  disclosure,
  selectedId,
  router,
}) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className=" hidden md:table-header-group text-xs text-gray-700 uppercase ">
          <tr className="">
            <th scope="col" className="p-4 w-1/2 ">
              Listing
            </th>
            <th scope="col" className="p-4 w-1/4 ">
              Location
            </th>
            <th scope="col" className="p-4 w-1/4">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && session ? (
            properties.map((item) => (
              <>
                <tr
                  className="bg-white  group/tr cursor-pointer"
                  key={item?.id}
                  onClick={() => handleClick(item.id, item)}
                >
                  <th
                    scope="row"
                    className="py-4 md:p-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2 rounded-tl-lg  rounded-bl-lg group-hover/tr:bg-black/5 "
                  >
                    <div
                      className="min-w-16 w-16 h-16 bg-black/10 flex items-center justify-center rounded-lg  bg-cover overflow-hidden bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${`${item?.propertyImages[0]?.imgName}`})`,
                      }}
                    ></div>
                    <div className="text-balance ">
                      {item?.propertyName ? (
                        getHighlightedText(item?.propertyName)
                      ) : (
                        <>
                          Your <span>{item?.category}</span> listing started{" "}
                          <span>
                            {moment(item.updatedAt).format("MMM D, YY")}
                          </span>
                        </>
                      )}
                      <div className="flex items-center gap-2 md:hidden">
                        <span
                          className={`h-3 w-3 ${
                            item.status === "Verification required"
                              ? "bg-red-600"
                              : "bg-green-600"
                          } block rounded-full`}
                        ></span>
                        {item.status}
                      </div>
                    </div>
                  </th>
                  <td className="hidden md:table-cell p-4 group-hover/tr:bg-black/5">
                    <span> {getHighlightedText(item?.location?.city)}, </span>
                    <span>{getHighlightedText(item?.location?.province)}</span>
                  </td>
                  <td className="hidden md:table-cell p-4 group-hover/tr:bg-black/5 rounded-tr-lg  rounded-br-lg">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 ${
                          item.status === "Verification required"
                            ? "bg-red-600"
                            : "bg-green-600"
                        } block rounded-full`}
                      ></span>
                      {item.status}
                    </div>
                  </td>
                </tr>
                <ModalListings
                  key={item.id}
                  idProperty={selectedId}
                  disclosure={disclosure}
                  router={router}
                />
              </>
            ))
          ) : (
            <SkeletonView view={"table"} />
          )}
        </tbody>
      </table>
    </div>
  );
}
