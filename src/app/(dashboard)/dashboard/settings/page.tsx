"use client";

import { motion } from "framer-motion";

import { slideUpVariants, staggerContainerVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";

const settingsSections = [
  {
    title: "Profile",
    description: "Manage your personal information and preferences",
  },
  {
    title: "Notifications",
    description: "Configure how you receive alerts and updates",
  },
  {
    title: "Security",
    description: "Manage your password and security settings",
  },
  {
    title: "Billing",
    description: "View and manage your subscription and payments",
  },
];

const Page = () => {
  const shouldReduceMotion = useReducedMotion();
  const pageVariants = shouldReduceMotion ? {} : slideUpVariants;
  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  return (
    <motion.div className="w-full space-y-6" initial="hidden" animate="visible" variants={pageVariants}>
      <motion.div
        className="flex w-full items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <p className="text-2xl font-semibold">Settings</p>
          <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-4" initial="hidden" animate="visible" variants={containerVariants}>
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            className="cursor-pointer space-y-2 rounded-lg border bg-white p-6 transition-shadow hover:shadow-md"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            custom={index}
          >
            <p className="font-medium">{section.title}</p>
            <p className="text-sm text-gray-500">{section.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Page;
