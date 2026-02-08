"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { AnimatedCounter, AnimatedCurrency } from "@/components/motion";
import { staggerContainerVariants, staggerItemVariants, cardHoverVariants, useReducedMotion } from "@/lib/motion";
import { Card } from "@/components/modules/finance";
import { ScrollArea } from "@/components/shared";

import { MOCK_FINANCES } from "@/__mock__";

const Page = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  const metrics = useMemo(() => {
    const totalBudget = MOCK_FINANCES.reduce((sum, finance) => sum + finance.budget, 0);
    const totalSpent = MOCK_FINANCES.reduce((sum, finance) => sum + finance.spent, 0);
    const totalRemaining = MOCK_FINANCES.reduce((sum, finance) => sum + finance.remaining, 0);
    const currency = MOCK_FINANCES[0]?.currency || "USD";

    const percentageSpent = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : "0";
    const percentageRemaining = totalBudget > 0 ? ((totalRemaining / totalBudget) * 100).toFixed(1) : "0";

    return [
      {
        label: "Total Budget",
        value: totalBudget,
        currency,
        subtitle: `Across ${MOCK_FINANCES.length} campaigns`,
        trend: null,
        type: "currency" as const,
      },
      {
        label: "Total Spent",
        value: totalSpent,
        currency,
        subtitle: `${percentageSpent}% of budget`,
        trend: "up",
        type: "currency" as const,
      },
      {
        label: "Total Remaining",
        value: totalRemaining,
        currency,
        subtitle: `${percentageRemaining}% available`,
        trend: "down",
        type: "currency" as const,
      },
      {
        label: "Active Campaigns",
        value: MOCK_FINANCES.filter((f) => f.status === "active").length,
        subtitle: `${MOCK_FINANCES.filter((f) => f.status === "paused").length} paused`,
        trend: null,
        type: "number" as const,
      },
    ];
  }, []);

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <motion.div
        className="flex w-full items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="text-2xl font-semibold">Budget</p>
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
            whileTap={shouldReduceMotion ? undefined : cardHoverVariants.tap}
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

      <motion.div
        className="w-full space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Campaign Budgets</h2>
          <p className="text-sm text-gray-500">{MOCK_FINANCES.length} total</p>
        </div>
        <motion.div className="space-y-3" initial="hidden" animate="visible" variants={containerVariants}>
          {MOCK_FINANCES.map((finance, index) => (
            <motion.div key={finance.id} variants={itemVariants} custom={index}>
              <Card finance={finance} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
