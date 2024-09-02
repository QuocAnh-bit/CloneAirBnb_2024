import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function SkeletonView({ view }) {
  const array = new Array(5).fill(0);
  return (
    <>
      {view === "table"
        ? array.map((item, index) => (
            <>
              <tr className="bg-white  group/tr" key={item?.id}>
                <th
                  scope="row"
                  className=" p-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2 rounded-tl-lg  rounded-bl-lg group-hover/tr:bg-black/5 "
                >
                  <Skeleton
                    className="w-16 h-16 bg-black/25 flex items-center justify-center rounded-lg  bg-cover overflow-hidden bg-center bg-no-repeat"
                    style={
                      {
                        // backgroundImage: `url(${`${item?.propertyImages[0]?.imgName}`})`,
                      }
                    }
                  ></Skeleton>

                  <Skeleton
                    className={`h-3 ${
                      index % 2 ? "w-1/4" : "w-2/4"
                    } rounded-sm`}
                  />
                </th>
                <td className=" p-4 group-hover/tr:bg-black/5">
                  <Skeleton className="h-3 w-3/5 rounded-sm" />
                </td>
                <td className=" p-4 group-hover/tr:bg-black/5 rounded-tr-lg  rounded-br-lg">
                  <Skeleton className="h-3 w-3/5 rounded-sm bg-black" />
                </td>
              </tr>
            </>
          ))
        : array.map((item) => (
            <div key={item.id} className="pb-8">
              <Skeleton
                className="relative aspect-[5/5] bg-black/10 flex items-center justify-center rounded-lg  bg-cover overflow-hidden bg-center bg-no-repeat"
                style={
                  {
                    // backgroundImage: `url(${`${item?.propertyImages[0]?.imgName}`})`,
                  }
                }
              ></Skeleton>
              <div>
                <div className="text-balance font-bold my-2 ">
                  <Skeleton className="h-4 w-3/5 rounded-sm" />
                </div>
                <span>
                  <Skeleton className="h-3 w-2/5 rounded-sm" />
                </span>
              </div>
            </div>
          ))}
    </>
  );
}
