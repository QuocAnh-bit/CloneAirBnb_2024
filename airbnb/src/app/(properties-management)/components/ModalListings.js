import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Trash from "@/app/components/icons/Trash";

export default function ModalListings({
  idProperty,
  disclosure,
  params,
  router,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure;
  const [isDelete, setIsDelete] = useState(false);
  const handleClick = (id) => {
    if (isDelete) {
    } else {
      return router.push(`/become-a-host/${id}`);
    }
  };
  return (
    <>
      <Modal
        onBlur={() => setIsDelete(false)}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom"
        size="lg"
        classNames={{
          backdrop: "bg-black/20 ",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody className="p-8 h-fit">
                <div className="flex justify-center flex-col items-center gap-3 h-fit text-center">
                  <div>
                    <h1>
                      {isDelete ? (
                        "Remove this listing?"
                      ) : (
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-5 w-5 bg-green-500 block rounded-full`}
                          ></span>
                          {idProperty.status}
                        </div>
                      )}
                    </h1>
                    <span>
                      {`${
                        isDelete
                          ? " This is permanent—you’ll no longer be able to find or edit this listing "
                          : ""
                      }`}
                    </span>
                  </div>
                  <div
                    className="w-60 h-60 bg-black/10 flex items-center justify-center rounded-lg  bg-cover overflow-hidden bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${`${idProperty.imagesProperty}`})`,
                    }}
                  ></div>
                  <div className="font-bold">{idProperty?.propertyName}</div>
                  <div>{idProperty?.location}</div>
                </div>
                <div className="w-full">
                  <button
                    className={`w-full mb-2 text-lg font-bold text-white bg-black/80 py-[12px] px-7 rounded-xl hover:bg-black `}
                    onClick={() => handleClick(idProperty.id)}
                  >
                    {isDelete ? "Yes, remove" : "Edit listing"}
                  </button>

                  <button
                    onClick={() => setIsDelete(!isDelete)}
                    className={`w-full text-lg font-bold text-black  py-[12px] px-7 rounded-xl hover:bg-black/5 flex items-center justify-center gap-3`}
                  >
                    <Trash className={"w-6 h-6"} />
                    {isDelete ? "Cancel" : " Remove listing"}
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
