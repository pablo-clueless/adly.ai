"use client";

import { motion } from "framer-motion";

import { slideUpVariants, staggerContainerVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";
import { Billing, Notification, Profile, Security, Team } from "@/components/modules/settings";
import { useState } from "react";
import { cn } from "@/lib";

const tabs = [
  {
    title: "Profile",
    description: "Manage your personal information and preferences",
  },
  {
    title: "Team",
    description: "Manage your team members and permissions",
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
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const shouldReduceMotion = useReducedMotion();
  const tab = (section: (typeof tabs)[0]) => section.title === currentTab.title;

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
      <motion.div
        className="flex items-center gap-4 text-sm font-medium"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {tabs.map((section, index) => (
          <motion.button
            className={cn(
              "before:bg-primary-400 relative flex h-10 flex-1 items-center justify-center before:absolute before:top-full before:left-0 before:h-px before:transition-all before:duration-500",
              tab(section) ? "text-primary-400 before:w-full" : "text-gray-500 before:w-0",
            )}
            custom={index}
            key={section.title}
            onClick={() => setCurrentTab(section)}
            variants={itemVariants}
          >
            {section.title}
          </motion.button>
        ))}
      </motion.div>
      <div className="w-full border-b py-2">
        <p className="text-sm text-gray-500">{currentTab.description}</p>
      </div>
      <Billing selected={currentTab.title.toLowerCase()} />
      <Notification selected={currentTab.title.toLowerCase()} />
      <Profile selected={currentTab.title.toLowerCase()} />
      <Security selected={currentTab.title.toLowerCase()} />
      <Team selected={currentTab.title.toLowerCase()} />
    </motion.div>
  );
};

export default Page;
