"use client";
import { Wallet, useWallet, useConnection } from "@solana/wallet-adapter-react";
import tickets from "../../assets/images/tickets.png";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { fetcher } from "@/utils/fetch";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import AuthLoader from "./loader";
import Link from "next/link";
import { useApp } from "../context";

export default function AuthMain() {
  const { toast } = useToast();
  const router = useRouter();

  const { web3auth, user, setConnected, connected } = useApp();
  const [newUser, setNewUser] = useState(true);
  // const [credentials, setCredentials] = useState(initialState);
  // const [unavailableUsername, setUnavailable] = useState(false);
  const [loading, setLoading] = useState(false);
  // const handleChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //   if (e.target.name === "username") {
  //     if (
  //       usernames.filter((item) => item.username === e.target.value).length > 0
  //     ) {
  //       setUnavailable(true);
  //     } else {
  //       setUnavailable(false);
  //     }
  //   }
  // };
  const login = async () => {
    await web3auth?.connect();
    if (web3auth?.connected) {
      setConnected(true);
      router.push("/dashboard");
    }
  };
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [web3auth]);
  return (
    <div className="grid h-full relative md:grid-cols-2 items-center">
      {loading && <AuthLoader />}
      <div className="md:px-20">
        <h4 className="font-semibold text-center text-4xl">
          {newUser ? "Hello there👋" : "Welcome back👋"}
        </h4>
        <p className="text-center mt-5 font-light text-lg">
          Let's streamline your event management process.
        </p>
        <button
          onClick={login}
          className="font-semibold mt-10 py-2.5 w-full rounded-lg grad text-black "
        >
          Log in
        </button>
      </div>
      <div className="md:bg-black md:h-full rounded-[40px] bottom-0 -z-10 md:z-10 absolute md:relative">
        <div className="p-10 gap-0.5 md:inline-flex items-end hidden">
          <img src="./logo.svg" className="w-10" alt="" />
          <h4 className="font-bold text-3xl">anatix</h4>
        </div>
        <Image
          src={tickets}
          alt="tickets"
          className="md:absolute md:h-[600px] md:scale-100 scale-[2] md:object-cover bottom-0"
        />
      </div>
    </div>
  );
}
{
  /* <form
  action=""
  onSubmit={(e) => {
    e.preventDefault();
  }}
  className="mt-10 w-full"
>
  {newUser && (
    <div className="space-y-5 w-full">
      <div className="space-y-1">
        <h4 className="text-sm">Unique Username</h4>
        <input
          required
          type="text"
          onChange={handleChange}
          name="username"
          className="w-full focus:outline-none rounded-2xl p-3 bg-neutral-900"
        />
        {unavailableUsername && (
          <h4 className="text-red-500 text-sm">
            Username already taken
          </h4>
          )}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm">Admin Password</h4>
        <input
          required
          type="password"
          onChange={handleChange}
          name="password"
          className="w-full focus:outline-none rounded-2xl p-3 bg-neutral-900"
        />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm">Brand Name</h4>
        <input
          required
          type="text"
          onChange={handleChange}
          name="name"
          className="w-full focus:outline-none rounded-2xl p-3 bg-neutral-900"
          />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm">Brand Description</h4>
        <textarea
          required
          name="description"
          onChange={handleChange}
          rows={3}
          className="w-full focus:outline-none rounded-2xl p-3 bg-neutral-900"
          />
      </div>
    </div>
  )}
  <button
    type="button"
    className="font-light"
    onClick={() => {
      setUnavailable(false);
      setNewUser(!newUser);
    }}
    >
    {newUser
      ? "Already have an account? Sign In"
      : "Don't have an account? Sign up"}
  </button>
  <div className="mt-10 flex flex-col items-center justify-center w-full space-y-5">
    <WalletMultiButton
    disabled={
        (unavailableUsername ||
          credentials.username === "" ||
          credentials.description === "" ||
          credentials.name === "") &&
        newUser
      }
      className=" rounded-full wallet-button"
      />
    <div className="flex flex-col w-full items-center gap-2.5">
      <h4>or</h4>
      <Link href={"/auth/admin"} className="w-full">
        <button
        className="rounded-lg border w-full py-2.5 border-white/30"
        type="button"
        >
          Sign in as Admin
          </button>
          </Link>
    </div>
  </div>
</form> */
}

// useEffect(() => {
//   async function submitBrand(walletAddress: string) {
//     if (newUser) {
//       setLoading(true);
//       const submitted = await fetcher("/api/brand/create", "POST", {
//         walletAddress,
//         ...credentials,
//       }).catch(() => setLoading(false));
//       if (submitted.success) {
//         toast({
//           description: "Authenticated",
//         });
//       }
//       setLoading(false);
//       router.push("/dashboard");
//     } else {
//       setLoading(true);
//       const loggedIn = await fetcher("/api/brand", "POST", {
//         walletAddress,
//       });
//       if (!loggedIn.success) {
//         await disconnect();
//         setLoading(false);
//         toast({
//           description: "Account doesn't exist. Please sign up",
//           variant: "destructive",
//         });
//         setLoading(false);
//       } else {
//         toast({
//           description: loggedIn.message,
//         });
//         router.push("/dashboard");
//         setLoading(false);
//       }
//     }
//   }
//   if (publicKey || session) {
//     submitBrand(
//       (publicKey?.toString() as string) ||
//         (session?.user.walletAddress as string)
//     );
//   }
// }, [publicKey, session]);
