"use client";

import { useMemo, useState, useCallback } from "react";
import { isWithinInterval } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RiDeleteBinLine, RiEyeLine, RiPauseLine, RiPlayLine, RiRefreshLine } from "@remixicon/react";

import { DataTable, DatePicker, Pagination, type DateRange } from "@/components/shared";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";
import type { CampaignProps, CampaignStatus } from "@/types";
import { columns } from "@/config/columns/campaign";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { cn, paginate } from "@/lib";

import { MOCK_CAMPAIGNS } from "@/__mock__";

const PAGE_SIZE = 10;

type FilterTab = "all" | CampaignStatus;

const Page = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const filtered = useMemo(() => {
    let campaigns = [...MOCK_CAMPAIGNS];

    if (activeTab !== "all") {
      campaigns = campaigns.filter((c) => c.status === activeTab);
    }

    if (query) {
      campaigns = campaigns.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(query.toLowerCase()) ||
          campaign.status.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (dateRange.from && dateRange.to) {
      campaigns = campaigns.filter((campaign) => {
        const startDate = new Date(campaign.start_date);
        return isWithinInterval(startDate, { start: dateRange.from!, end: dateRange.to! });
      });
    }

    return campaigns;
  }, [query, activeTab, dateRange]);

  const paginated = useMemo(() => {
    return paginate(filtered, page, PAGE_SIZE, filtered.length);
  }, [filtered, page]);

  const selectedCampaigns = useMemo(() => {
    return Object.entries(selectedRows)
      .filter(([, isSelected]) => isSelected)
      .map(([index]) => paginated[parseInt(index)])
      .filter(Boolean) as CampaignProps[];
  }, [selectedRows, paginated]);

  const hasSelection = selectedCampaigns.length > 0;

  const handleRowSelectionChange = useCallback((selection: Record<string, boolean>) => {
    setSelectedRows(selection);
  }, []);

  const handleStatusChange = useCallback(
    (newStatus: CampaignStatus) => {
      if (!hasSelection) {
        toast.error("Please select campaigns");
        return;
      }
      const campaignsToUpdate = selectedCampaigns.filter((c) => c.status !== newStatus);
      if (campaignsToUpdate.length === 0) {
        toast.info(`All selected campaigns are already ${newStatus}`);
        return;
      }
      toast.success(`${campaignsToUpdate.length} campaign(s) set to ${newStatus}`);
      setSelectedRows({});
    },
    [hasSelection, selectedCampaigns],
  );

  const handleDelete = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select campaigns to delete");
      return;
    }
    toast.success(`${selectedCampaigns.length} campaign(s) deleted`);
    setSelectedRows({});
  }, [hasSelection, selectedCampaigns]);

  const handleRefresh = useCallback(() => {
    toast.success("Campaigns refreshed");
  }, []);

  const variants = shouldReduceMotion ? {} : slideUpVariants;

  const filterTabs: { label: string; value: FilterTab; count: number }[] = [
    { label: "All", value: "all", count: MOCK_CAMPAIGNS.length },
    { label: "Active", value: "active", count: MOCK_CAMPAIGNS.filter((c) => c.status === "active").length },
    { label: "Paused", value: "paused", count: MOCK_CAMPAIGNS.filter((c) => c.status === "paused").length },
    { label: "Pending", value: "pending", count: MOCK_CAMPAIGNS.filter((c) => c.status === "pending").length },
    { label: "Completed", value: "completed", count: MOCK_CAMPAIGNS.filter((c) => c.status === "completed").length },
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
          <p className="text-2xl font-semibold">Campaign Oversight</p>
          <p className="mt-1 text-sm text-gray-500">Monitor and manage all platform campaigns</p>
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
            placeholder="Search by name, status..."
            type="search"
            value={searchTerm}
          />
          <div className="text-sm text-gray-500">
            {filtered.length} campaign{filtered.length !== 1 ? "s" : ""}
            {hasSelection && ` (${selectedCampaigns.length} selected)`}
          </div>
        </motion.div>

        <motion.div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-x-2">
            <Button size="sm" variant="outline" disabled={!hasSelection || selectedCampaigns.length !== 1}>
              <RiEyeLine /> View Details
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleStatusChange("paused")} disabled={!hasSelection}>
              <RiPauseLine /> Pause
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleStatusChange("active")} disabled={!hasSelection}>
              <RiPlayLine /> Activate
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
          </div>
          <DatePicker
            onValueChange={(range) => {
              setDateRange(range);
              setPage(1);
            }}
            type="range"
            value={dateRange}
          />
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
