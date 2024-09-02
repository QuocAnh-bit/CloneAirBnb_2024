"use client";
import React, { useEffect, useState } from "react";
import { categoryItems as libCategoryItems } from "@/app/lib/categoryItems"; // Đổi tên biến import để tránh xung đột
import { Card, CardHeader } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import useAxiosAuth from "@/hook/useAxiosAuth";

export default function SelectCategory({
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState(null);

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const getCategories = async () => {
      const res = await axiosAuth.get("/categories");
      if (res.status === 200) {
        setCategories(res.data);
      } else {
        console.log("Loi");
      }
    };
    getCategories();
  }, [axiosAuth]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 animate-fade-up">
        <input type="hidden" name="categoryName" value={selectedCategory} />
        {categories?.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <div onClick={() => setSelectedCategory(item.categoryName)}>
              <Card
                className={`p-4 shadow-none	border-2 border-[#DDDD] ${
                  selectedCategory === item.categoryName
                    ? "border-black border-2 bg-[#efdfdf5c]"
                    : ""
                } `}
              >
                <CardHeader className="p-0">
                  <Image
                    src={item.categoryImg}
                    alt={item.categoryName}
                    height={45}
                    width={45}
                    className={`${
                      selectedCategory === item.categoryName
                        ? "animate-jump"
                        : ""
                    }`}
                  />
                </CardHeader>
                <p className="font-bold">{item.categoryTitle}</p>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
