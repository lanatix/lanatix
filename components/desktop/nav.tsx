"use client";
import { Bookmark, LayoutDashboard, LogOut, Shield, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "../context";
import { useRouter } from "next/navigation";

export default function DeskNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { web3auth, setUser, setConnected, setEvents } = useApp();
  const logout = async () => {
    await web3auth?.logout();
    if (!web3auth?.connected) {
      router.push("/auth");
      setUser(undefined);
      setEvents([]);
      setConnected(false);
    }
  };
  const links = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: (
        <LayoutDashboard
          className={pathname === "/dashboard" ? "nav-icon" : ""}
          size={18}
        />
      ),
    },
    {
      title: "Events",
      link: "/dashboard/events",
      icon: (
        <Bookmark
          className={pathname.includes("/dashboard/events") ? "nav-icon" : ""}
          size={18}
        />
      ),
    },
    {
      title: "Profile",
      link: "/dashboard/profile",
      icon: (
        <User
          className={pathname === "/dashboard/profile" ? "nav-icon" : ""}
          size={18}
        />
      ),
    },
  ];
  return (
    <div className="bg-neutral-900 hidden shrink-0 md:flex flex-col h-full">
      <div className="p-5 tracking-wider">
        <h4 className="text-2xl font-semibold">lanatix</h4>
      </div>
      <div className="flex mt-10 flex-col h-full">
        <div className="grow space-y-2.5 w-full">
          {links.map((item, i) => {
            return (
              <Link
                key={i}
                href={item.link}
                className="flex items-center p-5 py-1.5 relative text-sm gap-2.5"
              >
                {item.icon}
                <h4
                  className={` ${
                    item.link === "/dashboard/events"
                      ? pathname.includes(item.link) && "grad-text"
                      : pathname === item.link && "grad-text"
                  }`}
                >
                  {item.title}
                </h4>
                {item.link === "/dashboard/events"
                  ? pathname.includes(item.link) && (
                      <motion.div
                        layoutId="sideLine"
                        className="absolute right-0 h-7 w-1 side-bg rounded-full"
                      />
                    )
                  : pathname === item.link && (
                      <motion.div
                        layoutId="sideLine"
                        className="absolute right-0 h-7 w-1 side-bg rounded-full"
                      />
                    )}
              </Link>
            );
          })}
        </div>
        <div className="w-full p-5 shrink-0">
          <button
            onClick={logout}
            className="px-5 font-medium flex items-center gap-2.5 text-sm  text-black rounded p-2.5 w-full grad"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
