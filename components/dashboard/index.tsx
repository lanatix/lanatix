"use client";

import { useState } from "react";
import { useApp } from "../context";
import { Plus } from "lucide-react";
import MainAdd from "./add";
import Loader from "../../app/dashboard/loading";
import { Swiper, SwiperSlide } from "swiper/react";
import EventSlide from "./event";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function DashboardMain() {
  const [add, setAdd] = useState(false);
  const { brandDetails, loading, events } = useApp();
  // console.log(brandDetails);
  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen  w-full">
      {add && <MainAdd setClose={setAdd} />}
      {/* header */}
      <div className="p-5 border-b border-b-neutral-700">
        <h4 className="font-medium text-xl truncate">{brandDetails?.name}</h4>
        <div className="flex ml-auto gap-5"></div>
      </div>

      {/* body */}
      <div className="p-5 ">
        <div className="flex mb-5 items-center">
          <h4 className="text-2xl font-medium">Upcoming Events</h4>
          <button
            onClick={() => setAdd(true)}
            className="ml-auto p-2.5 border rounded-lg"
          >
            <Plus />
          </button>
        </div>

        {/* events slider */}
        <div>
          {events ? (
            <Swiper
              spaceBetween={30}
              navigation
              modules={[Navigation]}
              slidesPerView={"auto"}
            >
              {events?.map((item, i) => (
                <SwiperSlide key={i}>
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
