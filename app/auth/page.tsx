import AuthMain from "@/components/auth";
import prisma from "@/utils/prisma";
import Loader from "./loading";

const getUsernames = async () => {
  const usernames = await prisma.brand.findMany({
    select: { username: true },
  });

  return usernames;
};

export const revalidate = 0;

export default async function Auth() {
  const usernames = await getUsernames();
  return (
    <div className="w-screen h-screen overflow-hidden p-10">
      <AuthMain usernames={usernames} />
    </div>
  );
}
