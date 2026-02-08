import type { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownLine } from "@remixicon/react";
import { format } from "date-fns";

import { Checkbox } from "@/components/ui/checkbox";
import type { AudienceProps } from "@/types";
import { cn } from "@/lib";

const STATUS_STYLES: Record<AudienceProps["status"], string> = {
  active: "bg-green-100 text-green-700 border-green-300",
  paused: "bg-yellow-100 text-yellow-700 border-yellow-300",
  archived: "bg-gray-100 text-gray-700 border-gray-300",
};

export const columns: ColumnDef<AudienceProps>[] = [
  {
    id: "selection",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center gap-x-2">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Name
      </div>
    ),
    cell: ({ row }) => (
      <div className="min-w-48">
        <p className="font-medium capitalize">{row.original.name}</p>
        {row.original.description && (
          <p className="ca mt-1 truncate text-xs text-gray-500">{row.original.description}</p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={cn(
          "rounded-2xl border px-2 py-1 text-[10px] font-semibold uppercase",
          STATUS_STYLES[row.original.status],
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "age_range",
    header: "Age Range",
    cell: ({ row }) => {
      const { age_range } = row.original.targeting;
      if (!age_range?.min && !age_range?.max) return <span className="text-gray-400">-</span>;
      return (
        <span>
          {age_range.min || 18} - {age_range.max || 65}
        </span>
      );
    },
  },
  {
    id: "genders",
    header: "Genders",
    cell: ({ row }) => {
      const genders = row.original.targeting.genders;
      if (!genders?.length) return <span className="text-gray-400">All</span>;
      return <span className="capitalize">{genders.join(", ")}</span>;
    },
  },
  {
    id: "locations",
    header: "Locations",
    cell: ({ row }) => {
      const locations = row.original.targeting.locations;
      if (!locations?.length) return <span className="text-gray-400">-</span>;
      return (
        <span className="max-w-32 truncate">
          {locations.length > 2 ? `${locations.slice(0, 2).join(", ")} +${locations.length - 2}` : locations.join(", ")}
        </span>
      );
    },
  },
  {
    id: "interests",
    header: "Interests",
    cell: ({ row }) => {
      const interests = row.original.targeting.interests;
      if (!interests?.length) return <span className="text-gray-400">-</span>;
      return <span>{interests.length} interests</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <div className="flex items-center gap-x-2">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Created
      </div>
    ),
    cell: ({ row }) => <span>{format(new Date(row.original.created_at), "MMM dd, yyyy")}</span>,
  },
];
