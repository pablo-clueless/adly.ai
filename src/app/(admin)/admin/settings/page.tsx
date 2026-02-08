"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RiSaveLine } from "@remixicon/react";

import { staggerContainerVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";
import { ScrollArea } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const Page = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  const [settings, setSettings] = useState({
    platformName: "Adflow.ai",
    supportEmail: "support@adflow.ai",
    maxCampaignsPerUser: 50,
    maxAdsPerCampaign: 100,
    defaultCurrency: "USD",
    maintenanceMode: false,
    newUserRegistration: true,
    requireEmailVerification: true,
    twoFactorAuth: false,
    autoApproveContent: false,
    enableAnalytics: true,
    enableNotifications: true,
    logRetentionDays: 90,
    sessionTimeout: 30,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
        <motion.div className="flex items-center justify-between" variants={itemVariants}>
          <div>
            <h1 className="text-2xl font-semibold">Admin Settings</h1>
            <p className="text-sm text-gray-500">Configure platform-wide settings and preferences</p>
          </div>
          <Button onClick={handleSave}>
            <RiSaveLine /> Save Changes
          </Button>
        </motion.div>

        <motion.div className="space-y-6" variants={containerVariants}>
          <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
            <h2 className="mb-4 text-lg font-medium">General Settings</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform Name</label>
                <Input
                  value={settings.platformName}
                  onChange={(e) => setSettings((prev) => ({ ...prev, platformName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Support Email</label>
                <Input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings((prev) => ({ ...prev, supportEmail: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Campaigns per User</label>
                <Input
                  type="number"
                  value={settings.maxCampaignsPerUser}
                  onChange={(e) => setSettings((prev) => ({ ...prev, maxCampaignsPerUser: parseInt(e.target.value) }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Ads per Campaign</label>
                <Input
                  type="number"
                  value={settings.maxAdsPerCampaign}
                  onChange={(e) => setSettings((prev) => ({ ...prev, maxAdsPerCampaign: parseInt(e.target.value) }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Currency</label>
                <Input
                  value={settings.defaultCurrency}
                  onChange={(e) => setSettings((prev) => ({ ...prev, defaultCurrency: e.target.value }))}
                />
              </div>
            </div>
          </motion.div>

          <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
            <h2 className="mb-4 text-lg font-medium">Security Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">New User Registration</p>
                  <p className="text-sm text-gray-500">Allow new users to register on the platform</p>
                </div>
                <Switch
                  checked={settings.newUserRegistration}
                  onCheckedChange={() => handleToggle("newUserRegistration")}
                />
              </div>
              <div className="flex items-center justify-between border-t py-4">
                <div>
                  <p className="font-medium">Email Verification Required</p>
                  <p className="text-sm text-gray-500">Require email verification for new accounts</p>
                </div>
                <Switch
                  checked={settings.requireEmailVerification}
                  onCheckedChange={() => handleToggle("requireEmailVerification")}
                />
              </div>
              <div className="flex items-center justify-between border-t py-4">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                </div>
                <Switch checked={settings.twoFactorAuth} onCheckedChange={() => handleToggle("twoFactorAuth")} />
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="font-medium">Session Timeout (minutes)</p>
                  <p className="text-sm text-gray-500">Automatically log out inactive users</p>
                </div>
                <Input
                  type="number"
                  className="w-24"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings((prev) => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                />
              </div>
            </div>
          </motion.div>

          <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
            <h2 className="mb-4 text-lg font-medium">Content & Moderation</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Auto-Approve Content</p>
                  <p className="text-sm text-gray-500">Automatically approve all submitted content without review</p>
                </div>
                <Switch
                  checked={settings.autoApproveContent}
                  onCheckedChange={() => handleToggle("autoApproveContent")}
                />
              </div>
            </div>
          </motion.div>

          <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
            <h2 className="mb-4 text-lg font-medium">System Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-gray-500">Put the platform in maintenance mode (users cannot access)</p>
                </div>
                <Switch checked={settings.maintenanceMode} onCheckedChange={() => handleToggle("maintenanceMode")} />
              </div>
              <div className="flex items-center justify-between border-t py-4">
                <div>
                  <p className="font-medium">Enable Analytics</p>
                  <p className="text-sm text-gray-500">Collect and display platform analytics</p>
                </div>
                <Switch checked={settings.enableAnalytics} onCheckedChange={() => handleToggle("enableAnalytics")} />
              </div>
              <div className="flex items-center justify-between border-t py-4">
                <div>
                  <p className="font-medium">Enable Notifications</p>
                  <p className="text-sm text-gray-500">Send system notifications to users</p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={() => handleToggle("enableNotifications")}
                />
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="font-medium">Log Retention (days)</p>
                  <p className="text-sm text-gray-500">Number of days to keep activity logs</p>
                </div>
                <Input
                  type="number"
                  className="w-24"
                  value={settings.logRetentionDays}
                  onChange={(e) => setSettings((prev) => ({ ...prev, logRetentionDays: parseInt(e.target.value) }))}
                />
              </div>
            </div>
          </motion.div>

          <motion.div className="rounded-xl border border-red-200 bg-red-50 p-6" variants={itemVariants}>
            <h2 className="mb-4 text-lg font-medium text-red-700">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-700">Reset All Settings</p>
                  <p className="text-sm text-red-600">Reset all settings to their default values</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                  Reset Settings
                </Button>
              </div>
              <div className="flex items-center justify-between border-t border-red-200 pt-4">
                <div>
                  <p className="font-medium text-red-700">Clear All Data</p>
                  <p className="text-sm text-red-600">Permanently delete all platform data (irreversible)</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                  Clear Data
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
