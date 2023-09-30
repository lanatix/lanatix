"use client";
import { Event } from "@prisma/client";
import Image from "next/image";

export default function Event({ event }: { event: Event }) {
  const date = new Date(event.date);
  return (
    <div className="h-56 w-full relative">
      <div className="absolute bg-[#1e1e1e]/50 rounded-xl top-0 bottom-o left-0 p-5 right-0 h-full w-full flex flex-col">
        <div className="h-full">
          <div className="flex items-center">
            <div className="ml-auto bg-white rounded-md p-2.5 py-1 flex flex-col items-center text-black">
              <h4 className="font-bold">{date.getDate()}</h4>
              <h4 className="font-semibold text-xs uppercase">
                {date.toDateString().split(" ")[1]}
              </h4>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-2xl">{event.title}</h4>
          <h4 className="text-sm">{event.registered.length} registered</h4>
        </div>
      </div>
      <img
        className="h-full object-cover rounded-xl w-full"
        src={`https://res.cloudinary.com/dls6ysfrf/image/upload/${event.images[0]}`}
        alt={event.title}
      />
    </div>
  );
}
