"use client";

import { RiArrowLeftLine, RiSaveLine } from "@remixicon/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AdProps } from "@/types";
import { cn } from "@/lib";

import { MOCK_ADS } from "@/__mock__";

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft", color: "bg-gray-100 text-gray-700 border-gray-300" },
  { value: "published", label: "Published", color: "bg-green-100 text-green-700 border-green-300" },
  { value: "scheduled", label: "Scheduled", color: "bg-blue-100 text-blue-700 border-blue-300" },
  { value: "expiring", label: "Expiring", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { value: "expired", label: "Expired", color: "bg-red-100 text-red-700 border-red-300" },
];

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const adId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [ad, setAd] = useState<AdProps | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "draft" as AdProps["status"],
  });

  useEffect(() => {
    if (adId) {
      setTimeout(() => {
        const found = MOCK_ADS.find((a) => a.id === adId);
        if (found) {
          setAd(found);
          setFormData({
            title: found.title,
            description: found.description,
            status: found.status,
          });
        }
        setIsLoading(false);
      }, 500);
    }
  }, [adId]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Ad updated successfully!");
    router.push("/dashboard/ads");
  };

  const hasChanges = useMemo(() => {
    if (!ad) return false;
    return formData.title !== ad.title || formData.description !== ad.description || formData.status !== ad.status;
  }, [ad, formData]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading ad...</div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Ad not found</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/ads">
            <RiArrowLeftLine /> Back to Ads
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
            <Link href="/dashboard/ads">
              <RiArrowLeftLine />
            </Link>
          </Button>
          <div>
            <p className="text-2xl font-semibold">Edit Ad</p>
            <p className="text-sm text-gray-500">ID: {ad.id}</p>
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
                <label className="text-sm font-medium">Ad Title</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setFormData({ ...formData, status: status.value as AdProps["status"] })}
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
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Performance Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reach</span>
                <span className="font-medium">{ad.reach.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reactions</span>
                <span className="font-medium">{ad.reactions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Comments</span>
                <span className="font-medium">{ad.comments.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Shares</span>
                <span className="font-medium">{ad.shares.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Engagement Rate</span>
                  <span className="text-primary-600 font-semibold">
                    {ad.reach > 0 ? (((ad.reactions + ad.comments + ad.shares) / ad.reach) * 100).toFixed(2) : "0.00"}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Duplicate Ad
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Boost Ad
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                Delete Ad
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
