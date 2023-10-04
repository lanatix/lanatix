"use client";

import { useState } from "react";
import { useApp } from "../context";
import { Plus, Search } from "lucide-react";
import MainAdd from "./add";
import Loader from "../../app/dashboard/loading";
import { Swiper, SwiperSlide } from "swiper/react";
import EventSlide from "./event";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Header from "./header";

export default function DashboardMain() {
  const [add, setAdd] = useState(false);
  const { brandDetails, loading, events } = useApp();
  // console.log(brandDetails);
  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen relative md:bg-neutral-950 w-full">
      {add && <MainAdd setClose={setAdd} />}
      {/* header */}
      <Header title="Dashboard" />

      {/* body */}

      <div className="px-5 space-y-5">
        {/* welcome */}
        <div className="bg-neutral-900 p-5 rounded-2xl w-fit">
          <h4 className="font-bold text-2xl">Welcome to lanatix👋</h4>
          <p className="font-light text-sm mt-2">
            Your decentralized event management platform.
          </p>
          <button className="mt-5 px-4 p-2 rounded-full grad font-semibold text-black text-sm ">
            Learn more
          </button>
        </div>
        <div className="flex mb-5 items-center">
          <h4 className="text-2xl md:text-xl font-medium">Upcoming Events</h4>
          <button
            onClick={() => setAdd(true)}
            className="ml-auto p-2.5 border md:border-0 md:bg-neutral-900 rounded-2xl"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* events slider */}
        <div className="w-full">
          {events ? (
            <Swiper
              spaceBetween={30}
              navigation
              modules={[Navigation]}
              slidesPerView={"auto"}
            >
              {events?.map((item, i) => (
                <SwiperSlide className="md:!w-72" key={i}>
                  <EventSlide event={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
