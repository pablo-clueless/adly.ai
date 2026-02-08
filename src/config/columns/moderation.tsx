import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { RiFileTextLine, RiMegaphoneLine, RiUserLine } from "@remixicon/react";

import type { ModerationContentType, ModerationItemProps } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { MODERATION_STATUS } from "@/config";
import { cn } from "@/lib";

const CONTENT_ICONS: Record<ModerationContentType, React.ElementType> = {
  ad: RiFileTextLine,
  campaign: RiMegaphoneLine,
  user_report: RiUserLine,
};

export const columns: ColumnDef<ModerationItemProps>[] = [
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
    accessorKey: "content_type",
    header: "Type",
    cell: ({ row }) => {
      const Icon = CONTENT_ICONS[row.original.content_type];
      return (
        <div className="flex items-center gap-2">
          <span className="rounded bg-gray-100 p-1.5">
            <Icon className="size-4 text-gray-600" />
          </span>
          <span className="text-sm font-medium capitalize">{row.original.content_type.replace("_", " ")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "content_title",
    header: "Content",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.content_title}</p>
        <p className="max-w-60 truncate text-xs text-gray-500">{row.original.content_preview}</p>
      </div>
    ),
  },
  {
    accessorKey: "flags",
    header: "Flags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.flags.slice(0, 2).map((flag) => (
          <span key={flag} className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] text-red-600">
            {flag.replace("_", " ")}
          </span>
        ))}
        {row.original.flags.length > 2 && (
          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">
            +{row.original.flags.length - 2}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "submitted_by",
    header: "Submitted By",
    cell: ({ row }) => <span>{row.original.submitted_by}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={cn(
          "rounded-2xl border px-2 py-1 text-[10px] font-semibold uppercase",
          MODERATION_STATUS[row.original.status],
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "submitted_at",
    header: "Submitted",
    cell: ({ row }) => (
      <span className="text-gray-500">
        {formatDistanceToNow(new Date(row.original.submitted_at), { addSuffix: true })}
      </span>
    ),
  },
  {
    accessorKey: "reviewed_by",
    header: "Reviewed By",
    cell: ({ row }) => <span className="text-gray-500">{row.original.reviewed_by || "-"}</span>,
  },
];
