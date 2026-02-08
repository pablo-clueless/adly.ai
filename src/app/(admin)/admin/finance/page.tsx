"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiMoneyDollarCircleLine,
  RiBankCardLine,
  RiExchangeDollarLine,
  RiWalletLine,
  RiDownloadLine,
} from "@remixicon/react";

import { staggerContainerVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";
import { MOCK_PLATFORM_METRICS, MOCK_ADMIN_USERS, MOCK_FINANCES } from "@/__mock__";
import { ScrollArea } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib";
import { formatDistanceToNow } from "date-fns";

const Page = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  const totalSpend = MOCK_ADMIN_USERS.reduce((sum, u) => sum + u.total_spend, 0);
  const avgSpendPerUser = totalSpend / MOCK_ADMIN_USERS.length;

  const metrics = [
    {
      label: "Total Revenue",
      value: formatCurrency(MOCK_PLATFORM_METRICS.total_revenue),
      icon: RiMoneyDollarCircleLine,
      trend: "+15.7%",
      trendUp: true,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Monthly Revenue",
      value: formatCurrency(MOCK_PLATFORM_METRICS.monthly_revenue),
      icon: RiExchangeDollarLine,
      trend: "+8.2%",
      trendUp: true,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Total User Spend",
      value: formatCurrency(totalSpend),
      icon: RiBankCardLine,
      trend: "+12.3%",
      trendUp: true,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Avg. Spend per User",
      value: formatCurrency(avgSpendPerUser),
      icon: RiWalletLine,
      trend: "-2.1%",
      trendUp: false,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  const recentTransactions = MOCK_FINANCES.slice(0, 8);
  const topSpenders = [...MOCK_ADMIN_USERS].sort((a, b) => b.total_spend - a.total_spend).slice(0, 5);

  const handleExport = () => {
    toast.success("Exporting financial report...");
  };

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
        <motion.div className="flex items-center justify-between" variants={itemVariants}>
          <div>
            <h1 className="text-2xl font-semibold">Financial Overview</h1>
            <p className="text-sm text-gray-500">Platform revenue and financial metrics</p>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <RiDownloadLine /> Export Report
          </Button>
        </motion.div>

        <motion.div className="grid w-full grid-cols-4 gap-5" variants={containerVariants}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div className="space-y-4 rounded-lg border bg-white p-4" key={index} variants={itemVariants}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <span className={cn("rounded-lg p-2", metric.bgColor)}>
                    <Icon className={cn("size-5", metric.color)} />
                  </span>
                </div>
                <p className="text-3xl font-semibold">{metric.value}</p>
                <div
                  className={cn("flex items-center gap-1 text-sm", metric.trendUp ? "text-green-500" : "text-red-500")}
                >
                  {metric.trendUp ? <RiArrowUpLine className="size-4" /> : <RiArrowDownLine className="size-4" />}
                  <span>{metric.trend}</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className="grid w-full grid-cols-3 gap-5" variants={containerVariants}>
          <motion.div className="col-span-2 space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
            <div>
              <p className="font-medium">Revenue Trend</p>
              <p className="text-sm text-gray-600">Last 12 months</p>
            </div>
            <div className="flex h-[300px] items-center justify-center text-gray-400">
              Revenue trend chart will be displayed here
            </div>
          </motion.div>

          <motion.div className="space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
            <div>
              <p className="font-medium">Top Spenders</p>
              <p className="text-sm text-gray-600">By total spend</p>
            </div>
            <div className="divide-y">
              {topSpenders.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="relative size-8">
                        <Image
                          alt={user.full_name}
                          className="size-8 rounded-full"
                          fill
                          sizes="100%"
                          src={user.profile.avatar_url}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.full_name}</p>
                        <p className="text-xs text-gray-500">{user.profile.company_name}</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{formatCurrency(user.total_spend)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="w-full space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Recent Budgets & Transactions</p>
              <p className="text-sm text-gray-600">Latest financial activities</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="pb-3 font-medium">Budget Name</th>
                  <th className="pb-3 font-medium">Total Budget</th>
                  <th className="pb-3 font-medium">Spent</th>
                  <th className="pb-3 font-medium">Remaining</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Period</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="text-sm">
                    <td className="py-3 font-medium capitalize">{transaction.name}</td>
                    <td className="py-3">{formatCurrency(transaction.budget)}</td>
                    <td className="py-3 text-red-600">{formatCurrency(transaction.spent)}</td>
                    <td className="py-3 text-green-600">{formatCurrency(transaction.remaining)}</td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-xs font-medium capitalize",
                          transaction.status === "active"
                            ? "bg-green-100 text-green-700"
                            : transaction.status === "paused"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700",
                        )}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">
                      {formatDistanceToNow(new Date(transaction.start_date), { addSuffix: true })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
