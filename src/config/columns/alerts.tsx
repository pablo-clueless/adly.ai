import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { RiInformationLine, RiAlertLine, RiErrorWarningLine, RiAlarmWarningLine } from "@remixicon/react";

import type { AlertSeverity, SystemAlertProps } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ALERT_SEVERITY, ALERT_STATUS } from "@/config";
import { cn } from "@/lib";

const SEVERITY_ICONS: Record<AlertSeverity, React.ElementType> = {
  info: RiInformationLine,
  warning: RiAlertLine,
  error: RiErrorWarningLine,
  critical: RiAlarmWarningLine,
};

export const columns: ColumnDef<SystemAlertProps>[] = [
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
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const Icon = SEVERITY_ICONS[row.original.severity];
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-2xl border px-2 py-1 text-[10px] font-semibold uppercase",
            ALERT_SEVERITY[row.original.severity],
          )}
        >
          <Icon className="size-3" />
          {row.original.severity}
        </span>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Alert",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.title}</p>
        <p className="max-w-80 truncate text-xs text-gray-500">{row.original.message}</p>
      </div>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">{row.original.source}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={cn(
          "rounded-2xl border px-2 py-1 text-[10px] font-semibold uppercase",
          ALERT_STATUS[row.original.status],
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-gray-500">
        {formatDistanceToNow(new Date(row.original.created_at), { addSuffix: true })}
      </span>
    ),
  },
  {
    accessorKey: "acknowledged_by",
    header: "Acknowledged By",
    cell: ({ row }) => <span className="text-gray-500">{row.original.acknowledged_by || "-"}</span>,
  },
];
