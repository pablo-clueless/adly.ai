"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import type { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { staggerContainerVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";
import { DataTable, ScrollArea } from "@/components/shared";

const columns: ColumnDef<unknown>[] = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "impressions", header: "Impressions" },
  { accessorKey: "clicks", header: "Clicks" },
  { accessorKey: "clickThroughRate", header: "CTR" },
  { accessorKey: "conversions", header: "Conversions" },
  { accessorKey: "costPerClick", header: "CPC" },
];

const Page = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  const dailyPerformanceConfig: ChartConfig = {
    impressions: { label: "Impressions", color: "" },
    date: { label: "Date", color: "" },
  };
  const ctrCpcConfig: ChartConfig = {
    cpc: { label: "CPC", color: "" },
    ctr: { label: "CTR", color: "" },
    date: { label: "Date", color: "" },
  };
  const conversionConfig: ChartConfig = {
    rate: { label: "Conversion Rate", color: "" },
    date: { label: "Date", color: "" },
  };

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <motion.div
        className="flex w-full items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="text-2xl font-semibold">Analytics</p>
          <p className="mt-1 text-sm text-gray-500">Track and analyze your campaign performance</p>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-1" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div
          className="space-y-4 rounded-md border bg-white p-4"
          variants={itemVariants}
          whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <div>
            <p className="font-medium">Daily Performance</p>
            <p className="text-sm text-gray-600">Impressions, Clicks and CTR Trends</p>
          </div>
          <div className="w-full">
            <ChartContainer className="h-[300px] w-full" config={dailyPerformanceConfig}>
              <LineChart accessibilityLayer data={[]} margin={{ left: 12, right: 12 }}>
                <CartesianGrid />
                <Line dataKey="impressions" type="natural" strokeWidth={2} activeDot={{ r: 8 }} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
              </LineChart>
            </ChartContainer>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-5" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div
          className="space-y-4 rounded-md border bg-white p-4"
          variants={itemVariants}
          whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <div>
            <p className="font-medium">CTR & Cost Per Click</p>
            <p className="text-sm text-gray-600">Daily Metrics</p>
          </div>
          <div className="w-full">
            <ChartContainer className="h-[300px] w-full" config={ctrCpcConfig}>
              <LineChart accessibilityLayer data={[]} margin={{ left: 12, right: 12 }}>
                <CartesianGrid />
                <Line dataKey="cpc" type="natural" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line dataKey="ctr" type="natural" strokeWidth={2} activeDot={{ r: 8 }} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
              </LineChart>
            </ChartContainer>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4 rounded-md border bg-white p-4"
          variants={itemVariants}
          whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <div>
            <p className="font-medium">Conversion Rate & ROI</p>
            <p className="text-sm text-gray-600">Trend Analysis</p>
          </div>
          <div className="w-full">
            <ChartContainer className="h-[300px] w-full" config={conversionConfig}>
              <LineChart accessibilityLayer data={[]} margin={{ left: 12, right: 12 }}>
                <CartesianGrid />
                <Line dataKey="rate" type="natural" strokeWidth={2} activeDot={{ r: 8 }} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
              </LineChart>
            </ChartContainer>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="space-y-4 rounded-md border bg-white p-4"
          whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <div>
            <p className="font-medium">Performance Table</p>
            <p className="text-sm text-gray-600">Daily Breakdown</p>
          </div>
          <div className="">
            <DataTable columns={columns} data={[]} />
          </div>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
