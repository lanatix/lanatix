// import Wallet from "@/components/wallet";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/context/theme-provider";
import { AppProvider } from "@/components/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lanatix",
  description: "Powered by Solana",
};

const Wallet = dynamic(() => import("../components/wallet"), { ssr: false });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <Wallet>
            <AppProvider>
              {children}
              <Toaster />
            </AppProvider>
          </Wallet>
        </ThemeProvider>
      </body>
    </html>
  );
}
