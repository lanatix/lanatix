"use client";

import { useApp } from "../context";

export default function DashboardMain() {
  const { brandDetails } = useApp();
  // console.log(brandDetails);
  return (
    <div className="min-h-screen  w-full">
      {/* header */}
      <div className="p-5 border-b border-b-neutral-700">
        <h4 className="font-medium text-xl truncate">{brandDetails?.name}</h4>
        <div className="flex ml-auto gap-5"></div>
      </div>

      {/* body */}
      <div className="p-5 ">
        <h4 className="text-2xl font-medium">Upcoming Events</h4>
      </div>
    </div>
  );
}
