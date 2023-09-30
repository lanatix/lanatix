"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState, FormEvent, ChangeEvent } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetcher } from "@/utils/fetch";
import { X } from "lucide-react";
import { useToast } from "../ui/use-toast";

export default function Authorise({
  setAuthorise,
  setAdmin,
  owner,
  uniqueName,
}: {
  setAuthorise: any;
  owner: string;
  uniqueName: string;
  setAdmin: any;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const initialState = { fullName: "", passphrase: "" };
  const [credentials, setCredentials] = useState(initialState);
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const handleSubmit = async (e: FormEvent) => {
    if (!publicKey) {
      return toast({
        description: "Please connect to your wallet before proceeding",
        variant: "destructive",
      });
    }
    e.preventDefault();
    const authorise = await fetcher("/api/event/authorise", "POST", {
      ...credentials,
      walletAddress: publicKey?.toString(),
      owner,
      uniqueName,
    });
    if (authorise.success) {
      setAdmin(true);
    }
    toast({
      description: authorise.message,
    });
  };

  return (
    <div className="fixed backdrop-blur-xl bg-[#1e1e1e]/75 h-screen w-full bottom-0 top-0 left-0 right-0 z-50 flex flex-col items-center justify-center">
      <button
        className="right-5 top-5 absolute"
        onClick={() => setAuthorise(false)}
      >
        <X size={20} />
      </button>
      <div className="flex flex-col items-center p-10">
        <h4 className="font-bold text-3xl mb-10">Admin Authorization</h4>
        <form
          action=""
          className="gap-2.5 flex w-full flex-col "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={credentials.fullName}
            onChange={handleChange}
            name="fullName"
            className="w-full border-white/25 p-2.5 rounded-lg"
            placeholder="Enter your Full Name"
          />
          <input
            type="password"
            className="w-full border-white/25 p-2.5 rounded-lg"
            placeholder="Enter the Event Passphrase"
            value={credentials.passphrase}
            name="passphrase"
            onChange={handleChange}
          />
          <div className="flex items-center mt-10 flex-col gap-5">
            <WalletMultiButton />
            <button
              className="disabled:bg-neutral-500 grad w-full px-5 p-2.5 rounded-lg"
              disabled={credentials.passphrase === ""}
              type="submit"
            >
              Authorise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
