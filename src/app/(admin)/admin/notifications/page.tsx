"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RiSaveLine } from "@remixicon/react";

import { staggerContainerVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";
import { ScrollArea } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib";

const ADMIN_NOTIFICATION_CATEGORIES = [
  {
    category: "System Alerts",
    settings: [
      {
        id: "critical_alerts",
        title: "Critical System Alerts",
        description: "Receive immediate notifications for critical system issues",
        email: true,
        push: true,
        sms: true,
      },
      {
        id: "performance_alerts",
        title: "Performance Degradation",
        description: "Get notified when system performance drops below thresholds",
        email: true,
        push: true,
        sms: false,
      },
      {
        id: "security_alerts",
        title: "Security Incidents",
        description: "Alerts for potential security threats or breaches",
        email: true,
        push: true,
        sms: true,
      },
    ],
  },
  {
    category: "User Activity",
    settings: [
      {
        id: "new_registrations",
        title: "New User Registrations",
        description: "Get notified when new users sign up on the platform",
        email: true,
        push: false,
        sms: false,
      },
      {
        id: "suspicious_activity",
        title: "Suspicious Activity",
        description: "Alerts for unusual user behavior or login attempts",
        email: true,
        push: true,
        sms: false,
      },
      {
        id: "user_reports",
        title: "User Reports & Complaints",
        description: "Notifications when users submit reports or complaints",
        email: true,
        push: true,
        sms: false,
      },
    ],
  },
  {
    category: "Content Moderation",
    settings: [
      {
        id: "pending_reviews",
        title: "Pending Content Reviews",
        description: "Get notified when content is awaiting moderation",
        email: true,
        push: true,
        sms: false,
      },
      {
        id: "flagged_content",
        title: "Flagged Content",
        description: "Alerts when content is flagged by automated systems",
        email: true,
        push: true,
        sms: false,
      },
      {
        id: "policy_violations",
        title: "Policy Violations",
        description: "Notifications for content that violates platform policies",
        email: true,
        push: true,
        sms: false,
      },
    ],
  },
  {
    category: "Financial",
    settings: [
      {
        id: "payment_issues",
        title: "Payment Processing Issues",
        description: "Get notified about failed or disputed payments",
        email: true,
        push: true,
        sms: false,
      },
      {
        id: "revenue_milestones",
        title: "Revenue Milestones",
        description: "Alerts when revenue targets are reached",
        email: true,
        push: false,
        sms: false,
      },
      {
        id: "refund_requests",
        title: "Refund Requests",
        description: "Notifications for user refund requests",
        email: true,
        push: true,
        sms: false,
      },
    ],
  },
  {
    category: "Reports & Analytics",
    settings: [
      {
        id: "daily_summary",
        title: "Daily Summary Report",
        description: "Receive a daily summary of platform activity",
        email: true,
        push: false,
        sms: false,
      },
      {
        id: "weekly_analytics",
        title: "Weekly Analytics Report",
        description: "Weekly performance and analytics digest",
        email: true,
        push: false,
        sms: false,
      },
      {
        id: "monthly_insights",
        title: "Monthly Insights",
        description: "Comprehensive monthly platform insights",
        email: true,
        push: false,
        sms: false,
      },
    ],
  },
];

const Page = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  const [settings, setSettings] = useState(ADMIN_NOTIFICATION_CATEGORIES);
  const [digestFrequency, setDigestFrequency] = useState("Daily");
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (categoryIndex: number, settingIndex: number, type: "email" | "push" | "sms") => {
    const newSettings = [...settings];
    const setting = newSettings[categoryIndex].settings[settingIndex];
    setting[type] = !setting[type];
    setSettings(newSettings);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Notification preferences saved!");
  };

  const handleEnableAll = () => {
    const newSettings = settings.map((category) => ({
      ...category,
      settings: category.settings.map((setting) => ({
        ...setting,
        email: true,
        push: true,
        sms: setting.id.includes("critical") || setting.id.includes("security"),
      })),
    }));
    setSettings(newSettings);
    toast.success("All notifications enabled");
  };

  const handleDisableAll = () => {
    const newSettings = settings.map((category) => ({
      ...category,
      settings: category.settings.map((setting) => ({
        ...setting,
        email: false,
        push: false,
        sms: false,
      })),
    }));
    setSettings(newSettings);
    toast.success("All notifications disabled");
  };

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
        <motion.div className="flex items-center justify-between" variants={itemVariants}>
          <div>
            <h1 className="text-2xl font-semibold">Admin Notifications</h1>
            <p className="text-sm text-gray-500">Configure how you receive admin alerts and notifications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDisableAll}>
              Disable All
            </Button>
            <Button variant="outline" onClick={handleEnableAll}>
              Enable All
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <RiSaveLine />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </motion.div>

        <motion.div className="space-y-6" variants={containerVariants}>
          {settings.map((category, categoryIndex) => (
            <motion.div key={category.category} className="rounded-xl border bg-white" variants={itemVariants}>
              <div className="rounded-t-xl border-b bg-gray-50 px-6 py-3">
                <h2 className="font-medium">{category.category}</h2>
              </div>
              <div className="divide-y">
                {category.settings.map((setting, settingIndex) => (
                  <div key={setting.id} className="flex items-center justify-between px-6 py-4">
                    <div className="flex-1">
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Email</span>
                        <Switch
                          checked={setting.email}
                          onCheckedChange={() => handleToggle(categoryIndex, settingIndex, "email")}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Push</span>
                        <Switch
                          checked={setting.push}
                          onCheckedChange={() => handleToggle(categoryIndex, settingIndex, "push")}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">SMS</span>
                        <Switch
                          checked={setting.sms}
                          onCheckedChange={() => handleToggle(categoryIndex, settingIndex, "sms")}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
            <h2 className="mb-4 text-lg font-medium">Email Digest Frequency</h2>
            <div className="flex flex-wrap gap-3">
              {["Real-time", "Hourly", "Daily", "Weekly"].map((frequency) => (
                <button
                  key={frequency}
                  onClick={() => setDigestFrequency(frequency)}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                    frequency === digestFrequency
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  {frequency}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Choose how often you want to receive email digests of non-critical notifications
            </p>
          </motion.div>

          <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
            <h2 className="mb-4 text-lg font-medium">Quiet Hours</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Quiet Hours</p>
                  <p className="text-sm text-gray-500">Pause non-critical notifications during specified hours</p>
                </div>
                <Switch />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <input type="time" defaultValue="22:00" className="w-full rounded-md border px-3 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time</label>
                  <input type="time" defaultValue="08:00" className="w-full rounded-md border px-3 py-2 text-sm" />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Critical and security alerts will still be delivered during quiet hours
              </p>
            </div>
          </motion.div>

          <motion.div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6" variants={itemVariants}>
            <h2 className="mb-2 text-lg font-medium text-yellow-800">Emergency Contact</h2>
            <p className="mb-4 text-sm text-yellow-700">
              Configure an emergency contact number for critical system alerts
            </p>
            <div className="flex gap-4">
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="flex-1 rounded-md border border-yellow-300 bg-white px-3 py-2 text-sm"
              />
              <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                Verify Number
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
