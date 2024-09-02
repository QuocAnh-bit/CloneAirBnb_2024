import React, { useEffect, useRef, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import ChevronIcon from "./icons/ChevronIcon";
import ItemQuantity from "../become-a-host/components/ItemQuantity";
export default function SelectedGuests({
  maxGuest,
  quantityTypeGuest,
  setQuantityTypeGuest,
}) {
  const [totalGuest, setTotalGuest] = useState({
    guest: 1,
    infants: 0,
  });

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const increment = (name, num = 1) => {
    setQuantityTypeGuest((prevState) => ({
      ...prevState,
      [name]: prevState[name] + num,
    }));

    setTotalGuest((prevState) => {
      if (name === "adults" || name === "children") {
        return {
          ...prevState,
          guest: totalGuest.guest + num,
        };
      } else {
        return {
          ...prevState,
          infants: totalGuest.infants + num,
        };
      }
    });
  };

  const decrement = (name, num = 1) => {
    setQuantityTypeGuest((prevState) => ({
      ...prevState,
      [name]: prevState[name] - num,
    }));
    setTotalGuest((prevState) => {
      if (name === "adults" || name === "children") {
        return {
          ...prevState,
          guest: totalGuest.guest - num,
        };
      } else {
        return {
          ...prevState,
          infants: totalGuest.infants - num,
        };
      }
    });
  };

  return (
    <div
      className="flex flex-col border-1 rounded-b-lg  cursor-pointer w-full px-4 pb-2 relative "
      ref={ref}
    >
      <div onClick={() => setIsOpen(!isOpen)}>
        <span className=" text-[10px] font-bold uppercase">Guest</span>
        <span className="min-w-32 items-center w-full text-left flex justify-between">
          <span>
            {totalGuest.infants
              ? `${totalGuest.guest} guest, ${totalGuest.infants} infants`
              : `${totalGuest.guest} guest`}
          </span>
          <span>
            <ChevronIcon
              className={`w-5 h-5 font-bold ${
                isOpen && "rotate-180"
              } transition-all`}
            />
          </span>
        </span>
      </div>
      <div
        className={`absolute bottom-0 translate-y-full bg-white left-0 right-0 border-1 ${
          !isOpen && "hidden"
        }`}
      >
        <div className="p-4 ">
          <ItemQuantity
            size="max-h-10"
            label="Adults"
            desc="Age 13+"
            minValue={1}
            maxValue={50}
            onIncrement={() => increment("adults")}
            onDecrement={() => decrement("adults")}
            animate={"animate-fade-down"}
            value={quantityTypeGuest.adults}
            isMax={
              quantityTypeGuest.adults + quantityTypeGuest.children === maxGuest
            }
          />
        </div>
        <div className="p-4 ">
          <ItemQuantity
            size="max-h-10"
            label="Children"
            desc="Ages 2–12"
            minValue={0}
            maxValue={50}
            onIncrement={() => increment("children")}
            onDecrement={() => decrement("children")}
            animate={"animate-fade-down"}
            value={quantityTypeGuest.children}
            isMax={
              quantityTypeGuest.adults + quantityTypeGuest.children === maxGuest
            }
          />
        </div>
        <div className="p-4 ">
          <ItemQuantity
            size="max-h-10"
            label="Infants"
            desc="Under 2"
            minValue={0}
            maxValue={5}
            onIncrement={() => increment("infants")}
            onDecrement={() => decrement("infants")}
            animate={"animate-fade-down"}
            value={quantityTypeGuest.infants}
          />
        </div>
      </div>
    </div>
  );
}
