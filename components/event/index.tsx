"use client";

import { Event } from "@prisma/client";
import { useEffect, useState } from "react";
import { useApp } from "../context";
import { useToast } from "../ui/use-toast";
import moment from "moment";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Register from "./register";

export default function EventMain({
  eventData,
  brandName,
}: {
  eventData: Event | null;
  brandName: { name: string; username: string } | null;
}) {
  const [admin, setAdmin] = useState(false);
  const { brandDetails } = useApp();
  const { toast } = useToast();
  const [register, setRegister] = useState(false);

  useEffect(() => {
    if (brandDetails) {
      if (brandDetails.username === eventData?.owner) {
        setAdmin(true);
        toast({
          description: "Admin Priviledges granted.",
        });
      }
    }
  }, [brandDetails]);
  const date = new Date(eventData?.date!);
  const time = moment("23:33", "hh:mm").format("LT");
  const calendarFormat = `${date.getFullYear()}-0${date.getMonth()}-${date.getDate()}`;
  // console.log(calendarFormat);
  return (
    <div className="relative">
      {register && (
        <Register
          brandName={brandName?.username}
          eventData={eventData}
          setRegister={setRegister}
        />
      )}
      <div className="relative">
        <div className="image-fade flex flex-col">
          <div className="h-full p-5">
            <div className="flex items-center">
              <h4 className="font-bold text-2xl">lanatix</h4>
              <button
                onClick={() => setRegister(true)}
                className="ml-auto rounded-full p-2.5 grad text-black"
              >
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
          <div className="p-5">
            <h4 className="font-bold text-neutral-400 text-sm">
              {brandName?.name}
            </h4>
            <h4 className="font-bold text-3xl">{eventData?.title}</h4>
          </div>
        </div>
        <img
          src={`https://res.cloudinary.com/dls6ysfrf/image/upload/${eventData?.images[0]}`}
          className=""
          alt=""
        />
      </div>
      <div className="p-5 py-0">
        <div className="flex ">
          <div>
            <h4>{date.toDateString()}</h4>
            <h4 className="text-xs text-white/60">{time}</h4>
          </div>
          <div>
            <AddToCalendarButton
              trigger="click"
              location={eventData?.location}
              startTime={eventData?.time}
              endTime={eventData?.time}
              startDate={calendarFormat}
              buttonStyle="round"
              name={eventData?.title}
              description={eventData?.description}
              options={["Google", "Apple"]}
              organizer={brandName?.name}
            />
          </div>
        </div>
        <div className="py-5">
          <h4 className="text-lg font-semibold">About Event</h4>
          <p className="font-light text-sm">{eventData?.description}</p>
        </div>
        <button
          onClick={() => setRegister(true)}
          className=" w-full py-2.5 px-5 grad text-black font-medium rounded-lg items-center gap-2 5"
        >
          Register for this Event
        </button>
      </div>
    </div>
  );
}
