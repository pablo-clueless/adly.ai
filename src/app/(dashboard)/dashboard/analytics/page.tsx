"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import type { ColumnDef } from "@tanstack/react-table";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { DataTable, ScrollArea } from "@/components/shared";

const columns: ColumnDef<unknown>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "clickThroughRate",
    header: "CTR",
  },
  {
    accessorKey: "conversions",
    header: "Conversions",
  },
  {
    accessorKey: "costPerClick",
    header: "CPC",
  },
];

const Page = () => {
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
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Analytics</p>
          <p className="mt-1 text-sm text-gray-500">Track and analyze your campaign performance</p>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="space-y-4 rounded-md border p-4">
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
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-4 rounded-md border p-4">
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
        </div>
        <div className="space-y-4 rounded-md border p-4">
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
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="space-y-4 rounded-md border p-4">
          <div>
            <p className="font-medium">Performance Table</p>
            <p className="text-sm text-gray-600">Daily Breakdown</p>
          </div>
          <div className="">
            <DataTable columns={columns} data={[]} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Page;
