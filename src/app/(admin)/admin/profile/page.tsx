"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { RiCameraLine, RiSaveLine, RiShieldCheckLine, RiLockLine } from "@remixicon/react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { staggerContainerVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";
import { ScrollArea } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const TIMEZONES = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Africa/Lagos", label: "Lagos (WAT)" },
];

const Page = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = shouldReduceMotion ? {} : staggerContainerVariants;
  const itemVariants = shouldReduceMotion ? {} : staggerItemVariants;

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@adflow.ai",
    phone: "+1 (555) 000-0000",
    department: "Platform Administration",
    role: "Super Admin",
    timezone: "UTC",
    twoFactorEnabled: true,
    sessionAlerts: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <ScrollArea className="h-full w-full space-y-6">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
        <motion.div className="flex items-center justify-between" variants={itemVariants}>
          <div>
            <h1 className="text-2xl font-semibold">Admin Profile</h1>
            <p className="text-sm text-gray-500">Manage your administrator account settings</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <RiSaveLine />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div className="space-y-6 lg:col-span-2" variants={containerVariants}>
            <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
              <h2 className="mb-4 text-lg font-medium">Personal Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <p className="text-xs text-gray-500">This email is used for admin notifications and alerts</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Input
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Input value={formData.role} disabled className="bg-gray-50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Timezone</label>
                  <Select
                    value={formData.timezone}
                    onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
              <h2 className="mb-4 text-lg font-medium">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-green-100 p-2">
                      <RiShieldCheckLine className="size-5 text-green-600" />
                    </span>
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.twoFactorEnabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, twoFactorEnabled: checked })}
                  />
                </div>

                <div className="flex items-center justify-between border-t py-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-blue-100 p-2">
                      <RiLockLine className="size-5 text-blue-600" />
                    </span>
                    <div>
                      <p className="font-medium">Session Security Alerts</p>
                      <p className="text-sm text-gray-500">Get notified of new login sessions</p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.sessionAlerts}
                    onCheckedChange={(checked) => setFormData({ ...formData, sessionAlerts: checked })}
                  />
                </div>

                <div className="border-t pt-4">
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
              <h2 className="mb-4 text-lg font-medium">Profile Photo</h2>
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="bg-primary-100 text-primary-600 flex size-24 items-center justify-center rounded-full text-2xl font-bold">
                    {formData.firstName[0]}
                    {formData.lastName[0]}
                  </div>
                  <button className="bg-primary-500 hover:bg-primary-600 absolute right-0 bottom-0 rounded-full border-2 border-white p-2 text-white shadow-sm">
                    <RiCameraLine className="size-4" />
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{formData.role}</p>
                </div>
                <Button variant="outline" size="sm">
                  Upload Photo
                </Button>
              </div>
            </motion.div>

            <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
              <h2 className="mb-4 text-lg font-medium">Admin Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Role</span>
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    {formData.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">2FA Status</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${formData.twoFactorEnabled ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {formData.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Login</span>
                  <span className="text-sm font-medium">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium">Jan 1, 2024</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="rounded-xl border bg-white p-6" variants={itemVariants}>
              <h2 className="mb-4 text-lg font-medium">Active Sessions</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div>
                    <p className="text-sm font-medium">Current Session</p>
                    <p className="text-xs text-gray-500">Chrome on Windows</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Active</span>
                </div>
                <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
                  Revoke All Other Sessions
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
