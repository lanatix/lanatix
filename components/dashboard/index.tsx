"use client";

import { useState } from "react";
import { useApp } from "../context";
import { Plus } from "lucide-react";
import MainAdd from "./add";

export default function DashboardMain() {
  const [add, setAdd] = useState(false);
  const { brandDetails } = useApp();
  // console.log(brandDetails);
  return (
    <div className="min-h-screen  w-full">
      {add && <MainAdd />}
      {/* header */}
      <div className="p-5 border-b border-b-neutral-700">
        <h4 className="font-medium text-xl truncate">{brandDetails?.name}</h4>
        <div className="flex ml-auto gap-5"></div>
      </div>

      {/* body */}
      <div className="p-5 ">
        <div className="flex items-center">
          <h4 className="text-2xl font-medium">Upcoming Events</h4>
          <button
            onClick={() => setAdd(true)}
            className="ml-auto p-2.5 border rounded-lg"
          >
            <Plus />
          </button>
        </div>

        {/* events slider */}
        <div></div>
      </div>
    </div>
  );
}
