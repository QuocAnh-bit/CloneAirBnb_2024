import axiosClient from "./axiosClient";

const authApi = {
  postLogin: (body) => {
    const url = "/auth/login";
    return axiosClient.post(url, body);
  },
  registerApi: (body) => {
    const url = "/auth/register";
    return axiosClient.post(url, body);
  },
  profileApi: () => {
    const url = "/profile";
    return axiosClient.get(url);
  },
  refreshTokenApi: (body) => {
    const url = "/auth/refresh";
    return axiosClient.post(url, body);
  },
  authGoogleApi: () => {
    const url = "/auth/google";
    return axiosClient.get(url);
  },
  authFacebookApi: () => {
    const url = "/auth/facebook";
    return axiosClient.get(url);
  },
  authGoogleCallBack: (query) => {
    const url = "/auth/google/callback?" + query;
    return axiosClient.get(url);
  },
  logOut: (tokenLogout) => {
    const url = "/auth/logout";
    return axiosClient.post(url, tokenLogout);
  },
};
export default authApi;
