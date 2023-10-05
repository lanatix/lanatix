import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <Loader2 className="loader" />
    </div>
  );
}
