import EventMain from "@/components/event";
import prisma from "@/utils/prisma";

const getEventData = async (owner: string, uniqueName: string) => {
  const data = await prisma.event.findUnique({
    where: {
      owner_uniqueName: {
        owner,
        uniqueName,
      },
    },
  });
  const brandName = await prisma.brand.findUnique({
    where: {
      username: owner,
    },
    select: {
      name: true,
      username: true,
    },
  });

  return { eventData: data, brandName };
};

export default async function EventPage({
  params,
}: {
  params: { brand: string; event: string };
}) {
  const { eventData, brandName } = await getEventData(
    params.brand,
    params.event
  );
  return (
    <div>
      <EventMain eventData={eventData} brandName={brandName} />
    </div>
  );
}
