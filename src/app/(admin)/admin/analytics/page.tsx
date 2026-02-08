"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiUserLine,
  RiMegaphoneLine,
  RiMoneyDollarCircleLine,
  RiEyeLine,
  RiMouseLine,
  RiPercentLine,
} from "@remixicon/react";

import { staggerContainerVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";
import { MOCK_PLATFORM_METRICS, MOCK_CAMPAIGNS, MOCK_ADMIN_USERS } from "@/__mock__";
import { ScrollArea } from "@/components/shared";
import { cn, formatCurrency } from "@/lib";

const Page = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  const totalClicks = MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.clicks, 0);
  const totalImpressions = MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.impressions, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;

  const metrics = [
    {
      label: "Total Users",
      value: MOCK_PLATFORM_METRICS.total_users.toLocaleString(),
      icon: RiUserLine,
      trend: "+12.5%",
      trendUp: true,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Total Campaigns",
      value: MOCK_PLATFORM_METRICS.total_campaigns.toLocaleString(),
      icon: RiMegaphoneLine,
      trend: "+8.2%",
      trendUp: true,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(MOCK_PLATFORM_METRICS.total_revenue),
      icon: RiMoneyDollarCircleLine,
      trend: "+15.7%",
      trendUp: true,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Total Impressions",
      value: (totalImpressions / 1000000).toFixed(1) + "M",
      icon: RiEyeLine,
      trend: "+22.3%",
      trendUp: true,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "Total Clicks",
      value: (totalClicks / 1000).toFixed(1) + "K",
      icon: RiMouseLine,
      trend: "+18.9%",
      trendUp: true,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
    {
      label: "Avg. CTR",
      value: avgCTR + "%",
      icon: RiPercentLine,
      trend: "-0.3%",
      trendUp: false,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
  ];

  const topCampaigns = [...MOCK_CAMPAIGNS].sort((a, b) => b.impressions - a.impressions).slice(0, 5);
  const topUsers = [...MOCK_ADMIN_USERS].sort((a, b) => b.total_spend - a.total_spend).slice(0, 5);

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-semibold">Platform Analytics</h1>
          <p className="text-sm text-gray-500">Comprehensive platform performance metrics and insights</p>
        </motion.div>

        <motion.div className="grid w-full grid-cols-6 gap-4" variants={containerVariants}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div className="space-y-3 rounded-lg border bg-white p-4" key={index} variants={itemVariants}>
                <div className="flex items-center justify-between">
                  <span className={cn("rounded-lg p-2", metric.bgColor)}>
                    <Icon className={cn("size-4", metric.color)} />
                  </span>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs",
                      metric.trendUp ? "text-green-500" : "text-red-500",
                    )}
                  >
                    {metric.trendUp ? <RiArrowUpLine className="size-3" /> : <RiArrowDownLine className="size-3" />}
                    {metric.trend}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className="grid w-full grid-cols-2 gap-5" variants={containerVariants}>
          <motion.div className="space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
            <div>
              <p className="font-medium">Revenue Over Time</p>
              <p className="text-sm text-gray-600">Monthly revenue trend</p>
            </div>
            <div className="flex h-[250px] items-center justify-center text-gray-400">
              Revenue chart will be displayed here
            </div>
          </motion.div>

          <motion.div className="space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
            <div>
              <p className="font-medium">User Growth</p>
              <p className="text-sm text-gray-600">New user registrations</p>
            </div>
            <div className="flex h-[250px] items-center justify-center text-gray-400">
              User growth chart will be displayed here
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="grid w-full grid-cols-2 gap-5" variants={containerVariants}>
          <motion.div className="space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
            <div>
              <p className="font-medium">Top Performing Campaigns</p>
              <p className="text-sm text-gray-600">By impressions</p>
            </div>
            <div className="divide-y">
              {topCampaigns.map((campaign, index) => (
                <div key={campaign.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium capitalize">{campaign.name}</p>
                      <p className="text-xs text-gray-500">{campaign.clicks.toLocaleString()} clicks</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{(campaign.impressions / 1000000).toFixed(2)}M</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
            <div>
              <p className="font-medium">Top Spending Users</p>
              <p className="text-sm text-gray-600">By total spend</p>
            </div>
            <div className="divide-y">
              {topUsers.map((user, index) => (
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
                        <p className="text-xs text-gray-500">{user.total_campaigns} campaigns</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(user.total_spend)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="w-full space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
          <div>
            <p className="font-medium">Campaign Performance Distribution</p>
            <p className="text-sm text-gray-600">By status and performance metrics</p>
          </div>
          <div className="flex h-[200px] items-center justify-center text-gray-400">
            Distribution chart will be displayed here
          </div>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
