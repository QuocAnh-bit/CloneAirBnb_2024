"use client";

import { SessionProvider } from "next-auth/react";
export default function ProvidersAuth({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
