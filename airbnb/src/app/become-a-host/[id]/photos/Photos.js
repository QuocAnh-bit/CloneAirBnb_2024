"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import ModalPhotos from "../../components/ModalPhotos";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useDisclosure } from "@nextui-org/react";
import MoreIcon from "@/app/components/icons/MoreIcon";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import NavigationSteps from "../../components/NavigationSteps";
import Plus from "@/app/components/icons/Plus";
import ModalDelete from "../../components/ModalDelete";
import { useRouter } from "next/navigation";

export default function Photos({ params }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const [images, setImages] = useState([]);
  const [checkDone, setCheckDone] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const modelDelete = useDisclosure();
  const [selectedId, setSelectedId] = useState(null);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    if (action === "next") {
      router.push(`/become-a-host/${params.id}/title`);
    }
  };

  useEffect(() => {
    const getProperty = async () => {
      setIsLoading(true);
      try {
        const res = await axiosAuth.get(`/properties/${params.id}`);
        if (res.status === 200) {
          const { propertyImages } = res.data;
          setIsLoading(false);
          if (propertyImages && !propertyImages[0]?.order) {
            propertyImages.forEach(function (element, index) {
              element.order = index + 1;
            });
          }

          setImages(propertyImages.sort((a, b) => a.order - b.order));
          console.log(propertyImages);
          // onClose();
        } else {
          setIsLoading(false);
          console.log("Loi");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProperty();
  }, [axiosAuth, params.id, checkDone]);

  useEffect(() => {
    const sortPhotos = async () => {
      const sortedPhotos = images.map((item) => ({
        id: item.id,
        order: item.order,
      }));
      console.log(sortedPhotos);
      const res = await axiosAuth.put(`/properties/${params.id}/images`, {
        sortedPhotos,
      });
      console.log(res);
    };

    sortPhotos();
  }, [axiosAuth, images, params.id]);

  const handleMove = useCallback(
    (index, direction) => {
      const move =
        direction === "forward"
          ? index + 1
          : direction === "backward"
          ? index - 1
          : 0;
      const cloneImages = [...images];
      if (move !== 0) {
        [cloneImages[index], cloneImages[move]] = [
          cloneImages[move],
          cloneImages[index],
        ];
        const tempOrder = cloneImages[index].order;
        cloneImages[index].order = cloneImages[move].order;
        cloneImages[move].order = tempOrder;
      } else {
        const element = cloneImages[index];
        cloneImages.splice(index, 1);
        cloneImages.unshift(element);
        cloneImages.forEach((element, index) => {
          element.order = index + 1;
        });
      }

      setImages(cloneImages);
    },
    [images]
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        {images.length != 0 ? (
          <div>
            <div className="flex justify-between items-center">
              <h2>Ta-da! How does this look?</h2>
              <div className="bg-[#f7f7f7] p-2 rounded-full " onClick={onOpen}>
                <Plus className={`h-6 w-6`} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <h1 className="mb-2">Add some photos of your barn</h1>
            <span className="desc-become-a-host">
              You'll need 5 photos to get started. You can add more or make
              changes later.
            </span>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:pb-5">
        {images.length !== 0 &&
          images?.map((item, index) => (
            <div
              key={item.id}
              className={`${
                index === 0 ? "col-span-2" : ""
              } bg-cyan-700 w-full aspect-[5/3] bg-cover overflow-hidden bg-center bg-no-repeat	rounded-lg relative `}
              style={{
                backgroundImage: `url(${`${item.imgName}`})`,
              }}
            >
              {index == 0 && (
                <div className="absolute top-3 left-3 px-2 bg-white/85 rounded-md leading-7 font-bold">
                  Cover Photo
                </div>
              )}
              <Dropdown shouldFlip={false}>
                <DropdownTrigger>
                  <button className="absolute top-3 right-3 p-1 bg-white/85 rounded-full">
                    <MoreIcon className={`h-6 w-6`} />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  onAction={(key) => {
                    if (key === "delete") {
                      modelDelete.onOpen();
                    }
                  }}
                  aria-label="Static Actions"
                >
                  <DropdownItem key="edit">Edit</DropdownItem>
                  {index != 0 && (
                    <DropdownItem
                      key="backward"
                      onClick={() => handleMove(index, "backward")}
                    >
                      Move backward
                    </DropdownItem>
                  )}
                  {index != images.length - 1 && (
                    <DropdownItem
                      onClick={() => handleMove(index, "forward")}
                      key="forward"
                    >
                      Move forward
                    </DropdownItem>
                  )}
                  {index != 0 && (
                    <DropdownItem
                      key="coverPhoto"
                      onClick={() => handleMove(index, "cover")}
                    >
                      Make cover photo
                    </DropdownItem>
                  )}
                  <DropdownItem
                    key="delete"
                    onClick={() => setSelectedId(item.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <ModalDelete
                key={item.id}
                disclosure={modelDelete}
                id={selectedId}
                params={params}
                setCheckDone={setCheckDone}
                checkDone={checkDone}
              />
            </div>
          ))}

        <div
          className={`flex justify-center items-center ${
            !images.length ? "my-6 md:col-span-2" : ""
          }  w-full aspect-[5/3]   max-w-[640px] md:max-w-none bg-slate-100 rounded-md border-dashed border-2 border-black`}
        >
          <ModalPhotos
            params={params}
            setCheckDone={setCheckDone}
            checkDone={checkDone}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            images={images}
          />
        </div>
      </div>
      <form action="" onSubmit={handleSubmit} id="save">
        <NavigationSteps
          currentStep={2}
          totalStep={5}
          step={3}
          isLoading={isLoading}
          disabled={images.length < 5}
        />
      </form>
    </div>
  );
}
