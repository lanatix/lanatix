"use client";

import { fetcher } from "@/utils/fetch";
import { ColumnDef } from "@tanstack/react-table";
import { useToast } from "../ui/use-toast";

export type Attendee = {
  fullName: string;
  email: string;
  answers: any[];
  attended?: boolean;
};

export const columns: ColumnDef<Attendee>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "attended",
    header: "Attended",
    cell: ({ row }) => {
      const user = row.original;
      return user.attended ? (
        <h4 className="p-2 py-1 text-xs green-bg rounded-lg w-fit">True</h4>
      ) : (
        <h4 className="p-2 py-1 text-xs bg-red-500 rounded-lg w-fit">False </h4>
      );
    },
  },
  {
    header: "Confirm Attendance",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const { toast } = useToast();

      const confirmAttendance = async () => {
        const confirm = await fetcher("/api/event/validate", "POST", user);
        toast({
          description: confirm.message,
          variant: confirm.success ? "default" : "destructive",
        });
      };

      return (
        <div className="flex">
          <button
            onClick={confirmAttendance}
            disabled={user.attended}
            className="grad font-semibold disabled:opacity-40 text-black px-4 p-2 text-xs ml-ato rounded-lg"
          >
            Confirm
          </button>
        </div>
      );
    },
  },
];
