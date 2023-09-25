import DashboardMain from "@/components/dashboard";
import MobileNav from "@/components/mobile/nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Lanatix",
  description: "Powered by Solana",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-900 relative flex flex-col items-center justify-center min-h-screen">
      {children}
      <MobileNav />
    </div>
  );
}
