"use client";
import React, { use, useState } from "react";
import Camera from "@/app/components/icons/Camera";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Progress,
} from "@nextui-org/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Trash from "@/app/components/icons/Trash";
import PlusIcon from "@/app/components/icons/PlusIcon";
import axios from "axios";
import MemoizedImage from "./MemoizedImage";
import Plus from "@/app/components/icons/Plus";
import { BeatLoader } from "react-spinners";

export default function ModalPhotos({
  params,
  setCheckDone,
  checkDone,
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
  images,
}) {
  const [totalProgress, setTotalProgress] = useState(null);
  const [numUpload, setNumUpload] = useState(null);
  const [progressImg, setProgressImg] = useState({});
  const [files, setFiles] = useState([]);

  const handleUpdateImgs = (e) => {
    const updateFiles = e.target.files;
    console.log(updateFiles);
    setFiles([...files, ...updateFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return;
    let countUpload = 0;
    if (!totalProgress) {
      setTotalProgress(0);
    }
    if (!numUpload) {
      setNumUpload(0);
    }
    const uploadPromises = [...files].map((file, index) => {
      const formData = new FormData();
      if (images.length) {
        file.order = images.length + index + 1;
        formData.append("order", file.order);
      }
      formData.append("photos", file);
      const config = {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgressImg((prev) => ({ ...prev, [file.name]: percent }));
        },
      };

      return axios
        .post(
          `http://localhost:8080/api/v1/properties/${params.id}/images`,
          formData,
          config
        )
        .then(() => {
          const percent = ((countUpload + 1) / files.length) * 100;
          setTotalProgress(percent);
          countUpload++;
          setNumUpload(countUpload);
        });
    });

    try {
      // Chờ tất cả các tải lên hoàn tất
      await Promise.all(uploadPromises).then(() =>
        setTimeout(() => {
          if (countUpload === files.length) {
            console.log("chay");
            setCheckDone(!checkDone);
            setFiles([]);
            setNumUpload(null);
            setTotalProgress(null);
            onClose();
          }
        }, 1500)
      );
      toast.success("Tất cả các tệp đã được tải lên thành công.");
      console.log(countUpload, files.length);
    } catch (error) {
      console.error("Lỗi khi tải lên tệp:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const deleteImg = (index) => {
    const cloneFiles = [...files];
    cloneFiles.splice(index, 1);
    setFiles(cloneFiles);
  };
  return (
    <>
      <div className="flex flex-col gap-2 ">
        <Button
          onPress={onOpen}
          className="max-w-fit bg-white border-black border-2"
        >
          Add photos
          <Camera className={"h-6 w-6"} />
        </Button>
        <Modal
          isOpen={isOpen}
          placement="bottom"
          size="5xl"
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
          hideCloseButton="true"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-between relative">
                  <div onClick={onClose} className="text-2xl px-3">
                    &times;
                  </div>
                  <div className="text-center">
                    Upload photos
                    <div className="text-[12px] leading-4	">
                      {numUpload !== null
                        ? `${numUpload} of ${files.length} items uploaded`
                        : files.length === 0
                        ? "No items"
                        : `${
                            files.length === 1
                              ? `${files.length} item selected`
                              : `${files.length} items selected`
                          }`}
                    </div>
                  </div>
                  <label htmlFor="dropzone-file">
                    <div>
                      <Plus className={`h-6 w-6`} />
                    </div>
                  </label>
                  <div className="absolute bottom-0 left-0 right-0">
                    {totalProgress != null && (
                      <Progress
                        size="sm"
                        radius="none"
                        aria-label="Loading..."
                        value={totalProgress}
                        classNames={{
                          indicator:
                            "bg-gradient-to-r from-stone-900 to-gray-900",
                        }}
                      />
                    )}
                  </div>
                </ModalHeader>
                <ModalBody className="h-fit">
                  <form
                    action=""
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    id="a-form"
                  >
                    {files.length === 0 ? (
                      <div className="flex justify-center items-center my-6 min-h-60 max-w-[640px] bg-white rounded-md border-dashed border-2 border-black md:mx-auto">
                        <div className="flex flex-col gap-5 items-center ">
                          <Image
                            src="/images/images.svg"
                            width={45}
                            height={45}
                            alt="imagesIcon"
                            rel="preload"
                            priority
                          />
                          <label
                            htmlFor="dropzone-file"
                            className="py-[12px] px-7 rounded-xl text-lg font-bold text-white bg-black"
                          >
                            Browse
                            <input
                              id="dropzone-file"
                              type="file"
                              multiple
                              className="hidden"
                              onChange={handleUpdateImgs}
                              accept="image/*"
                              name="photos"
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        <input
                          id="dropzone-file"
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleUpdateImgs}
                          accept="image/*"
                          name="photos"
                        />

                        {[...files]?.map((item, index) => (
                          <MemoizedImage
                            key={item.name}
                            item={item}
                            index={index}
                            deleteImg={deleteImg}
                            numUpload={numUpload}
                            progressImg={progressImg}
                          />
                        ))}
                      </div>
                    )}
                  </form>
                </ModalBody>
                <ModalFooter className="flex justify-between items-center border-t-1 px-4 py-6">
                  <Button
                    className="text-black font-bold "
                    variant="light"
                    onPress={onClose}
                  >
                    Done
                  </Button>
                  <Button
                    className="px-4 py-6 rounded-xl  font-bold text-white bg-black disabled:bg-black/40"
                    color="primary"
                    type="submit"
                    form="a-form"
                    disabled={numUpload !== null || files.length === 0}
                  >
                    {numUpload === null ? (
                      "Upload"
                    ) : (
                      <BeatLoader color="#36d7b7" size={11} />
                    )}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
}
