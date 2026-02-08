import type { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownLine } from "@remixicon/react";
import { format } from "date-fns";

import { Checkbox } from "@/components/ui/checkbox";
import type { FinanceProps } from "@/types";
import { formatCurrency, cn } from "@/lib";

const STATUS_STYLES: Record<FinanceProps["status"], string> = {
  active: "bg-green-100 text-green-700 border-green-300",
  paused: "bg-yellow-100 text-yellow-700 border-yellow-300",
  completed: "bg-gray-100 text-gray-700 border-gray-300",
};

export const columns: ColumnDef<FinanceProps>[] = [
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
    header: "Budget Name",
    cell: ({ row }) => <span className="min-w-32 font-medium capitalize">{row.original.name}</span>,
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
    accessorKey: "budget",
    header: ({ column }) => (
      <div className="flex items-center gap-x-2">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Budget
      </div>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{formatCurrency(row.original.budget, row.original.currency)}</span>
    ),
  },
  {
    accessorKey: "spent",
    header: ({ column }) => (
      <div className="flex items-center gap-x-2">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Spent
      </div>
    ),
    cell: ({ row }) => {
      const isOverBudget = row.original.spent > row.original.budget;
      return (
        <span className={cn("font-medium", isOverBudget && "text-red-600")}>
          {formatCurrency(row.original.spent, row.original.currency)}
        </span>
      );
    },
  },
  {
    accessorKey: "remaining",
    header: "Remaining",
    cell: ({ row }) => {
      const remaining = row.original.budget - row.original.spent;
      return <span className="text-gray-600">{formatCurrency(remaining, row.original.currency)}</span>;
    },
  },
  {
    id: "usage",
    header: "Usage",
    cell: ({ row }) => {
      const percentage = Math.round((row.original.spent / row.original.budget) * 100);
      const isOverBudget = percentage > 100;
      const isNearLimit = percentage >= 80 && !isOverBudget;

      return (
        <div className="flex min-w-24 items-center gap-x-2">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isOverBudget ? "bg-red-500" : isNearLimit ? "bg-orange-500" : "bg-primary-500",
              )}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-600">{percentage}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <div className="flex items-center gap-x-2">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Start Date
      </div>
    ),
    cell: ({ row }) => <span>{format(new Date(row.original.start_date), "MMM dd, yyyy")}</span>,
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => (
      <span>{row.original.end_date ? format(new Date(row.original.end_date), "MMM dd, yyyy") : "-"}</span>
    ),
  },
];
