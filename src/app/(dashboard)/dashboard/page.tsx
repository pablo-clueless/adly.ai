"use client";

import { RiArrowUpLine } from "@remixicon/react";
import { motion } from "framer-motion";

import { AnimatedCounter } from "@/components/motion";
import { staggerContainerVariants, staggerItemVariants, useReducedMotion, cardHoverVariants } from "@/lib/motion";
import { ScrollArea } from "@/components/shared";
import { cn } from "@/lib";

const metrics = [
  { label: "Impressions", value: 245000, suffix: "", trend: "+12.5%" },
  { label: "Clicks", value: 12500, suffix: "", trend: "+8.2%" },
  { label: "CTR", value: 5.1, suffix: "%", decimals: 1, trend: "+0.3%" },
  { label: "Conversions", value: 2100, suffix: "", trend: "+15.7%" },
];

const Page = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <motion.div
        className="grid w-full grid-cols-4 gap-5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {metrics.map((metric, index) => (
          <motion.div
            className={cn(
              "space-y-4 rounded-md border bg-white p-4 transition-shadow",
              !shouldReduceMotion && "cursor-pointer",
            )}
            key={index}
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : cardHoverVariants.hover}
            whileTap={shouldReduceMotion ? undefined : cardHoverVariants.tap}
          >
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{metric.label}</p>
            </div>
            <p className="text-4xl font-semibold">
              <AnimatedCounter
                value={metric.value}
                suffix={metric.suffix}
                decimals={metric.decimals ?? 0}
                duration={1.5}
                delay={index * 0.1}
              />
            </p>
            <motion.div
              className="flex items-center gap-1 text-sm text-green-500"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <RiArrowUpLine className="size-4" />
              <span>{metric.trend}</span>
              <span className="text-gray-500">from last week</span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid w-full grid-cols-6 gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="col-span-4 space-y-4 rounded-xl border bg-white p-4"
          whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <div>
            <p className="font-medium">Ad Performance</p>
            <p className="text-sm text-gray-600">Last 7 days</p>
          </div>
          <div className="flex h-[200px] items-center justify-center text-gray-400">Chart will be displayed here</div>
        </motion.div>

        <motion.div
          className="col-span-2 space-y-4 rounded-xl border bg-white p-4"
          whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <div>
            <p className="font-medium">Campaign Distribution</p>
            <p className="text-sm text-gray-600">By Impression</p>
          </div>
          <div className="flex h-[200px] items-center justify-center text-gray-400">Chart will be displayed here</div>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full space-y-4 rounded-xl border bg-white p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
      >
        <div>
          <p className="font-medium">Recent Campaigns</p>
          <p className="text-sm text-gray-600">Your latest ad campaigns</p>
        </div>
        <div className="flex h-[100px] items-center justify-center text-gray-400">
          Campaign list will be displayed here
        </div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
