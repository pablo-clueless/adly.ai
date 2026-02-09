import type { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownLine } from "@remixicon/react";
import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import type { AdminUserProps } from "@/types";
import { cn, formatCurrency, getInitials } from "@/lib";
import { USER_STATUS } from "@/config";

export const columns: ColumnDef<AdminUserProps>[] = [
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
    accessorKey: "full_name",
    header: ({ column }) => (
      <div className="flex items-center gap-x-2">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        User
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarImage src={row.original.profile.avatar_url} />
          <AvatarFallback className="bg-primary-50/50 text-primary-500 text-xs font-medium">
            {getInitials(row.original.full_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{row.original.full_name}</p>
          <p className="text-xs text-gray-500 lowercase">{row.original.email}</p>
        </div>
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
          USER_STATUS[row.original.status],
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">{row.original.role}</span>,
  },
  {
    accessorKey: "profile.company_name",
    header: "Company",
    cell: ({ row }) => <span className="max-w-40 truncate">{row.original.profile.company_name}</span>,
  },
  {
    accessorKey: "total_campaigns",
    header: ({ column }) => (
      <div className="flex items-center gap-x-2">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Campaigns
      </div>
    ),
  },
  {
    accessorKey: "total_spend",
    header: ({ column }) => (
      <div className="flex items-center gap-x-2">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Total Spend
      </div>
    ),
    cell: ({ row }) => <span>{formatCurrency(row.original.total_spend)}</span>,
  },
  {
    accessorKey: "last_login",
    header: "Last Login",
    cell: ({ row }) => (
      <span className="text-gray-500">
        {formatDistanceToNow(new Date(row.original.last_login), { addSuffix: true })}
      </span>
    ),
  },
  {
    accessorKey: "date_joined",
    header: ({ column }) => (
      <div className="flex items-center gap-x-2">
        <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <RiArrowUpDownLine className="size-4" />
        </button>
        Joined
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-gray-500">
        {formatDistanceToNow(new Date(row.original.date_joined), { addSuffix: true })}
      </span>
    ),
  },
];
