"use client";

import { NextUIProvider } from "@nextui-org/react";

export function ProvidersUi({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
