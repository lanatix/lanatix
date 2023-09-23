"use client";
import { Wallet, useWallet, useConnection } from "@solana/wallet-adapter-react";
import tickets from "../../assets/images/tickets.png";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { fetcher } from "@/utils/fetch";
import { PublicKey } from "@solana/web3.js";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function AuthMain({
  usernames,
}: {
  usernames: { username: string }[];
}) {
  const { toast } = useToast();
  const router = useRouter();

  const initialState = { name: "", description: "", username: "" };
  const [newUser, setNewUser] = useState(true);
  const [credentials, setCredentials] = useState(initialState);
  const [unavailableUsername, setUnavailable] = useState(true);

  const { publicKey, disconnect } = useWallet();
  const { connection } = useConnection();
  useEffect(() => {
    async function submitBrand() {
      if (newUser) {
        const submitted = await fetcher("/api/brand/create", "POST", {
          walletAddress: publicKey?.toString(),
          ...credentials,
        });
        console.log(submitted);
        toast({
          description: submitted.message,
        });
        router.push("/dashboard");
      } else {
        const loggedIn = await fetcher("/api/brand", "POST", {
          walletAddress: publicKey?.toString(),
        });
        if (!loggedIn.success) {
          await disconnect();
          toast({
            description: "Account doesn't exist. Please sign up",
            variant: "destructive",
          });
        } else {
          toast({
            description: loggedIn.message,
          });
          router.push("/dashboard");
        }
      }
    }
    if (
      publicKey &&
      ((credentials.username !== "" &&
        credentials.description !== "" &&
        credentials.name !== "") ||
        !newUser) &&
      !unavailableUsername
    ) {
      submitBrand();
    } else {
      disconnect();
      toast({
        description: "Please fill all the input fields",
        variant: "destructive",
      });
    }
  }, [publicKey]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "username") {
      if (
        usernames.filter((item) => item.username === e.target.value).length > 0
      ) {
        setUnavailable(true);
      } else {
        setUnavailable(false);
      }
    }
  };
  return (
    <div className="grid h-full relative md:grid-cols-2 items-center">
      <div className="md:px-20">
        <h4 className="font-semibold text-4xl">
          {newUser ? "Hello there👋" : "Welcome back👋"}
        </h4>
        {newUser && (
          <p className="font-light text-sm">Let's get you started right away</p>
        )}
        <form
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
              disabled={unavailableUsername}
              className=" rounded-full wallet-button"
            />
          </div>
        </form>
      </div>
      <div className="md:bg-black md:h-full rounded-[40px] bottom-0 -z-10 md:z-10 absolute md:relative">
        <Image
          src={tickets}
          alt="tickets"
          className="md:absolute md:h-[500px] md:scale-100 scale-[2] md:object-cover bottom-0"
        />
      </div>
    </div>
  );
}
