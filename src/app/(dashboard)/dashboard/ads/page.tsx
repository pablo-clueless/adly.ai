"use client";

import { useMemo, useState, useCallback } from "react";
import { isWithinInterval } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import {
  RiDeleteBinLine,
  RiEdit2Line,
  RiEyeLine,
  RiEyeOffLine,
  RiFileCopy2Line,
  RiRefreshLine,
} from "@remixicon/react";

import { DataTable, DatePicker, Pagination, type DateRange } from "@/components/shared";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";
import type { AdProps, AdStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { columns } from "@/config/columns/ad";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { cn, paginate } from "@/lib";

import { MOCK_ADS } from "@/__mock__";

const PAGE_SIZE = 10;

const Page = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<AdStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const filtered = useMemo(() => {
    let ads = MOCK_ADS;

    if (activeTab !== "all") {
      ads = ads.filter((ad) => ad.status === activeTab);
    }

    if (query) {
      ads = ads.filter((ad) => ad.title.toLowerCase().includes(query.toLowerCase()));
    }

    if (dateRange.from && dateRange.to) {
      ads = ads.filter((ad) => {
        const publishedDate = new Date(ad.published_at);
        return isWithinInterval(publishedDate, { start: dateRange.from!, end: dateRange.to! });
      });
    }

    return ads;
  }, [activeTab, dateRange, query]);

  const paginated = useMemo(() => {
    return paginate(filtered, page, PAGE_SIZE, filtered.length);
  }, [filtered, page]);

  const selectedAds = useMemo(() => {
    return Object.entries(selectedRows)
      .filter(([, isSelected]) => isSelected)
      .map(([index]) => paginated[parseInt(index)])
      .filter(Boolean) as AdProps[];
  }, [selectedRows, paginated]);

  const hasSelection = selectedAds.length > 0;

  const canPublish = useMemo(() => {
    if (!hasSelection) return false;
    return selectedAds.some((ad) => ad.status !== "published");
  }, [hasSelection, selectedAds]);

  const canUnpublish = useMemo(() => {
    if (!hasSelection) return false;
    return selectedAds.some((ad) => ad.status === "published");
  }, [hasSelection, selectedAds]);

  const handleRowSelectionChange = useCallback((selection: Record<string, boolean>) => {
    setSelectedRows(selection);
  }, []);

  const handleDuplicate = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select ads to duplicate");
      return;
    }
    toast.success(`${selectedAds.length} ad(s) duplicated`);
    setSelectedRows({});
  }, [hasSelection, selectedAds.length]);

  const handleDelete = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select ads to delete");
      return;
    }
    toast.success(`${selectedAds.length} ad(s) deleted`);
    setSelectedRows({});
  }, [hasSelection, selectedAds.length]);

  const handleStatusChange = useCallback(
    (newStatus: AdStatus) => {
      if (!hasSelection) {
        toast.error("Please select ads");
        return;
      }
      const adsToUpdate = selectedAds.filter((ad) => ad.status !== newStatus);

      if (adsToUpdate.length === 0) {
        toast.info(`All selected ads are already ${newStatus}`);
        return;
      }

      const skipped = selectedAds.length - adsToUpdate.length;
      if (skipped > 0) {
        toast.success(`${adsToUpdate.length} ad(s) set to ${newStatus}. ${skipped} already ${newStatus}.`);
      } else {
        toast.success(`${adsToUpdate.length} ad(s) set to ${newStatus}`);
      }
      setSelectedRows({});
    },
    [hasSelection, selectedAds],
  );

  const handleRefresh = useCallback(() => {
    toast.success("Ads refreshed");
  }, []);

  const variants = shouldReduceMotion ? {} : slideUpVariants;

  const filterTabs: { label: string; value: AdStatus }[] = [
    { label: "All Ads", value: "all" },
    { label: "Published", value: "published" },
    { label: "Scheduled", value: "scheduled" },
    { label: "Drafts", value: "draft" },
    { label: "Expiring", value: "expiring" },
    { label: "Expired", value: "expired" },
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
          <p className="text-2xl font-semibold">Ads</p>
          <p className="mt-1 text-sm text-gray-500">Create and manage your ad campaigns</p>
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
            <Button asChild size="sm">
              <Link href="/dashboard/ads/new">Create Ad</Link>
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
            placeholder="Search by title, status..."
            type="search"
            value={searchTerm}
          />
          <div className="text-sm text-gray-500">
            {filtered.length} ad{filtered.length !== 1 ? "s" : ""}
            {hasSelection && ` (${selectedAds.length} selected)`}
          </div>
        </motion.div>
        <motion.div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-x-2">
            <Button size="sm" variant="outline" onClick={handleDuplicate} disabled={!hasSelection}>
              <RiFileCopy2Line /> Duplicate
            </Button>
            <Button
              asChild={hasSelection && selectedAds.length === 1}
              size="sm"
              variant="outline"
              disabled={!hasSelection || selectedAds.length !== 1}
            >
              {hasSelection && selectedAds.length === 1 ? (
                <Link href={`/dashboard/ads/edit?id=${selectedAds[0]?.id}`}>
                  <RiEdit2Line /> Edit
                </Link>
              ) : (
                <>
                  <RiEdit2Line /> Edit
                </>
              )}
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleStatusChange("published")} disabled={!canPublish}>
              <RiEyeLine /> Publish
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleStatusChange("draft")} disabled={!canUnpublish}>
              <RiEyeOffLine /> Unpublish
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
