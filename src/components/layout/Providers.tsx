"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.05)",
          },
        }}
      />
    </SessionProvider>
  );
}
