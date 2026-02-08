import type { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownLine } from "@remixicon/react";
import { format } from "date-fns";

import type { CampaignProps } from "@/types/campaign";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatCurrency } from "@/lib";
import { CAMPAIGN_STATUS } from "@/config";

export const columns: ColumnDef<CampaignProps>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={cn(
          "rounded-2xl border px-2 py-1 text-[10px] font-semibold uppercase",
          CAMPAIGN_STATUS[row.original.status],
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div className="flex items-center gap-x-4">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Campaign
      </div>
    ),
  },
  {
    accessorKey: "budget",
    header: ({ column }) => (
      <div className="flex items-center gap-x-4">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Budget
      </div>
    ),
    cell: ({ row }) => <span>{formatCurrency(row.original.budget)}</span>,
  },
  {
    accessorKey: "reach",
    header: "Reach",
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "cost",
    header: "Amount Spent",
    cell: ({ row }) => <span>{formatCurrency(row.original.cost)}</span>,
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <div className="flex items-center gap-x-4">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Start Date
      </div>
    ),
    cell: ({ row }) => <span>{format(row.original.start_date, "yyyy-MM-dd")}</span>,
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <div className="flex items-center gap-x-4">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        End Date
      </div>
    ),
    cell: ({ row }) => <span>{format(row.original.end_date, "yyyy-MM-dd")}</span>,
  },
];
