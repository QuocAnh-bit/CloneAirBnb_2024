"use client";

import authApi from "@/api/authApi";

import { signIn, useSession, signOut } from "next-auth/react";

// const handleLogout = async () => {
//   await authApi.logOut({ access_token: session.accessToken });
//   signOut({ callbackUrl: "/", redirect: true });
// };

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    try {
      const res = await authApi.refreshTokenApi({
        refresh_token: session?.refreshToken,
      });

      if (session) session.accessToken = res.data.accessToken;
      else signIn();
    } catch (error) {
      return error;
    }
  };
  return refreshToken;
};
