import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import authApi from "@/api/authApi";
import { signOut } from "next-auth/react";
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "text", placeholder: "password" },
      },
      async authorize(credentials, req) {
        const res = await authApi.postLogin(credentials);
        const user = res.data;
        console.log(user, "auth");
        return user ? user : null;
      },
    }),
    CredentialsProvider({
      id: "google",
      name: "Google",
      credentials: {
        query: { type: "text" },
      },
      async authorize(credentials, req) {
        // console.log(credentials);
        const res = await authApi.authGoogleCallBack(credentials.query);

        const user = res.data;
        return user ? user : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        return {
          ...token,
          ...user,
          accessTokenExpires: Date.now() + 60 * 1000,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token, user);
    },
    async session({ session, token, user }) {
      session = token;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

async function refreshAccessToken(token, user) {
  try {
    const refreshedTokens = await authApi.refreshTokenApi({
      refresh_token: token?.refreshToken,
    });

    if (refreshedTokens.status !== 200) {
      throw refreshedTokens;
    }
    console.log("đang  refresh_token:", Date.now());
    return {
      ...token,
      ...user,
      accessToken: refreshedTokens.data.accessToken,
      accessTokenExpires: Date.now() + 60 * 1000,
      refreshToken: refreshedTokens.data.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log("Lỗi ở đây");
    console.log(token, "token12");
    return null;
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
