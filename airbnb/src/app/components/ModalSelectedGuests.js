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
import ItemQuantity from "../become-a-host/components/ItemQuantity";
import { transformString } from "@/utils/queryParams";
import { useRouter } from "next/navigation";

export default function ModalSelectedGuests({
  maxGuest,
  quantityTypeGuest,
  setQuantityTypeGuest,
  totalGuest,
  setTotalGuest,
  searchParams,
  productId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const increment = (name, num = 1) => {
    setQuantityTypeGuest((prevState) => {
      const updateQueryPrams = transformString({
        ...searchParams,
        ...(name === "adults"
          ? { numberOfAdults: prevState[name] + num }
          : name === "children"
          ? { numberOfChildren: prevState[name] + num }
          : { numberOfInfants: prevState[name] + num }),
      });
      router.replace(`/book/stays/${productId}?${updateQueryPrams}`);

      return {
        ...prevState,
        [name]: prevState[name] + num,
      };
    });
    console.log(name);

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
    setQuantityTypeGuest((prevState) => {
      const updateQueryPrams = transformString({
        ...searchParams,
        ...(name === "adults"
          ? { numberOfAdults: prevState[name] - num }
          : name === "children"
          ? { numberOfChildren: prevState[name] - num }
          : { numberOfInfants: prevState[name] - num }),
      });
      router.replace(`/book/stays/${productId}?${updateQueryPrams}`);

      return {
        ...prevState,
        [name]: prevState[name] - num,
      };
    });

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
              <ModalHeader className="flex flex-col gap-1">Guest</ModalHeader>
              <ModalBody>
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
                      quantityTypeGuest.adults + quantityTypeGuest.children ===
                      maxGuest
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
                      quantityTypeGuest.adults + quantityTypeGuest.children ===
                      maxGuest
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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
