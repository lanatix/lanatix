"use client";
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Header from "@/components/landing/header";
import Body from "@/components/landing/body";

export default function Home() {
  // console.log(wallets);
  return (
    <main className="flex h-screen flex-col">
      <Header />
      <Body />
    </main>
  );
}
