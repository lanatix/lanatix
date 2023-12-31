"use client";

import { Event } from "@prisma/client";
import { useEffect, useState } from "react";
import { useApp } from "../context";
import { useToast } from "../ui/use-toast";
import moment from "moment";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Lock,
  QrCode,
} from "lucide-react";
import Register from "./register";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import QR from "./qr";
import { useWallet } from "@solana/wallet-adapter-react";

export default function EventMain({ eventData }: { eventData: Event | null }) {
  const [admin, setAdmin] = useState(false);
  const [register, setRegister] = useState(false);
  const [scan, setScan] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     if (user.email === eventData?.owner) {
  //       setAdmin(true);
  //       toast({
  //         description: "Admin Priviledges granted.",
  //       });
  //     }
  //   }
  // }, [user]);
  const date = new Date(eventData?.date!);
  const time = moment("23:33", "hh:mm").format("LT");
  const calendarFormat = `${date.getFullYear()}-0${date.getMonth()}-${date.getDate()}`;
  // console.log(calendarFormat);
  return (
    <div className="relative lg:w-screen lg:h-screen lg:overflow-hidden lg:grid grid-cols-5">
      {register && (
        <Register
          id={eventData?.id}
          eventData={eventData}
          setRegister={setRegister}
        />
      )}
      {scan && <QR setScan={setScan} />}
      {admin && (
        <button
          onClick={() => setScan(true)}
          className="fixed bottom-5 right-5 z-30 rounded-full grad p-5 text-black"
        >
          <QrCode />
        </button>
      )}
      <div className="relative h-full col-span-3">
        <div className="image-fade flex flex-col">
          <div className="h-full p-5">
            <div className="flex items-center">
              {/* <h4 className="font-bold text-3xl">lanatix</h4> */}
              <img src="/logo.svg" className="w-10" alt="" />
              <div className="flex ml-auto items-center gap-5">
                <button
                  onClick={() => setRegister(true)}
                  className=" rounded-full p-2.5 grad text-black"
                >
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="p-5">
            <h4 className="font-bold text-3xl lg:text-5xl">
              {eventData?.title}
            </h4>
            <div className="hidden lg:block">
              <h4 className="text-xl">{date.toDateString()}</h4>
              <h4 className="text-lg text-white/60">{time}</h4>
            </div>
            <div></div>
          </div>
        </div>
        <img
          src={`https://res.cloudinary.com/dls6ysfrf/image/upload/${eventData?.images[0]}`}
          className="object-cover h-screen w-full"
          alt=""
        />
      </div>
      <div className="p-5 py-0 pb-5 col-span-2 event-right lg:overflow-y-scroll">
        <div className="flex lg:hidden">
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
            />
          </div>
        </div>
        <div className="py-5">
          <div className="space-y-2.5">
            <h4 className="font-semibold text-xl">Event Images</h4>
            <Swiper
              className="relative !w-full"
              spaceBetween={30}
              navigation={{ nextEl: ".imageNext", prevEl: ".imagePrev" }}
              slidesPerView={1}
              autoplay
              modules={[Navigation, Autoplay]}
            >
              <button
                type="button"
                className="absolute text-black right-0 top-[40%] z-30 bg-white/40 imageNext disabled:hidden p-2 rounded-full"
              >
                <ChevronRight />
              </button>
              <button
                type="button"
                className="absolute text-black left-0 top-[40%] z-30 bg-white/40 imagePrev disabled:hidden p-2 rounded-full"
              >
                <ChevronLeft />
              </button>
              {eventData?.images.map((item, i) => (
                <SwiperSlide key={i}>
                  <img
                    className="h-56 object-cover items-center rounded-xl w-full"
                    src={`https://res.cloudinary.com/dls6ysfrf/image/upload/${item}`}
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <h4 className="text-xl font-semibold mt-2.5">About Event</h4>
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
