"use client";

import { useMemo, useState, useCallback } from "react";
import { isWithinInterval } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import {
  RiDeleteBinLine,
  RiEdit2Line,
  RiFileCopy2Line,
  RiPauseLine,
  RiPlayLine,
  RiRefreshLine,
} from "@remixicon/react";

import { AnimatedCounter, AnimatedCurrency } from "@/components/motion";
import { DataTable, DatePicker, Pagination, type DateRange } from "@/components/shared";
import { staggerContainerVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";
import { CreateBudget } from "@/components/modules/finance";
import { columns } from "@/config/columns/finance";
import type { FinanceProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { cn, paginate } from "@/lib";

import { MOCK_FINANCES } from "@/__mock__";

const PAGE_SIZE = 10;

type FilterTab = "all" | "active" | "paused" | "completed";

const Page = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  const filteredBudgets = useMemo(() => {
    let budgets = [...MOCK_FINANCES];

    if (activeTab !== "all") {
      budgets = budgets.filter((budget) => budget.status === activeTab);
    }

    if (query) {
      budgets = budgets.filter(
        (budget) =>
          budget.name.toLowerCase().includes(query.toLowerCase()) ||
          budget.status.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (dateRange.from && dateRange.to) {
      budgets = budgets.filter((budget) => {
        const startDate = new Date(budget.start_date);
        return isWithinInterval(startDate, { start: dateRange.from!, end: dateRange.to! });
      });
    }

    return budgets;
  }, [query, activeTab, dateRange]);

  const paginated = useMemo(() => {
    return paginate(filteredBudgets, page, PAGE_SIZE, filteredBudgets.length);
  }, [filteredBudgets, page]);

  const selectedBudgets = useMemo(() => {
    return Object.entries(selectedRows)
      .filter(([, isSelected]) => isSelected)
      .map(([index]) => paginated[parseInt(index)])
      .filter(Boolean) as FinanceProps[];
  }, [selectedRows, paginated]);

  const hasSelection = selectedBudgets.length > 0;

  const canActivate = useMemo(() => {
    if (!hasSelection) return false;
    return selectedBudgets.some((b) => b.status !== "active");
  }, [hasSelection, selectedBudgets]);

  const canPause = useMemo(() => {
    if (!hasSelection) return false;
    return selectedBudgets.some((b) => b.status === "active");
  }, [hasSelection, selectedBudgets]);

  const handleRowSelectionChange = useCallback((selection: Record<string, boolean>) => {
    setSelectedRows(selection);
  }, []);

  const handleDuplicate = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select budgets to duplicate");
      return;
    }
    toast.success(`${selectedBudgets.length} budget(s) duplicated`);
    setSelectedRows({});
  }, [hasSelection, selectedBudgets.length]);

  const handleDelete = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select budgets to delete");
      return;
    }
    toast.success(`${selectedBudgets.length} budget(s) deleted`);
    setSelectedRows({});
  }, [hasSelection, selectedBudgets.length]);

  const handleStatusChange = useCallback(
    (newStatus: FinanceProps["status"]) => {
      if (!hasSelection) {
        toast.error("Please select budgets");
        return;
      }
      const budgetsToUpdate = selectedBudgets.filter((b) => b.status !== newStatus);

      if (budgetsToUpdate.length === 0) {
        toast.info(`All selected budgets are already ${newStatus}`);
        return;
      }

      const skipped = selectedBudgets.length - budgetsToUpdate.length;
      if (skipped > 0) {
        toast.success(`${budgetsToUpdate.length} budget(s) set to ${newStatus}. ${skipped} already ${newStatus}.`);
      } else {
        toast.success(`${budgetsToUpdate.length} budget(s) set to ${newStatus}`);
      }
      setSelectedRows({});
    },
    [hasSelection, selectedBudgets],
  );

  const handleRefresh = useCallback(() => {
    toast.success("Budgets refreshed");
  }, []);

  const metrics = useMemo(() => {
    const data = filteredBudgets.length > 0 ? filteredBudgets : MOCK_FINANCES;
    const totalBudget = data.reduce((sum, finance) => sum + finance.budget, 0);
    const totalSpent = data.reduce((sum, finance) => sum + finance.spent, 0);
    const totalRemaining = data.reduce((sum, finance) => sum + finance.remaining, 0);
    const currency = data[0]?.currency || "USD";

    const percentageSpent = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : "0";
    const percentageRemaining = totalBudget > 0 ? ((totalRemaining / totalBudget) * 100).toFixed(1) : "0";

    return [
      {
        label: "Total Budget",
        value: totalBudget,
        currency,
        subtitle: `Across ${data.length} budgets`,
        type: "currency" as const,
      },
      {
        label: "Total Spent",
        value: totalSpent,
        currency,
        subtitle: `${percentageSpent}% of budget`,
        type: "currency" as const,
      },
      {
        label: "Total Remaining",
        value: totalRemaining,
        currency,
        subtitle: `${percentageRemaining}% available`,
        type: "currency" as const,
      },
      {
        label: "Active Budgets",
        value: data.filter((f) => f.status === "active").length,
        subtitle: `${data.filter((f) => f.status === "paused").length} paused`,
        type: "number" as const,
      },
    ];
  }, [filteredBudgets]);

  const filterTabs: { label: string; value: FilterTab }[] = [
    { label: "All Budgets", value: "all" },
    { label: "Active", value: "active" },
    { label: "Paused", value: "paused" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <motion.div
      className="h-full w-full space-y-6 overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div className="flex w-full items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Finance</p>
          <p className="mt-1 text-sm text-gray-500">Manage and monitor your campaign budgets</p>
        </div>
      </motion.div>

      <motion.div
        className="grid w-full grid-cols-4 gap-5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {metrics.map((metric, index) => (
          <motion.div
            className="space-y-3 rounded-lg border bg-white p-5 shadow-sm"
            key={index}
            variants={itemVariants}
          >
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{metric.label}</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {metric.type === "currency" ? (
                <AnimatedCurrency value={metric.value} currency={metric.currency} duration={1.5} />
              ) : (
                <AnimatedCounter value={metric.value} duration={1.5} />
              )}
            </p>
            <p className="text-xs text-gray-500">{metric.subtitle}</p>
          </motion.div>
        ))}
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
            <CreateBudget />
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
            {filteredBudgets.length} budget{filteredBudgets.length !== 1 ? "s" : ""}
            {hasSelection && ` (${selectedBudgets.length} selected)`}
          </div>
        </motion.div>
        <motion.div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-x-2">
            <Button size="sm" variant="outline" onClick={handleDuplicate} disabled={!hasSelection}>
              <RiFileCopy2Line /> Duplicate
            </Button>
            <Button
              asChild={hasSelection && selectedBudgets.length === 1}
              size="sm"
              variant="outline"
              disabled={!hasSelection || selectedBudgets.length !== 1}
            >
              {hasSelection && selectedBudgets.length === 1 ? (
                <Link href={`/dashboard/finance/edit?id=${selectedBudgets[0]?.id}`}>
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
        <Pagination current={page} limit={PAGE_SIZE} onPageChange={setPage} total={filteredBudgets.length} />
      </div>
    </motion.div>
  );
};

export default Page;
