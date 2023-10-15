"use client";
import { Event } from "@prisma/client";
import { ArrowBigRight, ArrowRight, MoveRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "../context";
import { fetcher } from "@/utils/fetch";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import Loader from "@/app/[id]/loading";

export default function EventCard({ event }: { event: Event }) {
  const date = new Date(event.date);
  const { setEvents } = useApp();
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const deleteEvent = async () => {
    try {
      setDeleting(true);
      const deleted = await fetcher(
        `/api/event?id=${event.id}&owner=${event.owner}`,
        "DELETE"
      );

      toast({
        description: deleted.message,
        variant: deleted.success ? "default" : "destructive",
      });
      if (deleted.success) {
        setEvents((prev: any[]) => prev.filter((item) => item.id !== event.id));
      }
      setDeleting(false);
    } catch (err) {
      setDeleting(false);
    }
  };
  return (
    <div className="h-56 w-full relative">
      <div className="absolute bg-[#1e1e1e]/50 rounded-xl top-0 bottom-o left-0 p-5 right-0 h-full w-full flex flex-col">
        {deleting ? (
          <Loader />
        ) : (
          <>
            <div className="h-full">
              <div className="flex ">
                <button onClick={deleteEvent}>
                  <Trash2 />
                </button>
                <div className="ml-auto bg-white rounded-md p-2.5 py-1 flex flex-col items-center text-black">
                  <h4 className="font-bold">{date.getDate()}</h4>
                  <h4 className="font-semibold text-xs uppercase">
                    {date.toDateString().split(" ")[1]}
                  </h4>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <h4 className="font-semibold text-2xl">{event.title}</h4>
                <h4 className="text-sm">
                  {event.registered.length} registered
                </h4>
              </div>
              <Link href={`/dashboard/events/${event.id}`} className="ml-auto">
                <MoveRight size={30} />
              </Link>
            </div>
          </>
        )}
      </div>
      <img
        className="h-full object-cover rounded-xl w-full"
        src={`https://res.cloudinary.com/dls6ysfrf/image/upload/${event.images[0]}`}
        alt={event.title}
      />
    </div>
  );
}
