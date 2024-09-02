import React, { useState, useRef, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, defaultInputRanges } from "react-date-range";
import { addDays, differenceInDays, format, isSameDay } from "date-fns";
import "./datePiker.scss";

export default function DatePiker({ calendar, setCalendar, disableDates }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (item) => {
    setCalendar([item.selection]);
  };

  return (
    <div className="relative">
      <div
        className="flex border-1 rounded-t-lg relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col border-r-1 px-4 py-2">
          <span className="uppercase text-[10px] font-bold">Check-in</span>
          <span className="min-w-32 block w-full">
            {calendar[0]?.startDate
              ? format(calendar[0].startDate, "MM/dd/yyyy")
              : "Add date"}
          </span>
        </div>
        <div className="flex flex-col px-4 py-2">
          <span className="uppercase text-[10px] font-bold">Check-out</span>
          <span className="min-w-32 block w-full">
            {!isSameDay(calendar[0]?.startDate, calendar[0]?.endDate)
              ? format(calendar[0]?.endDate, "MM/dd/yyyy")
              : "Add date"}
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 my-2 bg-white z-10">
          <div className="flex flex-col border-1 py-4 rounded-lg">
            <div className="mx-3">
              {!isSameDay(calendar[0]?.startDate, calendar[0]?.endDate) ? (
                <h2 className="text-2xl">
                  {differenceInDays(
                    calendar[0]?.endDate,
                    calendar[0]?.startDate
                  )}
                  <span> night</span>
                </h2>
              ) : (
                <h2 className="text-2xl">Select dates</h2>
              )}
              <div className="text-[#6A6a6a]">
                {!isSameDay(calendar[0]?.startDate, calendar[0]?.endDate) ? (
                  <div>
                    <span>{format(calendar[0]?.startDate, "MMM d, yyyy")}</span>
                    <span className="px-2">-</span>
                    <span>{format(calendar[0]?.endDate, "MMM d, yyyy")}</span>
                  </div>
                ) : (
                  <div>Add your travel dates for exact pricing</div>
                )}
              </div>
            </div>
            <DateRange
              editableDateInputs={true}
              onChange={handleChange}
              moveRangeOnFirstSelection={false}
              ranges={calendar}
              months={2}
              direction="horizontal"
              minDate={new Date()}
              disabledDates={disableDates}
              inputRanges={[
                {
                  ...defaultInputRanges[0],
                  label: "Your new label",
                },
              ]}
            />
            <div className="mx-3 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-black text-white p-2 rounded-lg font-medium hover:bg-black/80 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
