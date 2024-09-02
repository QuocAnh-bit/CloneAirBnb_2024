import axios from "axios";
import { getSession } from "next-auth/react";
import authApi from "./authApi";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// // Add a response interceptor
axiosClient.interceptors.response.use(
  async function (response) {
    // console.log("Sau khi response");
    // const session = await getSession();
    // console.log("session", session);
    const config = response.config;
    // // console.log("Đây là config", config);
    // if (
    //   config.url === "/auth/login" ||
    //   config.url === "/auth/register" ||
    //   config.url === "/auth/refresh"
    // ) {
    //   return response.data;
    // }
    if (config.url === "/auth/google" || config.url === "/auth/facebook") {
      console.log("Chuyển hướng");
      window.location.assign(response.data.result.urlRedirect);
      return response.data;
    }

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response.data);

    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error);
    // const { response, config } = error;
    // if (
    //   response &&
    //   response.data &&
    //   response.data.message === "Invalid Token"
    // ) {
    //   console.log("Hết hạn");
    //   const token = getLocalStorage("token");
    //   try {
    //     const refreshToken = await authApi.refreshTokenApi({
    //       refresh_token: token.refresh_token,
    //     });
    //     config.headers["Authorization"] = refreshToken.data.access_token;
    //     setLocalStorage("token", refreshToken.data);
    //     // return axiosClient(config);
    //     // Làm mới token thành công, có thể thực hiện lại request gốc hoặc xử lý tiếp theo ở đây
    //   } catch (refreshError) {
    //     // Xử lý lỗi khi làm mới token, có thể làm gì đó như đăng xuất người dùng
    //     console.error("Error refreshing token:", refreshError);
    //     // Ví dụ: Đăng xuất người dùng
    //     // logoutUser();
    //   }
    // } else {
    //   return error.response.data;
    // }
    return Promise.reject(error);
  }
);

export default axiosClient;
