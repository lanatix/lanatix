"use client";

import { fetcher } from "@/utils/fetch";
import { Event } from "@prisma/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Web3Auth } from "@web3auth/modal";
import { UserInfo } from "@web3auth/base";

type AppState = {
  loading: boolean;
  events: Event[] | undefined;
  setEvents: any;
  web3auth: Web3Auth | null | undefined;
  user: Partial<UserInfo> | null | undefined;
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
  const [web3auth, setWeb3Auth] = useState<Web3Auth | null>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Partial<UserInfo>>();
  const [events, setEvents] = useState<Event[]>([]);

  const clientId =
    "BGnZrS0WLQwi_ornEpW9N_ZIJpvqd2aEw7mZCdTpLgtuwrViB3UleYh5jbH7JlUPjb3H3y9X0rqGZ3G8zQCmnAw";

  useEffect(() => {
    const fetchEvents = async (email: string) => {
      const event = await fetcher(`/api/event/all?owner=${email}`, "GET");
      setEvents(event.data);
    };
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: "sapphire_devnet",
          chainConfig: {
            chainNamespace: "solana",
            chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
            rpcTarget: "https://api.devnet.solana.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
          // Please remove this parameter if you're on the Base Plan
        });
        await web3authInstance.initModal();
        // const userDetails = await web3authInstance.getUserInfo();
        // setUser(userDetails);
        setWeb3Auth(web3authInstance);
        if (web3authInstance.connected) {
          const userDetails = await web3authInstance.getUserInfo();
          if (!userDetails) {
            setUser(userDetails);
          }
          await fetchEvents(userDetails.email!);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [web3auth?.connected]);

  const value = {
    loading,
    setLoading,
    events,
    setEvents,
    web3auth,
    user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// useEffect(() => {
//   async function fetchDetails() {
//     setLoading(true);
//     if (session) {
//       const fetched = await fetcher(
//         `/api/brand?wallet=${session?.user.walletAddress.toString()}`,
//         "GET"
//       );

//       if (fetched.success) {
//         setDetails(fetched.data);
//       }
//       const { data } = await fetcher(
//         `/api/event/all?owner=${fetched.data.username}`,
//         "GET"
//       );
//       setEvents(data);
//     } else if (publicKey) {
//       const fetched = await fetcher(
//         `/api/brand?wallet=${publicKey.toString()}`,
//         "GET"
//       );

//       if (fetched.success) {
//         setDetails(fetched.data);
//         const { data } = await fetcher(
//           `/api/event/all?owner=${fetched.data.username}`,
//           "GET"
//         );
//         setEvents(data);
//       } else {
//         await disconnect();
//       }
//     } else {
//       if (pathname.includes("/dashboard") && status === "unauthenticated") {
//         router.push("/auth");
//       }
//     }
//     setLoading(false);
//   }
//   fetchDetails();
// }, [publicKey, session]);
