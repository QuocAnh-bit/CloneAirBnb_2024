"use client";
import React, { useCallback, useEffect, useState } from "react";
import authApi from "@/api/authApi";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { signOut, useSession } from "next-auth/react";
import Home from "./components/home/Home";

export default function Page() {
  return (
    <>
      <div className={` `}>
        <Home />
      </div>
    </>
  );
}
