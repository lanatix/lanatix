import AuthMain from "@/components/auth";
import prisma from "@/utils/prisma";
import Loader from "./loading";

export const revalidate = 0;

export default async function Auth() {
  return (
    <div className="w-screen h-screen overflow-hidden p-10">
      <AuthMain />
    </div>
  );
}
