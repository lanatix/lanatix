"use client";
import { Search } from "lucide-react";
import { useApp } from "../context";

export default function Header({ title }: { title: string }) {
  const { brandDetails } = useApp();
  return (
    <div className="p-5 border-b flex items-center w-full md:border-0 border-b-neutral-700">
      <h4 className="font-medium text-2xl">{title}</h4>
      <div className="flex ml-auto gap-5 items-center rounded-full bg-neutral-900  p-2">
        <div className="relative flex items-center gap-2 p-2 bg-neutral-950 rounded-full">
          <Search size={18} className="" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-sm p-0 placeholder:font-semibold placeholder:text-neutral-400 rounded-full border-0"
          />
        </div>
        <div className="flex gap-2.5 font-semibold items-center">
          <h4>{brandDetails?.name}</h4>
          <div className="p-4 rounded-full bg-black"></div>
        </div>
      </div>
    </div>
  );
}
