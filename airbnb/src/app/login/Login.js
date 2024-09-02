"use client";
import React, { useEffect, useState } from "react";
import authApi from "@/api/authApi";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useRouter } from "next/navigation";
// import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateAuth } from "@/utils/validate";
import Link from "next/link";
import e from "cors";

export default function Login() {
  const [statusForm, setStatusForm] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", email: "", password: "" },
    resolver: yupResolver(validateAuth(statusForm)),
  });

  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (statusForm) {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      }).then((callback) => {
        setIsLoading(false);
        if (callback?.ok) {
          window.location.reload();
        } else {
          toast.warning("Email hoặc mật khẩu không chính xác");
        }
      });
    } else {
      try {
        const register = await authApi.registerApi({ ...data });
        setIsLoading(false);
        if (register.status === 200) {
          setStatusForm(true);
          toast.success(register.message);
        } else {
          throw Error();
        }
      } catch (error) {
        const { response } = error;
        if (response && response?.data && response?.data?.error?.email) {
          toast.error(response.data.error.email + " " + data.email);
        } else {
          toast.error("Đã có lỗi xảy ra");
        }
        setIsLoading(false);
      }
    }
  };

  const loginGoogle = () => {
    authApi.authGoogleApi();
  };
  const loginFacebook = () => {
    authApi.authFacebookApi();
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(form);
  };
  return (
    <div className="pb-20">
      <header className="flex justify-center border-b-2 ">
        <h1 className="py-4 font-bold text-xl">Log in or sign up</h1>
      </header>
      <div className="p-8 ">
        <h3 className="text-xl font-bold mb-3">Welcome to Airbnb</h3>
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={`flex flex-col gap-2 ${statusForm ? "hidden" : ""}`}>
            <label htmlFor="" className="font-bold">
              Username
            </label>
            <input
              type="text"
              className="border-2 px-2 py-3 rounded-xl"
              placeholder="Username"
              // onChange={handleChange}
              {...register("username")}
            />
          </div>
          <p>{errors.username?.message}</p>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="" className="font-bold">
              Email
            </label>
            <input
              type="text"
              // name="email"
              // id="email"
              className="border-2 px-2 py-3 rounded-xl"
              placeholder="Email"
              // onChange={handleChange}
              {...register("email")}
            />
          </div>
          <p>{errors.email?.message}</p>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="" className="font-bold">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              // name="password"
              // id="password"
              className="border-2 px-2 py-3 rounded-xl"
              placeholder="Password"
              // onChange={handleChange}
            />
          </div>
          <p>{errors.password?.message}</p>

          <div className="w-full">
            <button
              type="submit"
              className="text-white w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {isLoading ? (
                <BeatLoader color="#36d7b7" size={11} />
              ) : statusForm ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <div>
          <Link
            href={"/login"}
            onClick={() => setStatusForm(!statusForm)}
            className="font-medium text-blue-600  hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div>
          {statusForm ? " Don't have an account?" : "Back to"}
          <Link
            href={"/login"}
            onClick={() => setStatusForm(!statusForm)}
            className="font-medium text-blue-600  hover:underline"
          >
            {statusForm ? " Sign up " : " Login"}
          </Link>
        </div>

        <div class=" flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-black after:mt-0.5 after:flex-1 after:border-t after:border-black">
          <p class="mx-4 mb-0 text-center font-semibold ">Or</p>
        </div>
        <div className="w-ful flex flex-col items-center gap-3 py-3">
          <button
            onClick={loginGoogle}
            className="w-full flex font-bold items-center justify-center  uppercase text-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <span>Google</span>
            <span className="basis-2/3">Continue with Google</span>
          </button>
          <button
            onClick={loginFacebook}
            className="w-full flex font-bold items-center justify-center  uppercase text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <span>FaceBook</span>
            <span className="basis-2/3">Continue with Facebook</span>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
