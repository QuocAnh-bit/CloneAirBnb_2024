import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import DatePiker from "./DatePiker";
import { DateRange, defaultInputRanges } from "react-date-range";
import { differenceInDays, format, isSameDay } from "date-fns";
import { useRouter } from "next/navigation";
import { transformString } from "@/utils/queryParams";
export default function ModalDatePiker({
  setCalendar,
  calendar,
  disableDates,
  searchParams,
  productId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [dateSelect, setDateSelect] = useState([
    {
      startDate: calendar[0]?.startDate,
      endDate: calendar[0]?.endDate,
      key: "selection",
    },
  ]);
  const handleChange = (item) => {
    setDateSelect([item.selection]);
  };
  const handleClick = () => {
    setCalendar(dateSelect);
    const updateQueryPrams = transformString({
      ...searchParams,
      checkin: format(dateSelect[0].startDate, "MM-dd-yyyy"),
      checkout: format(dateSelect[0].endDate, "MM-dd-yyyy"),
    });
    console.log(updateQueryPrams);

    router.replace(`/book/stays/${productId}?${updateQueryPrams}`);
  };
  return (
    <>
      <button onClick={onOpen} className="underline font-bold">
        Edit
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Dates</ModalHeader>
              <ModalBody>
                <div className="  my-2 bg-white z-10">
                  <div className="flex flex-col border-1 py-4 rounded-lg">
                    <div className="mx-3">
                      {!isSameDay(
                        dateSelect[0]?.startDate,
                        dateSelect[0]?.endDate
                      ) ? (
                        <h2 className="text-2xl">
                          {differenceInDays(
                            dateSelect[0]?.endDate,
                            dateSelect[0]?.startDate
                          )}
                          <span> night</span>
                        </h2>
                      ) : (
                        <h2 className="text-2xl">Select dates</h2>
                      )}
                      <div className="text-[#6A6a6a]">
                        {!isSameDay(
                          dateSelect[0]?.startDate,
                          dateSelect[0]?.endDate
                        ) ? (
                          <div>
                            <span>
                              {format(dateSelect[0]?.startDate, "MMM d, yyyy")}
                            </span>
                            <span className="px-2">-</span>
                            <span>
                              {format(dateSelect[0]?.endDate, "MMM d, yyyy")}
                            </span>
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
                      ranges={dateSelect}
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
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleClick}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
