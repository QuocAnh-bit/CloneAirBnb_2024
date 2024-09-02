"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

export function params(searchParams) {
  // Xử lý url lấy query
  const params = new URLSearchParams();
  for (const key in searchParams) {
    params.append(key, searchParams[key]);
  }
  const queryString = params.toString();

  return queryString;
}
const checkQuery = (query) => {
  return query.indexOf("googleapis") != -1 ? true : false;
};

export default function Page({ searchParams }) {
  const { data: session } = useSession();

  const router = useRouter();
  const dispatch = useDispatch();
  const query = params(searchParams);
  console.log(query);

  useEffect(() => {
    if (session != null) {
      redirect("/");
    }
  }, [session]);

  useEffect(() => {
    const getToken = async () => {
      const result = await signIn("google", {
        query,
        redirect: false,
      });

      window.location.reload();
    };
    getToken();
  }, [query]);

  return <div></div>;
}
