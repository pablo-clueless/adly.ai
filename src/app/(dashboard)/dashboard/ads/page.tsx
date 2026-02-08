"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { DataTable, DatePicker, Pagination, type DateRange } from "@/components/shared";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { columns } from "@/config/columns/ad";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { cn, paginate } from "@/lib";

import { MOCK_ADS } from "@/__mock__";
import type { AdProps } from "@/types";

const PAGE_SIZE = 10;
const tabs = ["published", "scheduled", "drafts", "expiring", "expired"];

const Page = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const paginated = useMemo(() => {
    let filtered: AdProps[] = [];
    if (currentTab) {
      filtered = MOCK_ADS.filter((ad) => ad.status === currentTab);
      if (query) {
        filtered = filtered.filter((ad) => ad.title.includes(query));
      }
    }
    return paginate(filtered, page, PAGE_SIZE, filtered.length);
  }, [currentTab, page, query]);

  const variants = shouldReduceMotion ? {} : slideUpVariants;

  return (
    <motion.div className="w-full space-y-6" initial="hidden" animate="visible" variants={variants}>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button asChild size="sm">
            <Link href="/dashboard/ads/new">Create Ad</Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div className="flex w-full items-center justify-between">
        <Input
          wrapperClassName="w-full sm:w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, ID..."
          type="search"
          value={searchTerm}
        />
      </motion.div>
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-x-4">
          {tabs.map((tab) => (
            <button
              className={cn(
                "flex h-8 items-center rounded-md border px-3 text-sm font-medium capitalize transition-all duration-500",
                currentTab === tab ? "bg-primary-400 border-primary-400 text-white" : "bg-transparent text-gray-600",
              )}
              key={tab}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <DatePicker onValueChange={setDateRange} type="range" value={dateRange} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <DataTable columns={columns} data={paginated} />
        <Pagination current={page} limit={PAGE_SIZE} onPageChange={setPage} total={paginated.length} />
      </motion.div>
    </motion.div>
  );
};

export default Page;
