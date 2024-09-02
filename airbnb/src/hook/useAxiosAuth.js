"use client";

import { useRefreshToken } from "./useRefreshToken";
const { default: axiosClient } = require("@/api/axiosClient");
const { useSession } = require("next-auth/react");
const { useEffect } = require("react");

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const requestIntercept = axiosClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          console.log(session?.accessToken);
          config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          error?.response?.data?.message === "Invalid Token"
        ) {
          await refreshToken();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.accessToken}`;
          return axiosClient(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosClient.interceptors.request.eject(requestIntercept);
      axiosClient.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);
  return axiosClient;
};

export default useAxiosAuth;
