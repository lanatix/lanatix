import Dashboard from "@/components/event/dashboard";

export default function EventDashboard({
  params,
}: {
  params: { name: string };
}) {
  return <Dashboard name={params.name} />;
}
