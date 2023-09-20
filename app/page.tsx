"use client";
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

export default function Home() {
  const { wallets, publicKey, select, disconnect } = useWallet();
  console.log(wallets);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {wallets[0].readyState}
      <WalletMultiButton />
    </main>
  );
}
