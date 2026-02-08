"use client";

import { RiCameraLine, RiSaveLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabPanel } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  selected: string;
}

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

export const Profile = ({ selected }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Inc.",
    jobTitle: "Marketing Manager",
    timezone: "America/New_York",
    avatarUrl: "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <TabPanel selected={selected} value="profile">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <p className="text-sm text-gray-500">Update your personal details and public profile</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <RiSaveLine />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
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
                  <p className="text-xs text-gray-500">This email will be used for account notifications</p>
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
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <Input
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    />
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
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h4 className="mb-4 font-medium">Profile Photo</h4>
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
                  <p className="text-xs text-gray-500">{formData.jobTitle}</p>
                </div>
                <Button variant="outline" size="sm">
                  Upload Photo
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h4 className="mb-4 font-medium">Account Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Verified</span>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Type</span>
                  <span className="text-sm font-medium">Pro</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium">Jan 15, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabPanel>
  );
};
