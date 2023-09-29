"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QR({ setScan }: { setScan: any }) {
  const [result, setResult] = useState<{
    fullName: string;
    owner: string;
    uniqueName: string;
    email: string;
  }>();
  return (
    <div className="fixed flex flex-col items-center justify-center z-50 h-screen w-full bg-[#1e1e1e]/75 backdrop-blur-xl top-0 left-0 right-0 bottom-0">
      <button onClick={() => setScan(false)} className="absolute top-5 right-5">
        <X />
      </button>
      {result ? (
        <div className="flex p-10 items-center flex-col w-full gap-20 text-center">
          <h4 className="font-bold text-3xl">Confirm Registration Details</h4>
          <div>
            <h4 className="text-sm font-medium text-neutral-400 uppercase">
              full name
            </h4>
            <h4 className="text-2xl font-semibold">{result.fullName}</h4>
            <h4 className="text-sm font-medium uppercase mt-2.5 text-neutral-400">
              email
            </h4>
            <h4 className="text-2xl font-semibold">{result.email}</h4>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-5 p-10">
          <QrReader
            onResult={(result, error) => {
              if (result) {
                setResult(JSON.parse(result?.getText()!));
              }
            }}
            className="w-full rounded-xl"
            constraints={{
              facingMode: "environment",
              aspectRatio: 1,
            }}
          />
          <div>
            <h4 className="font-medium text-xl">Scan the Ticket</h4>
          </div>
        </div>
      )}
    </div>
  );
}
