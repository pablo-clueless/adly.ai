"use client";

import { useMemo, useState, useCallback } from "react";
import { isWithinInterval } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import {
  RiArchiveLine,
  RiDeleteBinLine,
  RiEdit2Line,
  RiFileCopy2Line,
  RiPauseLine,
  RiPlayLine,
  RiRefreshLine,
} from "@remixicon/react";

import { DataTable, DatePicker, Pagination, type DateRange } from "@/components/shared";
import { CreateAudience } from "@/components/modules/audience";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";
import { columns } from "@/config/columns/audience";
import type { AudienceProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { cn, paginate } from "@/lib";

import { MOCK_AUDIENCES } from "@/__mock__";

const PAGE_SIZE = 10;

type FilterTab = "all" | "active" | "paused" | "archived";

const Page = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const filteredAudiences = useMemo(() => {
    let audiences = [...MOCK_AUDIENCES];

    if (activeTab !== "all") {
      audiences = audiences.filter((audience) => audience.status === activeTab);
    }

    if (query) {
      audiences = audiences.filter(
        (audience) =>
          audience.name.toLowerCase().includes(query.toLowerCase()) ||
          audience.description?.toLowerCase().includes(query.toLowerCase()) ||
          audience.status.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (dateRange.from && dateRange.to) {
      audiences = audiences.filter((audience) => {
        const createdDate = new Date(audience.created_at);
        return isWithinInterval(createdDate, { start: dateRange.from!, end: dateRange.to! });
      });
    }

    return audiences;
  }, [query, activeTab, dateRange]);

  const paginated = useMemo(() => {
    return paginate(filteredAudiences, page, PAGE_SIZE, filteredAudiences.length);
  }, [filteredAudiences, page]);

  const selectedAudiences = useMemo(() => {
    return Object.entries(selectedRows)
      .filter(([, isSelected]) => isSelected)
      .map(([index]) => paginated[parseInt(index)])
      .filter(Boolean) as AudienceProps[];
  }, [selectedRows, paginated]);

  const hasSelection = selectedAudiences.length > 0;

  const canActivate = useMemo(() => {
    if (!hasSelection) return false;
    return selectedAudiences.some((a) => a.status !== "active");
  }, [hasSelection, selectedAudiences]);

  const canPause = useMemo(() => {
    if (!hasSelection) return false;
    return selectedAudiences.some((a) => a.status === "active");
  }, [hasSelection, selectedAudiences]);

  const canArchive = useMemo(() => {
    if (!hasSelection) return false;
    return selectedAudiences.some((a) => a.status !== "archived");
  }, [hasSelection, selectedAudiences]);

  const handleRowSelectionChange = useCallback((selection: Record<string, boolean>) => {
    setSelectedRows(selection);
  }, []);

  const handleDuplicate = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select audiences to duplicate");
      return;
    }
    toast.success(`${selectedAudiences.length} audience(s) duplicated`);
    setSelectedRows({});
  }, [hasSelection, selectedAudiences.length]);

  const handleDelete = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select audiences to delete");
      return;
    }
    toast.success(`${selectedAudiences.length} audience(s) deleted`);
    setSelectedRows({});
  }, [hasSelection, selectedAudiences.length]);

  const handleStatusChange = useCallback(
    (newStatus: AudienceProps["status"]) => {
      if (!hasSelection) {
        toast.error("Please select audiences");
        return;
      }
      const audiencesToUpdate = selectedAudiences.filter((a) => a.status !== newStatus);

      if (audiencesToUpdate.length === 0) {
        toast.info(`All selected audiences are already ${newStatus}`);
        return;
      }

      const skipped = selectedAudiences.length - audiencesToUpdate.length;
      if (skipped > 0) {
        toast.success(`${audiencesToUpdate.length} audience(s) set to ${newStatus}. ${skipped} already ${newStatus}.`);
      } else {
        toast.success(`${audiencesToUpdate.length} audience(s) set to ${newStatus}`);
      }
      setSelectedRows({});
    },
    [hasSelection, selectedAudiences],
  );

  const handleRefresh = useCallback(() => {
    toast.success("Audiences refreshed");
  }, []);

  const variants = shouldReduceMotion ? {} : slideUpVariants;

  const filterTabs: { label: string; value: FilterTab }[] = [
    { label: "All Audiences", value: "all" },
    { label: "Active", value: "active" },
    { label: "Paused", value: "paused" },
    { label: "Archived", value: "archived" },
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
          <p className="text-2xl font-semibold">Audiences</p>
          <p className="mt-1 text-sm text-gray-500">Create, manage, and analyze your audience segments</p>
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
            <CreateAudience />
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
            placeholder="Search by name, description..."
            type="search"
            value={searchTerm}
          />
          <div className="text-sm text-gray-500">
            {filteredAudiences.length} audience{filteredAudiences.length !== 1 ? "s" : ""}
            {hasSelection && ` (${selectedAudiences.length} selected)`}
          </div>
        </motion.div>
        <motion.div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-x-2">
            <Button size="sm" variant="outline" onClick={handleDuplicate} disabled={!hasSelection}>
              <RiFileCopy2Line /> Duplicate
            </Button>
            <Button
              asChild={hasSelection && selectedAudiences.length === 1}
              size="sm"
              variant="outline"
              disabled={!hasSelection || selectedAudiences.length !== 1}
            >
              {hasSelection && selectedAudiences.length === 1 ? (
                <Link href={`/dashboard/audiences/edit?id=${selectedAudiences[0]?.id}`}>
                  <RiEdit2Line /> Edit
                </Link>
              ) : (
                <>
                  <RiEdit2Line /> Edit
                </>
              )}
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleStatusChange("active")} disabled={!canActivate}>
              <RiPlayLine /> Activate
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleStatusChange("paused")} disabled={!canPause}>
              <RiPauseLine /> Pause
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleStatusChange("archived")} disabled={!canArchive}>
              <RiArchiveLine /> Archive
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
        <Pagination current={page} limit={PAGE_SIZE} onPageChange={setPage} total={filteredAudiences.length} />
      </div>
    </motion.div>
  );
};

export default Page;
