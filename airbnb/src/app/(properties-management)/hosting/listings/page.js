"use client";
import React, { useCallback, useEffect, useState } from "react";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import moment from "moment";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import SearchIcon from "@/app/components/icons/SearchIcon";
import Plus from "@/app/components/icons/Plus";
import Squares2x2 from "@/app/components/icons/Squares2x2";
import QueueList from "@/app/components/icons/QueueList";
import Link from "next/link";
import _, { debounce } from "lodash";
import Paginate from "../../components/Paginate";
import NoMatch from "../../components/NoMatch";
import ViewTable from "../../components/ViewTable";
import ViewGrid from "../../components/ViewGrid";

export default function Page({ params }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const modelListings = useDisclosure();
  const axiosAuth = useAxiosAuth();
  const { data: session, status } = useSession();
  const [width, setWidth] = useState(window.innerWidth);
  const [typeDisplay, setTypeDisplay] = useState(
    localStorage.getItem("saveType") || "list"
  );
  const [activeSearch, setActiveSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [selectedId, setSelectedId] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [paginate, setPaginate] = useState({
    limit: 2,
    page: 1,
    total: 1,
  });
  const [filter, setFilter] = useState({
    q: "",
    limit: 5,
    page: 1,
  });

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getHighlightedText = (text) => {
    // Split on highlight term and include term into parts, ignore case
    console.log(text);
    const parts = text?.split(new RegExp(`(${searchTerm})`, "gi"));

    return (
      <span>
        {" "}
        {parts?.map((part, i) => (
          <span
            key={i}
            className={`${
              part?.toLowerCase() === searchTerm?.toLowerCase()
                ? "bg-yellow-400 "
                : ""
            }`}
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };
  useEffect(() => {
    const getProperty = async () => {
      const queryString = new URLSearchParams(filter).toString();
      setIsLoading(true);
      const res = await axiosAuth.get(
        `/users/${session.id}/properties?${queryString}`
      );
      if (res.status === 200) {
        const { data: properties, paginate } = res.data;
        setPaginate(paginate);
        setProperties(properties);

        setIsLoading(false);
      } else {
        console.log("Loi");
      }
    };
    if (session) {
      getProperty(session?.id);
    }
  }, [axiosAuth, session, session?.id, filter]);

  const search = useCallback(
    debounce((value) => {
      setFilter({ ...filter, q: value, page: 1 });
    }, 500),
    []
  );

  const handleClick = (id, item) => {
    if (item.status === "Verification required") {
      router.push(`/verify-listing/${id}`);
    } else {
      setSelectedId({
        id,
        imagesProperty: item?.propertyImages[0]?.imgName,
        location: item?.location?.city
          ? `${item?.location?.city}, ${item?.location?.province} `
          : "",
        propertyName: item?.propertyName ? (
          item?.propertyName
        ) : (
          <>
            Your <span>{item?.category}</span> listing started{" "}
            <span>{moment(item.updatedAt).format("MMM D, YY")}</span>
          </>
        ),
        status: item?.status,
      });
      modelListings.onOpen();
    }
  };

  const handleSearch = (e) => {
    setIsLoading(true);
    const value = e.target.value;
    setSearchTerm(value);
    search(value);
  };

  const saveType = (e) => {
    setTypeDisplay(typeDisplay === "list" ? "grid" : "list");
    localStorage.setItem("saveType", typeDisplay === "list" ? "grid" : "list");
  };

  return (
    <div className="pb-12">
      {console.log(width)}
      <div className=" py-6 md:py-12 flex items-center justify-between">
        <h1 className={`${activeSearch ? "hidden md:block" : ""} max-h-[44px]`}>
          Your listings
        </h1>
        <div
          className={`${
            activeSearch && "w-full"
          } flex gap-3  items-center    md:basis-2/3  md:justify-end`}
        >
          {!activeSearch && (
            <button
              className="p-[14px]  hover:bg-black/10 cursor-pointer bg-black/5 rounded-full flex items-center  "
              onClick={() => {
                setActiveSearch(true);
                if (width < 768) {
                  setTypeDisplay("list");
                }
              }}
            >
              <SearchIcon className={"h-4 w-4"} strokeWidth={2} />
            </button>
          )}
          {activeSearch && (
            <button className="   relative cursor-pointer  flex items-center  w-full md:max-h-[30px]">
              <div className="absolute left-3">
                <SearchIcon className={"h-4 w-4"} strokeWidth={2} />
              </div>
              <input
                className="w-full  border-none max-h-[44px] py-[14px] px-10 hover:bg-black/10  bg-black/5 rounded-full"
                autoFocus
                placeholder="Search listings by name or location"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div
                className="absolute right-3 px-2 bg-black/5 rounded-full text-xl hover:bg-black/15"
                onClick={() => {
                  if (searchTerm === "") return setActiveSearch(false);
                  setActiveSearch(false);
                  search("");
                  setSearchTerm("");
                }}
              >
                &times;
              </div>
            </button>
          )}
          <button
            className={`${
              activeSearch && "hidden md:block"
            } p-[14px] hover:bg-black/10 cursor-pointer bg-black/5 rounded-full disabled:text-black/35`}
            onClick={saveType}
            disabled={isLoading}
          >
            {typeDisplay == "grid" ? (
              <QueueList className={"h-4 w-4"} />
            ) : (
              <Squares2x2 className={"h-4 w-4"} />
            )}
          </button>
          <Link href={`/become-a-host`}>
            <button
              className={`${
                activeSearch && "hidden md:block"
              } p-[14px] hover:bg-black/10 cursor-pointer bg-black/5 rounded-full `}
            >
              <Plus className={"h-4 w-4"} />
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full">
        {typeDisplay === "grid" ? (
          <ViewGrid
            isLoading={isLoading}
            session={session}
            properties={properties}
            moment={moment}
            handleClick={handleClick}
            selectedId={selectedId}
            disclosure={modelListings}
            router={router}
            getHighlightedText={getHighlightedText}
          />
        ) : properties.length === 0 && activeSearch ? (
          <NoMatch />
        ) : (
          <ViewTable
            isLoading={isLoading}
            session={session}
            properties={properties}
            handleClick={handleClick}
            moment={moment}
            getHighlightedText={getHighlightedText}
            disclosure={modelListings}
            selectedId={selectedId}
            router={router}
          />
        )}
      </div>

      {paginate?.count > 0 && (
        <Paginate
          total={paginate.totalPages}
          page={paginate.page}
          count={paginate.count}
          filter={filter}
          setFilter={setFilter}
          setProperties={setProperties}
        />
      )}
    </div>
  );
}
