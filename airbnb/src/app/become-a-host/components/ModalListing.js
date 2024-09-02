import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Item from "@/app/components/Item";
import DuplicateIcon from "@/app/components/icons/DuplicateIcon";
import HouseIcon from "@/app/components/icons/HouseIcon";
import Link from "next/link";

export default function ModalListing({ properties, moment }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>
        <Item
          title={"Create from an existing listing"}
          Icon={DuplicateIcon}
          link={"#"}
        />
      </div>
      <Modal
        size={"3xl"}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Choose a listing
              </ModalHeader>
              <ModalBody className="scrollbar-hide">
                <div className="animate-fade-up animate-once animate-duration-1000 flex flex-col gap-3 ">
                  {properties.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <Link href={`/become-a-host/${item.id}`}>
                          <div className="p-6 border-1 flex gap-3 items-center rounded-lg hover:bg-black/5 hover:border-black">
                            <div
                              className="w-11 h-11 bg-black/10 flex items-center justify-center rounded-lg  bg-cover overflow-hidden bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${`${item?.propertyImages[0]?.imgName}`})`,
                              }}
                            >
                              {!item?.propertyImages[0] && (
                                <HouseIcon className={`size-7  `} />
                              )}
                            </div>
                            <div>
                              {item?.propertyName ? (
                                item?.propertyName
                              ) : (
                                <>
                                  Your <span>{item?.category}</span> listing
                                  started{" "}
                                  <span>
                                    {moment(item.updatedAt).format("MMM D, YY")}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
