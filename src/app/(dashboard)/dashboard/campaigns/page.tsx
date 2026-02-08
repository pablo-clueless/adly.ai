"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  RiEdit2Line,
  RiExportLine,
  RiFileCopy2Line,
  RiFlaskLine,
  RiFunctionAddLine,
  RiRefreshLine,
} from "@remixicon/react";

import { DataTable, DatePicker, Pagination, type DateRange } from "@/components/shared";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";
import { columns } from "@/config/columns/campaign";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { paginate } from "@/lib";

import { MOCK_CAMPAIGNS } from "@/__mock__";

const PAGE_SIZE = 10;

const Page = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const paginated = useMemo(() => {
    if (!query) return paginate(MOCK_CAMPAIGNS, page, PAGE_SIZE, MOCK_CAMPAIGNS.length);
    const filtered = MOCK_CAMPAIGNS.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(query.toLowerCase()) ||
        campaign.status.toLowerCase().includes(query.toLowerCase()),
    );
    return paginate(filtered, page, PAGE_SIZE, filtered.length);
  }, [query, page]);

  const variants = shouldReduceMotion ? {} : slideUpVariants;

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
          <p className="text-2xl font-semibold">Campaigns</p>
          <p className="mt-1 text-sm text-gray-500">Manage and monitor your campaigns here</p>
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
            className="flex items-center gap-x-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button size="sm" variant="outline">
              All Ads
            </Button>
            <Button size="sm" variant="outline">
              Had Delivery
            </Button>
            <Button size="sm" variant="outline">
              Active Ads
            </Button>
          </motion.div>
          <motion.div
            className="flex items-center gap-x-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild size="sm">
              <Link href="/dashboard/campaigns/new">Create Campaign</Link>
            </Button>
            <Button size="sm">
              <RiRefreshLine /> Update
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
        <motion.div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-x-4">
            <Button size="sm" variant="outline">
              <RiFileCopy2Line /> Duplicate
            </Button>
            <Button size="sm" variant="outline">
              <RiEdit2Line /> Edit
            </Button>
            <Button size="sm" variant="outline">
              <RiFlaskLine /> A/B Test
            </Button>
            <Button size="sm" variant="outline">
              <RiFunctionAddLine /> Create Rule
            </Button>
            <Button size="sm" variant="outline">
              <RiExportLine /> Export
            </Button>
          </div>
          <DatePicker onValueChange={setDateRange} type="range" value={dateRange} />
        </motion.div>
      </div>
      <div className="w-full space-y-6">
        <DataTable columns={columns} data={paginated} />
        <Pagination current={page} limit={PAGE_SIZE} onPageChange={setPage} total={MOCK_CAMPAIGNS.length} />
      </div>
    </motion.div>
  );
};

export default Page;
