import type { AdStatus, CampaignStatus } from "@/types";

export const CAMPAIGN_STATUS: Record<CampaignStatus, string> = {
  active: "bg-green-50 text-green-600 border-green-600",
  completed: "bg-gray-50 text-gray-600 border-gray-600",
  paused: "bg-red-50 text-red-600 border-red-600",
  pending: "bg-yellow-50 text-yellow-600 border-yellow-600",
};

export const AD_STATUS: Record<AdStatus, string> = {
  draft: "bg-yellow-50 text-yellow-600 border-yellow-600",
  published: "bg-green-50 text-green-600 border-green-600",
  scheduled: "bg-blue-50 text-blue-600 border-blue-600",
  expiring: "bg-orange-50 text-orange-600 border-orange-600",
  expired: "bg-red-50 text-red-600 border-red-600",
};
