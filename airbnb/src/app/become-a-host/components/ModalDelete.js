"use client";

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
import useAxiosAuth from "@/hook/useAxiosAuth";

export default function ModalDelete({
  id,
  disclosure,
  params,
  setCheckDone,
  checkDone,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure;
  const axiosAuth = useAxiosAuth();

  const handleDelete = async (id) => {
    try {
      const res = await axiosAuth.delete(
        `/properties/${params.id}/images/${id}`
      );
      if (res) {
        onClose();
        setCheckDone(!checkDone);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        classNames={{
          backdrop: "bg-black/20 ",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete this photo?
              </ModalHeader>
              <ModalBody>
                <p>Once you delete it, you can't get it back.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={() => handleDelete(id)}>
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
