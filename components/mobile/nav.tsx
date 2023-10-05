"use client";

import {
  Bookmark,
  Calendar,
  Home,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden gap-5 m-auto bg-neutral-900 flex items-center fixed bottom-2.5 rounded-full p-5">
      <Link href={"/dashboard"}>
        <button className="space-y-1 flex flex-col items-center">
          <LayoutDashboard />
          {pathname === "/dashboard" && (
            <motion.div
              layoutId="tabLine"
              className="rounded-full w-5 h-1.5 grad"
            />
          )}
        </button>
      </Link>
      <Link href={"/dashboard/events"}>
        <button className="space-y-1 flex flex-col items-center">
          <Bookmark />
          {pathname === "/dashboard/events" && (
            <motion.div
              layoutId="tabLine"
              className="rounded-full w-5 h-1.5 grad"
            />
          )}
        </button>
      </Link>
      <Link href={"/dashboard/settings"}>
        <button className="space-y-1 flex flex-col items-center">
          <Settings />
          {pathname === "/dashboard/settings" && (
            <motion.div
              layoutId="tabLine"
              className="rounded-full w-5 h-1.5 grad"
            />
          )}
        </button>
      </Link>
    </nav>
  );
}
