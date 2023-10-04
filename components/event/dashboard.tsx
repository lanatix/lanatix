"use client";
import { useEffect, useState } from "react";
import { useApp } from "../context";
import { fetcher } from "@/utils/fetch";
import { Event } from "@prisma/client";
import Loader from "@/app/dashboard/loading";
import Header from "../dashboard/header";
import { RefreshCcw, Users2 } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart } from "chart.js";
import { DataTable } from "../desktop/data-table";
import { Attendee, columns } from "../desktop/columns";

export default function EventDashboard({ name }: { name: string }) {
  const { brandDetails } = useApp();
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState<Event>();

  useEffect(() => {
    const fetchEventData = async () => {
      const { data } = await fetcher(
        `/api/event?owner=${brandDetails?.username}&name=${name}`,
        "GET"
      );
      setEventData(data);
      setLoading(false);
    };
    if (brandDetails) {
      fetchEventData();
    }
    Chart.register(ArcElement);
  }, [brandDetails]);

  const refreshData = async () => {
    if (brandDetails) {
      setLoading(true);
      const { data } = await fetcher(
        `/api/event?owner=${brandDetails?.username}&name=${name}`,
        "GET"
      );
      setEventData(data);
      setLoading(false);
    }
  };

  const attended = eventData?.registered.filter(
    (item: any) => item.attended === true
  );

  const notAttended = eventData?.registered.length! - attended?.length!;

  return loading ? (
    <Loader />
  ) : (
    <div className="h-screen overflow-y-scroll dashboard-scroll bg-neutral-950 w-full">
      {/* header */}
      <Header title={`${eventData?.title}`} />
      <div className="grid grid-cols-6 px-5">
        <div className="cols-span-4">
          <div className="flex gap-10">
            <div className="flex flex-col gap-2.5">
              <div className=" p-5 bg-neutral-900 rounded-2xl flex gap-2.5">
                <div className="p-5 shadow-xl rounded-xl green-bg">
                  <Users2 />
                </div>
                <div className="space-y-">
                  <h4 className=" text-sm text-neutral-500 font-semibold">
                    Registered
                  </h4>
                  <h4 className="text-4xl font-semibold">
                    {eventData?.registered.length}
                  </h4>
                </div>
              </div>
              <div className=" p-5 bg-neutral-900 rounded-2xl flex gap-2.5">
                <div className="p-5 shadow-xl rounded-xl side-bg">
                  <Users2 />
                </div>
                <div className="space-y-">
                  <h4 className=" text-sm text-neutral-500 font-semibold">
                    Attended
                  </h4>
                  <h4 className="text-4xl font-semibold">{attended?.length}</h4>
                </div>
              </div>
            </div>
            <div className="h-56 flex">
              <div>
                <Doughnut
                  data={{
                    labels: ["Attended", "Didn't attend"],
                    datasets: [
                      {
                        label: "Phonk",
                        data: [attended?.length, notAttended],
                        backgroundColor: [
                          "rgba(220, 31, 255)",
                          "rgba(0, 255, 163, 0.62)",
                        ],
                        borderJoinStyle: "round",
                        borderWidth: 5,
                        borderColor: "#0a0a0a",
                        borderRadius: 10,
                        hoverOffset: 10,
                      },
                    ],
                  }}
                />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-5 mt-10">
        <div className="flex items-center">
          <h4 className="font-semibold text-2xl">Attendee Data</h4>
          <button
            onClick={refreshData}
            className="ml-auto p-2.5 bg-neutral-900 rounded-lg"
          >
            <RefreshCcw size={20} />
          </button>
        </div>
        <DataTable
          brandName={eventData?.owner as string}
          eventName={eventData?.uniqueName as string}
          columns={columns}
          data={eventData?.registered as Attendee[]}
        />
      </div>
    </div>
  );
}
