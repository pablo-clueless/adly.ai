"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Billing, Notification, Profile, Security, Team } from "@/components/modules/settings";
import { slideUpVariants, staggerContainerVariants, useReducedMotion } from "@/lib/motion";
import { Button } from "@/components/ui/button";

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

  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const pageVariants = shouldReduceMotion ? {} : slideUpVariants;

  return (
    <motion.div
      className="h-full w-full space-y-6 overflow-y-auto"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
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
        className="w-full space-y-2 border-b pb-2"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex items-center gap-4 text-sm font-medium"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {tabs.map((section) => (
            <Button
              className="flex-1"
              key={section.title}
              onClick={() => setCurrentTab(section)}
              variant={tab(section) ? "default" : "outline"}
            >
              {section.title}
            </Button>
          ))}
        </motion.div>
        <p className="text-sm text-gray-500">{currentTab.description}</p>
      </motion.div>
      <Billing selected={currentTab.title.toLowerCase()} />
      <Notification selected={currentTab.title.toLowerCase()} />
      <Profile selected={currentTab.title.toLowerCase()} />
      <Security selected={currentTab.title.toLowerCase()} />
      <Team selected={currentTab.title.toLowerCase()} />
    </motion.div>
  );
};

export default Page;
