import EventMain from "@/components/event";
import prisma from "@/utils/prisma";

const getEventData = async (id: string) => {
  const data = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  return { eventData: data };
};

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { eventData } = await getEventData(params.id);
  return (
    <div>
      <EventMain eventData={eventData} />
    </div>
  );
}
