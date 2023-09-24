"use client";

import { fetcher } from "@/utils/fetch";
import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, useContext, useEffect, useState } from "react";

type AppState = {
  brandDetails: {} | undefined;
  loading: boolean;
  walletAddress: string | undefined;
};

export const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Please use the app provider in your app root");
  }

  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [brandDetails, setDetails] = useState<{} | undefined>();
  const [loading, setLoading] = useState(false);
  const { publicKey } = useWallet();

  const value = {
    brandDetails,
    setDetails,
    loading,
    setLoading,
    walletAddress: publicKey?.toString(),
  };

  useEffect(() => {
    async function fetchDetails() {
      if (publicKey) {
        setLoading(true);
        const fetched = await fetcher(
          `/api/brand?wallet=${publicKey.toString()}`,
          "GET"
        );

        setDetails(fetched);
      }
    }
    fetchDetails();
  }, [publicKey]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
