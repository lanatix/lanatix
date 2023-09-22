"use client";
import { Wallet, useWallet, useConnection } from "@solana/wallet-adapter-react";
import tickets from "../../assets/images/tickets.png";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { fetcher } from "@/utils/fetch";
import { PublicKey } from "@solana/web3.js";

export default function AuthMain({
  usernames,
}: {
  usernames: { username: string }[];
}) {
  const initialState = { name: "", description: "", username: "" };
  const [newUser, setNewUser] = useState(true);
  const [credentials, setCredentials] = useState(initialState);
  const [unavailableUsername, setUnavailable] = useState(true);

  const { wallets, select, wallet, connect, publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    async function submitBrand() {
      const submitted = await fetcher("/api/brand/create", "POST", {
        walletAddress: publicKey?.toString(),
        ...credentials,
      });
      console.log(submitted);
    }
    if (
      publicKey &&
      credentials.username !== "" &&
      credentials.description !== "" &&
      credentials.name !== "" &&
      !unavailableUsername
    ) {
      submitBrand();
    }
  }, [publicKey]);

  // const handleWalletConnection = async (wallet: Wallet) => {
  //   if (
  //     credentials.username === "" ||
  //     credentials.description === "" ||
  //     credentials.name === ""
  //   ) {
  //     return;
  //   } else {
  //     select(wallet.adapter.name);
  //     await connect();
  //     const submitted = await fetcher("/api/brand/create", "POST", {
  //       walletAddress: publicKey?.toString(),
  //       ...credentials,
  //     });
  //     console.log(submitted);
  //   }
  // };
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
        <h4 className="font-semibold text-4xl">Welcome to Lanatix</h4>
        <p className="font-light text-sm">Let's get you started right away</p>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-10 w-full"
        >
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
          <div className="mt-10 flex flex-col items-center justify-center w-full space-y-5">
            {/* {wallets.map((wal, i) => (
              <button
                type="button"
                disabled={unavailableUsername}
                // onClick={() => handleWalletConnection(wal)}
                className="flex disabled:opacity-40 font-medium w-full justify-center items-center gap-2.5 bg-black rounded-2xl py-2.5 p-5"
              >
                <img src={wal.adapter.icon} className="w-7" alt="" />
                Continue with {wal.adapter.name}
              </button>
            ))} */}
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
