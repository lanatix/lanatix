"use client";

import { fetcher } from "@/utils/fetch";
import { Brand, Event } from "@prisma/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

type AppState = {
  brandDetails: Brand | undefined;
  loading: boolean;
  walletAddress: string | undefined;
  events: Event[] | undefined;
  setEvents: any;
  logOut: () => void;
};

export const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Please use the app provider in your app root");
  }

  return context;
};

export { SessionProvider } from "next-auth/react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [brandDetails, setDetails] = useState<Brand | undefined>();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const { publicKey, disconnect } = useWallet();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const logOut = async () => {
    if (session) {
      await signOut({ callbackUrl: "https://localhost:3000/auth/admin" });
    }

    if (publicKey) {
      await disconnect();
      router.push("/auth");
    }

    return;
  };
  const value = {
    brandDetails,
    setDetails,
    loading,
    setLoading,
    walletAddress: publicKey?.toString(),
    events,
    setEvents,
    logOut,
  };

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      if (session) {
        const fetched = await fetcher(
          `/api/brand?wallet=${session?.user.walletAddress.toString()}`,
          "GET"
        );

        if (fetched.success) {
          setDetails(fetched.data);
        }
        const { data } = await fetcher(
          `/api/event/all?owner=${fetched.data.username}`,
          "GET"
        );
        setEvents(data);
      } else if (publicKey) {
        const fetched = await fetcher(
          `/api/brand?wallet=${publicKey.toString()}`,
          "GET"
        );

        if (fetched.success) {
          setDetails(fetched.data);
          const { data } = await fetcher(
            `/api/event/all?owner=${fetched.data.username}`,
            "GET"
          );
          setEvents(data);
        } else {
          await disconnect();
        }
      } else {
        if (pathname.includes("/dashboard") && status === "unauthenticated") {
          router.push("/auth");
        }
      }
      setLoading(false);
    }
    fetchDetails();
  }, [publicKey, session]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
