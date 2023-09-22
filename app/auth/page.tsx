import AuthMain from "@/components/auth";
import prisma from "@/utils/prisma";

const getUsernames = async () => {
  const usernames = await prisma.brand.findMany({
    select: { username: true },
  });

  return usernames;
};

export default async function Auth() {
  const usernames = await getUsernames();
  return (
    <div className="w-screen h-screen overflow-hidden p-10">
      <AuthMain usernames={usernames} />
    </div>
  );
}
