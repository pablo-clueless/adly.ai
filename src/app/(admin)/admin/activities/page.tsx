"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RiDownloadLine, RiRefreshLine } from "@remixicon/react";
import { isWithinInterval } from "date-fns";

import { DataTable, DatePicker, Pagination, type DateRange } from "@/components/shared";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";
import { columns } from "@/config/columns/activity-logs";
import type { ActivityType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { cn, paginate } from "@/lib";

import { MOCK_ACTIVITY_LOGS } from "@/__mock__";

const PAGE_SIZE = 15;

type FilterTab = "all" | ActivityType;

const Page = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const filtered = useMemo(() => {
    let logs = [...MOCK_ACTIVITY_LOGS];

    if (activeTab !== "all") {
      logs = logs.filter((l) => l.action === activeTab);
    }

    if (query) {
      logs = logs.filter(
        (log) =>
          log.user_name.toLowerCase().includes(query.toLowerCase()) ||
          log.user_email.toLowerCase().includes(query.toLowerCase()) ||
          log.resource_name.toLowerCase().includes(query.toLowerCase()) ||
          log.resource_type.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (dateRange.from && dateRange.to) {
      logs = logs.filter((log) => {
        const timestamp = new Date(log.timestamp);
        return isWithinInterval(timestamp, { start: dateRange.from!, end: dateRange.to! });
      });
    }

    return logs;
  }, [query, activeTab, dateRange]);

  const paginated = useMemo(() => {
    return paginate(filtered, page, PAGE_SIZE, filtered.length);
  }, [filtered, page]);

  const handleRefresh = () => {
    toast.success("Activity logs refreshed");
  };

  const handleExport = () => {
    toast.success("Exporting activity logs...");
  };

  const variants = shouldReduceMotion ? {} : slideUpVariants;

  const filterTabs: { label: string; value: FilterTab }[] = [
    { label: "All", value: "all" },
    { label: "Login", value: "login" },
    { label: "Create", value: "create" },
    { label: "Update", value: "update" },
    { label: "Delete", value: "delete" },
    { label: "Export", value: "export" },
  ];

  return (
    <motion.div
      className="h-full w-full space-y-6 overflow-y-auto"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <motion.div
        className="flex w-full items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <p className="text-2xl font-semibold">Activity Logs</p>
          <p className="mt-1 text-sm text-gray-500">Track all user and system activities on the platform</p>
        </div>
      </motion.div>

      <div className="space-y-2">
        <motion.div
          className="flex w-full items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className="flex items-center gap-x-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filterTabs.map((tab) => (
              <Button
                key={tab.value}
                size="sm"
                variant={activeTab === tab.value ? "default" : "outline"}
                onClick={() => {
                  setActiveTab(tab.value);
                  setPage(1);
                }}
                className={cn(activeTab === tab.value && "bg-primary-500 text-white")}
              >
                {tab.label}
              </Button>
            ))}
          </motion.div>
          <motion.div
            className="flex items-center gap-x-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button size="sm" variant="outline" onClick={handleExport}>
              <RiDownloadLine /> Export
            </Button>
            <Button size="sm" variant="outline" onClick={handleRefresh}>
              <RiRefreshLine /> Refresh
            </Button>
          </motion.div>
        </motion.div>

        <motion.div className="flex w-full items-center justify-between gap-x-4">
          <Input
            wrapperClassName="w-full sm:w-1/3"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Search by user, email, resource..."
            type="search"
            value={searchTerm}
          />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {filtered.length} log{filtered.length !== 1 ? "s" : ""}
            </span>
            <DatePicker
              onValueChange={(range) => {
                setDateRange(range);
                setPage(1);
              }}
              type="range"
              value={dateRange}
            />
          </div>
        </motion.div>
      </div>

      <div className="w-full space-y-6">
        <DataTable columns={columns} data={paginated} />
        <Pagination current={page} limit={PAGE_SIZE} onPageChange={setPage} total={filtered.length} />
      </div>
    </motion.div>
  );
};

export default Page;
