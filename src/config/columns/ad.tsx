import type { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownLine } from "@remixicon/react";
import { format } from "date-fns";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { AdProps } from "@/types/";
import { AD_STATUS } from "@/config";
import { cn } from "@/lib";

export const columns: ColumnDef<AdProps>[] = [
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex min-w-70 items-center gap-x-4">
        {row.original.title}
        <Button onClick={() => console.log({ id: row.original.id })} size="sm" variant="outline">
          Boost
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "published_at",
    header: ({ column }) => (
      <div className="flex items-center gap-x-4">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Date Published
      </div>
    ),
    cell: ({ row }) => <span>{format(row.original.published_at, "yyyy-MM-dd")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={cn(
          "rounded-2xl border px-2 py-1 text-[10px] font-semibold uppercase",
          AD_STATUS[row.original.status],
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "reach",
    header: "Reach",
  },
  {
    accessorKey: "reactions",
    header: "Reactions",
  },
  {
    accessorKey: "comments",
    header: "Comments",
  },
  {
    accessorKey: "shares",
    header: "Shares",
  },
];
