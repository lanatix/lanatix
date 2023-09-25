import { Loader2 } from "lucide-react";

export default function AuthLoader() {
  return (
    <div className="fixed z-50 w-full left-0 h-full backdrop-blur-xl flex flex-col justify-center items-center">
      <Loader2 className="loader" />
      <h4>Authenticating...</h4>
    </div>
  );
}
