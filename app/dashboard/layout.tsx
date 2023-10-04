import DashboardMain from "@/components/dashboard";
import DeskNav from "@/components/desktop/nav";
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
    <div className="bg-neutral-900 relative w-screen overflow-hidden flex flex-col md:flex-row items-center md:justify-normal justify-center md:h-screen min-h-screen">
      <DeskNav />
      <div className="w-full">{children}</div>
      <MobileNav />
    </div>
  );
}
