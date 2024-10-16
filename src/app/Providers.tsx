"use client";

import { WhoamiContextProvider } from "@/contexts/WhoamiContext";
import { queryClient } from "@/lib/queryClient";
import { client, trpc } from "@/trpc/client";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export const Providers: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <trpc.Provider client={client} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <WhoamiContextProvider>
        {children}
        <Toaster />
      </WhoamiContextProvider>
    </QueryClientProvider>
  </trpc.Provider>
);
