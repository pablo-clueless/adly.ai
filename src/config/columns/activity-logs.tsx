import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiUploadLine,
} from "@remixicon/react";

import type { ActivityLogProps, ActivityType } from "@/types";
import { cn } from "@/lib";

const ACTION_ICONS: Record<ActivityType, React.ElementType> = {
  login: RiLoginBoxLine,
  logout: RiLogoutBoxLine,
  create: RiAddLine,
  update: RiEditLine,
  delete: RiDeleteBinLine,
  export: RiDownloadLine,
  import: RiUploadLine,
};

const ACTION_COLORS: Record<ActivityType, string> = {
  login: "bg-green-100 text-green-600",
  logout: "bg-gray-100 text-gray-600",
  create: "bg-blue-100 text-blue-600",
  update: "bg-yellow-100 text-yellow-600",
  delete: "bg-red-100 text-red-600",
  export: "bg-purple-100 text-purple-600",
  import: "bg-indigo-100 text-indigo-600",
};

export const columns: ColumnDef<ActivityLogProps>[] = [
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const Icon = ACTION_ICONS[row.original.action];
      return (
        <div className="flex items-center gap-2">
          <span className={cn("rounded-full p-1.5", ACTION_COLORS[row.original.action])}>
            <Icon className="size-4" />
          </span>
          <span className="font-medium capitalize">{row.original.action}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "user_name",
    header: "User",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.user_name}</p>
        <p className="text-xs text-gray-500 lowercase">{row.original.user_email}</p>
      </div>
    ),
  },
  {
    accessorKey: "resource_type",
    header: "Resource",
    cell: ({ row }) => (
      <div>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium capitalize">
          {row.original.resource_type}
        </span>
        <p className="mt-1 max-w-40 truncate text-xs text-gray-500">{row.original.resource_name}</p>
      </div>
    ),
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
    cell: ({ row }) => {
      const ip_address = row.original.ip_address;
      const ip_parts = ip_address.split(".");
      const masked = `${ip_parts[0]}.${ip_parts[1]}.*.*`;
      return <span className="truncate font-mono text-sm">{masked}</span>;
    },
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => <div className="max-w-20 truncate text-gray-500">{row.original.details || "-"}</div>,
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => (
      <span className="text-gray-500">{format(new Date(row.original.timestamp), "MMM dd, yyyy HH:mm:ss")}</span>
    ),
  },
];
