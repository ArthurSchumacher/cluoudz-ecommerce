"use client";

import { CartContextProvider } from "@/hooks/useCart";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
