"use client";

import { useEffect, useState } from "react";
import { useApp } from "../../context";
import Header from "../header";
import { fetcher } from "@/utils/fetch";
import { Divide } from "lucide-react";
import EventCard from "../event";
import { Event } from "@prisma/client";

export default function ScheduleMain() {
  const { events } = useApp();
  return (
    <div className="min-h-screen bg-neutral-950 w-full">
      {/* header */}
      <Header title="Events" />

      {/* body */}
      <div className="flex px-5 flex-wrap gap-5">
        {events?.map((item, i) => (
          <div key={i} className="w-72">
            <EventCard event={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
