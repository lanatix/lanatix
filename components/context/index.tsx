"use client";

import { fetcher } from "@/utils/fetch";
import { Brand, Event } from "@prisma/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, useContext, useEffect, useState } from "react";

type AppState = {
  brandDetails: Brand | undefined;
  loading: boolean;
  walletAddress: string | undefined;
  events: Event[] | undefined;
  setEvents: any;
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
  const [brandDetails, setDetails] = useState<Brand | undefined>();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const { publicKey } = useWallet();

  const value = {
    brandDetails,
    setDetails,
    loading,
    setLoading,
    walletAddress: publicKey?.toString(),
    events,
    setEvents,
  };

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      if (publicKey) {
        const fetched = await fetcher(
          `/api/brand?wallet=${publicKey.toString()}`,
          "GET",
        );

        if (fetched.success) {
          setDetails(fetched.data);
        }
        const { data } = await fetcher(
          `/api/event/all?owner=${fetched.data.username}`,
          "GET",
        );
        console.log(data);
        setEvents(data);
      }
      setLoading(false);
    }
    fetchDetails();
  }, [publicKey]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
