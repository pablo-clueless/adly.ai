"use client";

import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RiCheckLine, RiCloseLine, RiEyeLine, RiRefreshLine } from "@remixicon/react";

import { DataTable, Pagination } from "@/components/shared";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";
import { columns } from "@/config/columns/moderation";
import type { ModerationItemProps, ModerationStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { cn, paginate } from "@/lib";

import { MOCK_MODERATION_ITEMS } from "@/__mock__";

const PAGE_SIZE = 10;

type FilterTab = "all" | ModerationStatus;

const Page = () => {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const filtered = useMemo(() => {
    let items = [...MOCK_MODERATION_ITEMS];

    if (activeTab !== "all") {
      items = items.filter((i) => i.status === activeTab);
    }

    if (query) {
      items = items.filter(
        (item) =>
          item.content_title.toLowerCase().includes(query.toLowerCase()) ||
          item.content_preview.toLowerCase().includes(query.toLowerCase()) ||
          item.submitted_by.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return items;
  }, [query, activeTab]);

  const paginated = useMemo(() => {
    return paginate(filtered, page, PAGE_SIZE, filtered.length);
  }, [filtered, page]);

  const selectedItems = useMemo(() => {
    return Object.entries(selectedRows)
      .filter(([, isSelected]) => isSelected)
      .map(([index]) => paginated[parseInt(index)])
      .filter(Boolean) as ModerationItemProps[];
  }, [selectedRows, paginated]);

  const hasSelection = selectedItems.length > 0;

  const handleRowSelectionChange = useCallback((selection: Record<string, boolean>) => {
    setSelectedRows(selection);
  }, []);

  const handleApprove = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select items to approve");
      return;
    }
    const pendingItems = selectedItems.filter((i) => i.status === "pending");
    if (pendingItems.length === 0) {
      toast.info("Selected items are already reviewed");
      return;
    }
    toast.success(`${pendingItems.length} item(s) approved`);
    setSelectedRows({});
  }, [hasSelection, selectedItems]);

  const handleReject = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select items to reject");
      return;
    }
    const pendingItems = selectedItems.filter((i) => i.status === "pending");
    if (pendingItems.length === 0) {
      toast.info("Selected items are already reviewed");
      return;
    }
    toast.success(`${pendingItems.length} item(s) rejected`);
    setSelectedRows({});
  }, [hasSelection, selectedItems]);

  const handleRefresh = useCallback(() => {
    toast.success("Moderation queue refreshed");
  }, []);

  const variants = shouldReduceMotion ? {} : slideUpVariants;

  const pendingCount = MOCK_MODERATION_ITEMS.filter((i) => i.status === "pending").length;
  const approvedCount = MOCK_MODERATION_ITEMS.filter((i) => i.status === "approved").length;
  const rejectedCount = MOCK_MODERATION_ITEMS.filter((i) => i.status === "rejected").length;

  const filterTabs: { label: string; value: FilterTab; count: number }[] = [
    { label: "All Items", value: "all", count: MOCK_MODERATION_ITEMS.length },
    { label: "Pending", value: "pending", count: pendingCount },
    { label: "Approved", value: "approved", count: approvedCount },
    { label: "Rejected", value: "rejected", count: rejectedCount },
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
          <p className="text-2xl font-semibold">Content Moderation</p>
          <p className="mt-1 text-sm text-gray-500">Review and moderate platform content</p>
        </div>
        {pendingCount > 0 && (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-600">
            {pendingCount} Pending Review
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
            placeholder="Search by content, submitter..."
            type="search"
            value={searchTerm}
          />
          <div className="text-sm text-gray-500">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            {hasSelection && ` (${selectedItems.length} selected)`}
          </div>
        </motion.div>

        <motion.div className="flex w-full items-center gap-x-2">
          <Button size="sm" variant="outline" disabled={!hasSelection || selectedItems.length !== 1}>
            <RiEyeLine /> Preview
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleApprove}
            disabled={!hasSelection}
            className="text-green-600 hover:text-green-700"
          >
            <RiCheckLine /> Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReject}
            disabled={!hasSelection}
            className="text-red-500 hover:text-red-600"
          >
            <RiCloseLine /> Reject
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
