"use client";

import { motion } from "framer-motion";

import { CreateAudience } from "@/components/modules/audience";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";

const Page = () => {
  const shouldReduceMotion = useReducedMotion();
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
          <p className="text-2xl font-semibold">Audiences</p>
          <p className="mt-1 text-sm text-gray-500">Create, manage, and analyze your audience segments</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CreateAudience />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex h-[300px] items-center justify-center rounded-lg border border-dashed text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Audience segments will be displayed here
      </motion.div>
    </motion.div>
  );
};

export default Page;
