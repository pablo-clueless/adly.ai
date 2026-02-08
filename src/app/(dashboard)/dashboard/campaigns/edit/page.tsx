"use client";

import { RiArrowLeftLine, RiSaveLine } from "@remixicon/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { DatePicker, type DateRange } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CampaignProps } from "@/types";
import { cn, formatCurrency } from "@/lib";

import { MOCK_CAMPAIGNS } from "@/__mock__";

const STATUS_OPTIONS = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-700 border-green-300" },
  { value: "paused", label: "Paused", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { value: "completed", label: "Completed", color: "bg-gray-100 text-gray-700 border-gray-300" },
  { value: "pending", label: "Pending", color: "bg-blue-100 text-blue-700 border-blue-300" },
];

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const campaignId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [campaign, setCampaign] = useState<CampaignProps | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "active" as CampaignProps["status"],
    budget: 0,
    dateRange: { from: undefined, to: undefined } as DateRange,
  });

  useEffect(() => {
    if (campaignId) {
      // Simulate loading campaign data
      setTimeout(() => {
        const found = MOCK_CAMPAIGNS.find((c) => c.id === campaignId);
        if (found) {
          setCampaign(found);
          setFormData({
            name: found.name,
            status: found.status,
            budget: found.budget,
            dateRange: {
              from: new Date(found.start_date),
              to: new Date(found.end_date),
            },
          });
        }
        setIsLoading(false);
      }, 500);
    }
  }, [campaignId]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Campaign updated successfully!");
    router.push("/dashboard/campaigns");
  };

  const hasChanges = useMemo(() => {
    if (!campaign) return false;
    return (
      formData.name !== campaign.name || formData.status !== campaign.status || formData.budget !== campaign.budget
    );
  }, [campaign, formData]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading campaign...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Campaign not found</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/campaigns">
            <RiArrowLeftLine /> Back to Campaigns
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full w-full space-y-6 overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Button asChild size="icon" variant="ghost">
            <Link href="/dashboard/campaigns">
              <RiArrowLeftLine />
            </Link>
          </Button>
          <div>
            <p className="text-2xl font-semibold">Edit Campaign</p>
            <p className="text-sm text-gray-500">ID: {campaign.id}</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
          <RiSaveLine />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Name</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setFormData({ ...formData, status: status.value as CampaignProps["status"] })}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                        formData.status === status.value
                          ? status.color
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Daily Budget</label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      className="pl-8"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Duration</label>
                  <DatePicker
                    type="range"
                    value={formData.dateRange}
                    onValueChange={(range) => setFormData({ ...formData, dateRange: range })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Performance Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Impressions</span>
                <span className="font-medium">{campaign.impressions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Clicks</span>
                <span className="font-medium">{campaign.clicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">CTR</span>
                <span className="font-medium">
                  {campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) : "0.00"}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conversions</span>
                <span className="font-medium">{campaign.conversions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cost</span>
                <span className="font-medium">{formatCurrency(campaign.cost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-medium">{formatCurrency(campaign.revenue)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">ROI</span>
                  <span
                    className={cn(
                      "font-semibold",
                      campaign.revenue > campaign.cost ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {campaign.cost > 0
                      ? (((campaign.revenue - campaign.cost) / campaign.cost) * 100).toFixed(1)
                      : "0.0"}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Duplicate Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                Delete Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
