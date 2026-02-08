"use client";

import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RiCheckLine, RiCloseLine, RiDeleteBinLine, RiRefreshLine } from "@remixicon/react";

import { DataTable, Pagination } from "@/components/shared";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";
import { columns } from "@/config/columns/alerts";
import type { AlertStatus, SystemAlertProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { cn, paginate } from "@/lib";

import { MOCK_SYSTEM_ALERTS } from "@/__mock__";

const PAGE_SIZE = 10;

type FilterTab = "all" | AlertStatus;

const Page = () => {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const filtered = useMemo(() => {
    let alerts = [...MOCK_SYSTEM_ALERTS];

    if (activeTab !== "all") {
      alerts = alerts.filter((a) => a.status === activeTab);
    }

    if (query) {
      alerts = alerts.filter(
        (alert) =>
          alert.title.toLowerCase().includes(query.toLowerCase()) ||
          alert.message.toLowerCase().includes(query.toLowerCase()) ||
          alert.source.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return alerts;
  }, [query, activeTab]);

  const paginated = useMemo(() => {
    return paginate(filtered, page, PAGE_SIZE, filtered.length);
  }, [filtered, page]);

  const selectedAlerts = useMemo(() => {
    return Object.entries(selectedRows)
      .filter(([, isSelected]) => isSelected)
      .map(([index]) => paginated[parseInt(index)])
      .filter(Boolean) as SystemAlertProps[];
  }, [selectedRows, paginated]);

  const hasSelection = selectedAlerts.length > 0;

  const handleRowSelectionChange = useCallback((selection: Record<string, boolean>) => {
    setSelectedRows(selection);
  }, []);

  const handleAcknowledge = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select alerts to acknowledge");
      return;
    }
    const activeAlerts = selectedAlerts.filter((a) => a.status === "active");
    if (activeAlerts.length === 0) {
      toast.info("Selected alerts are already acknowledged or resolved");
      return;
    }
    toast.success(`${activeAlerts.length} alert(s) acknowledged`);
    setSelectedRows({});
  }, [hasSelection, selectedAlerts]);

  const handleResolve = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select alerts to resolve");
      return;
    }
    const unresolvedAlerts = selectedAlerts.filter((a) => a.status !== "resolved");
    if (unresolvedAlerts.length === 0) {
      toast.info("Selected alerts are already resolved");
      return;
    }
    toast.success(`${unresolvedAlerts.length} alert(s) resolved`);
    setSelectedRows({});
  }, [hasSelection, selectedAlerts]);

  const handleDelete = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select alerts to delete");
      return;
    }
    toast.success(`${selectedAlerts.length} alert(s) deleted`);
    setSelectedRows({});
  }, [hasSelection, selectedAlerts]);

  const handleRefresh = useCallback(() => {
    toast.success("Alerts refreshed");
  }, []);

  const variants = shouldReduceMotion ? {} : slideUpVariants;

  const activeCount = MOCK_SYSTEM_ALERTS.filter((a) => a.status === "active").length;
  const acknowledgedCount = MOCK_SYSTEM_ALERTS.filter((a) => a.status === "acknowledged").length;
  const resolvedCount = MOCK_SYSTEM_ALERTS.filter((a) => a.status === "resolved").length;

  const filterTabs: { label: string; value: FilterTab; count: number }[] = [
    { label: "All Alerts", value: "all", count: MOCK_SYSTEM_ALERTS.length },
    { label: "Active", value: "active", count: activeCount },
    { label: "Acknowledged", value: "acknowledged", count: acknowledgedCount },
    { label: "Resolved", value: "resolved", count: resolvedCount },
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
          <p className="text-2xl font-semibold">System Alerts</p>
          <p className="mt-1 text-sm text-gray-500">Monitor and respond to platform alerts</p>
        </div>
        {activeCount > 0 && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
            {activeCount} Active Alert{activeCount !== 1 ? "s" : ""}
          </span>
        )}
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
                <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{tab.count}</span>
              </Button>
            ))}
          </motion.div>
          <motion.div
            className="flex items-center gap-x-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
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
            placeholder="Search by title, message, source..."
            type="search"
            value={searchTerm}
          />
          <div className="text-sm text-gray-500">
            {filtered.length} alert{filtered.length !== 1 ? "s" : ""}
            {hasSelection && ` (${selectedAlerts.length} selected)`}
          </div>
        </motion.div>

        <motion.div className="flex w-full items-center gap-x-2">
          <Button size="sm" variant="outline" onClick={handleAcknowledge} disabled={!hasSelection}>
            <RiCheckLine /> Acknowledge
          </Button>
          <Button size="sm" variant="outline" onClick={handleResolve} disabled={!hasSelection}>
            <RiCloseLine /> Resolve
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDelete}
            disabled={!hasSelection}
            className="text-red-500 hover:text-red-600"
          >
            <RiDeleteBinLine /> Delete
          </Button>
        </motion.div>
      </div>

      <div className="w-full space-y-6">
        <DataTable
          columns={columns}
          data={paginated}
          onRowSelectionChange={handleRowSelectionChange}
          rowSelection={selectedRows}
        />
        <Pagination current={page} limit={PAGE_SIZE} onPageChange={setPage} total={filtered.length} />
      </div>
    </motion.div>
  );
};

export default Page;
