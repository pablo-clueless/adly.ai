"use client";

import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiUserLine,
  RiMegaphoneLine,
  RiMoneyDollarCircleLine,
  RiEyeLine,
  RiAlertLine,
  RiShieldCheckLine,
} from "@remixicon/react";
import { motion } from "framer-motion";

import { staggerContainerVariants, staggerItemVariants, useReducedMotion, cardHoverVariants } from "@/lib/motion";
import { MOCK_PLATFORM_METRICS, MOCK_ACTIVITY_LOGS, MOCK_SYSTEM_ALERTS } from "@/__mock__";
import { AnimatedCounter } from "@/components/motion";
import { ScrollArea } from "@/components/shared";
import { formatDistanceToNow } from "date-fns";
import { cn, formatCurrency } from "@/lib";

const metrics = [
  {
    label: "Total Users",
    value: MOCK_PLATFORM_METRICS.total_users,
    icon: RiUserLine,
    trend: "+12.5%",
    trendUp: true,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    label: "Active Campaigns",
    value: MOCK_PLATFORM_METRICS.active_campaigns,
    icon: RiMegaphoneLine,
    trend: "+8.2%",
    trendUp: true,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    label: "Monthly Revenue",
    value: MOCK_PLATFORM_METRICS.monthly_revenue,
    icon: RiMoneyDollarCircleLine,
    trend: "+15.7%",
    trendUp: true,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    isCurrency: true,
  },
  {
    label: "Total Impressions",
    value: MOCK_PLATFORM_METRICS.total_impressions,
    icon: RiEyeLine,
    trend: "-2.3%",
    trendUp: false,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
];

const quickStats = [
  { label: "Active Users", value: MOCK_PLATFORM_METRICS.active_users },
  { label: "Total Campaigns", value: MOCK_PLATFORM_METRICS.total_campaigns },
  { label: "Total Revenue", value: MOCK_PLATFORM_METRICS.total_revenue, isCurrency: true },
  { label: "Pending Moderation", value: MOCK_PLATFORM_METRICS.pending_moderation },
];

const Page = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  const recentActivities = MOCK_ACTIVITY_LOGS.slice(0, 5);
  const activeAlerts = MOCK_SYSTEM_ALERTS.filter((a) => a.status === "active").slice(0, 5);

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here&apos;s what&apos;s happening on your platform.</p>
        </motion.div>

        <motion.div className="grid w-full grid-cols-4 gap-5" variants={containerVariants}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                className={cn(
                  "hover:border-primary-400 space-y-4 rounded-md border bg-white p-4 transition-all duration-500",
                  !shouldReduceMotion && "cursor-pointer",
                )}
                key={index}
                variants={itemVariants}
                whileTap={shouldReduceMotion ? undefined : cardHoverVariants.tap}
              >
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <span className={cn("rounded-lg p-2", metric.bgColor)}>
                    <Icon className={cn("size-5", metric.color)} />
                  </span>
                </div>
                <p className="text-3xl font-semibold">
                  {metric.isCurrency ? (
                    formatCurrency(metric.value)
                  ) : (
                    <AnimatedCounter value={metric.value} duration={1.5} delay={index * 0.1} />
                  )}
                </p>
                <motion.div
                  className={cn("flex items-center gap-1 text-sm", metric.trendUp ? "text-green-500" : "text-red-500")}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {metric.trendUp ? <RiArrowUpLine className="size-4" /> : <RiArrowDownLine className="size-4" />}
                  <span>{metric.trend}</span>
                  <span className="text-gray-500">from last month</span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className="grid grid-cols-4 gap-4" variants={itemVariants}>
          {quickStats.map((stat, index) => (
            <div key={index} className="rounded-lg border bg-white p-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-1 text-xl font-semibold">
                {stat.isCurrency ? formatCurrency(stat.value) : stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div className="grid w-full grid-cols-2 gap-5" variants={containerVariants}>
          <motion.div className="space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Recent Activity</p>
                <p className="text-sm text-gray-600">Latest platform activities</p>
              </div>
            </div>
            <div className="divide-y">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-gray-100 p-2">
                      <RiUserLine className="size-4 text-gray-600" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{activity.user_name}</p>
                      <p className="text-xs text-gray-500">
                        <span className="capitalize">{activity.action}</span> {activity.resource_type}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Active Alerts</p>
                <p className="text-sm text-gray-600">System alerts requiring attention</p>
              </div>
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                {activeAlerts.length} Active
              </span>
            </div>
            <div className="divide-y">
              {activeAlerts.length > 0 ? (
                activeAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "rounded-full p-2",
                          alert.severity === "critical"
                            ? "bg-red-100"
                            : alert.severity === "error"
                              ? "bg-orange-100"
                              : alert.severity === "warning"
                                ? "bg-yellow-100"
                                : "bg-blue-100",
                        )}
                      >
                        <RiAlertLine
                          className={cn(
                            "size-4",
                            alert.severity === "critical"
                              ? "text-red-600"
                              : alert.severity === "error"
                                ? "text-orange-600"
                                : alert.severity === "warning"
                                  ? "text-yellow-600"
                                  : "text-blue-600",
                          )}
                        />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{alert.title}</p>
                        <p className="text-xs text-gray-500">{alert.source}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <RiShieldCheckLine className="size-10 text-green-500" />
                  <p className="mt-2 font-medium text-green-600">All systems operational</p>
                  <p className="text-sm text-gray-500">No active alerts at this time</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="w-full space-y-4 rounded-xl border bg-white p-4" variants={itemVariants}>
          <div>
            <p className="font-medium">Platform Performance</p>
            <p className="text-sm text-gray-600">Last 30 days overview</p>
          </div>
          <div className="flex h-[200px] items-center justify-center text-gray-400">
            Performance chart will be displayed here
          </div>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
