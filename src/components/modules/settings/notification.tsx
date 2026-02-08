"use client";

import { RiSaveLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TabPanel } from "@/components/shared";
import { cn } from "@/lib";

interface Props {
  selected: string;
}

const NOTIFICATION_CATEGORIES = [
  {
    category: "Campaign Updates",
    settings: [
      {
        id: "campaign_status",
        title: "Campaign Status Changes",
        description: "Get notified when campaigns are approved, paused, or completed",
        email: true,
        push: true,
      },
      {
        id: "campaign_performance",
        title: "Performance Alerts",
        description: "Receive alerts when campaigns exceed or underperform targets",
        email: true,
        push: false,
      },
      {
        id: "budget_alerts",
        title: "Budget Alerts",
        description: "Get notified when budgets reach 80% or are exhausted",
        email: true,
        push: true,
      },
    ],
  },
  {
    category: "Team & Collaboration",
    settings: [
      {
        id: "team_invites",
        title: "Team Invitations",
        description: "Receive notifications for new team invitations",
        email: true,
        push: true,
      },
      {
        id: "mentions",
        title: "Mentions & Comments",
        description: "Get notified when someone mentions you in comments",
        email: false,
        push: true,
      },
      {
        id: "team_updates",
        title: "Team Updates",
        description: "Receive updates about team member changes",
        email: true,
        push: false,
      },
    ],
  },
  {
    category: "Reports & Analytics",
    settings: [
      {
        id: "weekly_reports",
        title: "Weekly Performance Reports",
        description: "Receive a weekly summary of your campaign performance",
        email: true,
        push: false,
      },
      {
        id: "monthly_insights",
        title: "Monthly Insights",
        description: "Get detailed monthly analytics and insights",
        email: true,
        push: false,
      },
    ],
  },
  {
    category: "Account & Security",
    settings: [
      {
        id: "login_alerts",
        title: "Login Alerts",
        description: "Get notified of new login attempts to your account",
        email: true,
        push: true,
      },
      {
        id: "billing_updates",
        title: "Billing Updates",
        description: "Receive notifications about payments and invoices",
        email: true,
        push: false,
      },
    ],
  },
];

export const Notification = ({ selected }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState(NOTIFICATION_CATEGORIES);

  const handleToggle = (categoryIndex: number, settingIndex: number, type: "email" | "push") => {
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
      })),
    }));
    setSettings(newSettings);
    toast.success("All notifications disabled");
  };

  return (
    <TabPanel selected={selected} value="notifications">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Notification Preferences</h3>
            <p className="text-sm text-gray-500">Choose how you want to be notified about updates</p>
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
        </div>

        <div className="space-y-6">
          {settings.map((category, categoryIndex) => (
            <div key={category.category} className="rounded-lg border border-gray-200 bg-white">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
                <h4 className="font-medium">{category.category}</h4>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h4 className="mb-4 font-medium">Email Digest Frequency</h4>
          <div className="flex flex-wrap gap-3">
            {["Real-time", "Daily", "Weekly", "Monthly"].map((frequency) => (
              <button
                key={frequency}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                  frequency === "Daily"
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-200 hover:border-gray-300",
                )}
              >
                {frequency}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Choose how often you want to receive email digests of your notifications
          </p>
        </div>
      </div>
    </TabPanel>
  );
};
