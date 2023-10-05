"use client";

import { fetcher } from "@/utils/fetch";
import { useWallet } from "@solana/wallet-adapter-react";
import { FormEvent, useEffect, ChangeEvent, useState } from "react";
import { useApp } from "../context";
import {
  ChevronLeft,
  ChevronLeftCircle,
  ChevronRight,
  Loader2,
  Plus,
  Recycle,
  Trash,
  X,
} from "lucide-react";
import { Calendar } from "../ui/calendar";
import uploadImages from "@/helpers/uploadImages";
import ImageUploading from "react-images-uploading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface Event {
  title: string;
  location: string;
  time: string;
  owner: string;
  description: string;
}

export default function MainAdd({ setClose }: { setClose: any }) {
  const { user } = useApp();
  const [eventDate, setDate] = useState<Date | undefined>(new Date());
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrent] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const initialState: Event = {
    title: "",
    location: "",
    time: "",
    owner: user?.email!,
    description: "",
  };
  const { toast } = useToast();
  const router = useRouter();
  const [eventCredentials, setCredentials] = useState<Event>(initialState);

  const submitEventData = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const urls = await uploadImages(images);

      const submitted = await fetcher("/api/event/create", "POST", {
        ...eventCredentials,
        questions,
        date: eventDate,
        images: urls,
      });
      if (submitted.success) {
        toast({
          description: "Event Created!",
          title: "Redirecting..",
        });
        router.push(`/${submitted.data.id}`);
      } else {
        toast({
          description: "An error has occured",
          variant: "destructive",
        });
      }
      setLoading(false);
    } catch (err) {
      toast({
        description: "An error has occured",
        title: "Error!",
      });
      console.log(err);
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, currentQuestion]);
    setCurrent("");
  };
  return (
    <div className="absolute z-50 overflow-y-scroll backdrop-blur-lg p-5 h-screen md:w-full w-screen md:left-0 bg-neutral-900/75">
      <div className="flex items-center">
        <h4 className="text-3xl font-medium">Add an Event</h4>

        <button
          onClick={(e) => setClose(false)}
          className="p-2.5 ml-auto rounded-lg border"
        >
          <X />
        </button>
      </div>
      <form onSubmit={submitEventData} className="space-y-5 mt-5 w-full">
        <div className="space-y-1">
          <h4 className="font-medium">Event Title</h4>
          <input
            required
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Phonk Party"
            className="focus:outline-none border w-full md:w-96 rounded-lg px-5 p-2.5 bg-transparent"
          />
        </div>
        <div className="space-y-1">
          <h4 className="font-medium">Event Description</h4>
          <textarea
            required
            name="description"
            rows={3}
            onChange={handleChange}
            className="border rounded-lg bg-transparent w-full md:w-96 px-5"
          />
        </div>
        <div className="space-y-1">
          <h4 className="font-medium">Event Location</h4>
          <input
            required
            type="text"
            onChange={handleChange}
            name="location"
            placeholder="5 Crest Avenue, New York City"
            className="border rounded-lg w-full md:w-96 bg-transparent px-5"
          />
        </div>
        <div className="space-y-1">
          <h4 className="font-medium">Event Date</h4>
          <Calendar
            mode="single"
            selected={eventDate}
            onSelect={setDate}
            className="w-full m-auto"
          />
        </div>
        <div className="space-y-1">
          <h4 className="font-medium">Event Time</h4>
          <input
            type="time"
            name="time"
            onChange={handleChange}
            className="border rounded-lg w-full md:w-96 bg-transparent px-5"
          />
        </div>
        <h4 className="font-medium">Event Images</h4>
        <ImageUploading
          multiple
          value={images}
          onChange={(imageList, addUpdateIndex) => {
            console.log(imageList, addUpdateIndex);
            setImages(imageList);
            console.log(images);
          }}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="w-full relative">
              <div className="flex gap-2.5 mb-2.5 items-center">
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  type="button"
                  className="px-5 p-2.5 border rounded-lg"
                >
                  Add Images
                </button>
                <button
                  type="button"
                  className="px-5 p-2.5 border rounded-lg"
                  onClick={onImageRemoveAll}
                >
                  Remove all images
                </button>
              </div>
              <Swiper
                slidesPerView={1}
                modules={[Navigation]}
                navigation={{ nextEl: ".imageNext", prevEl: ".imagePrev" }}
                className="relative w-full"
              >
                <button
                  type="button"
                  className="absolute text-black right-0 top-[35%] z-30 bg-white/40 imageNext disabled:hidden p-2 rounded-full"
                >
                  <ChevronRight />
                </button>
                <button
                  type="button"
                  className="absolute text-black left-0 top-[35%] z-30 bg-white/40 imagePrev disabled:hidden p-2 rounded-full"
                >
                  <ChevronLeft />
                </button>
                {imageList.map((image, index) => (
                  <SwiperSlide key={index} className="image-item">
                    <img
                      src={image.dataURL!}
                      alt=""
                      className="border rounded-xl w-full h-56 object-cover"
                    />
                    <div className="flex mt-2.5 gap-2.5 items-center justify-center">
                      <button
                        type="button"
                        onClick={() => onImageUpdate(index)}
                      >
                        <Recycle />
                      </button>
                      <button
                        type="button"
                        onClick={() => onImageRemove(index)}
                      >
                        <Trash />
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </ImageUploading>
        <div className="space-y-2.5">
          <h4 className="font-medium">Custom Questions</h4>
          <div className="space-y-2.5 text-sm">
            {questions?.map((item, key) => (
              <div
                key={key}
                className="border font-light text-sm p-2.5 rounded-lg w-full md:w-96"
              >
                {item}
              </div>
            ))}
            <div className="flex items-center gap-5">
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full md:w-96"
              />
              <button
                type="button"
                onClick={addQuestion}
                className="p-2.5 border rounded-lg"
              >
                <Plus />
              </button>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full md:w-96 disabled:bg-neutral-600 rounded-lg px-5 p-2.5 grad font-semibold"
        >
          {loading ? "Adding Event..." : "Add Event"}
        </button>
      </form>
    </div>
  );
}
