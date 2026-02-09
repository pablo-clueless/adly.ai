import type {
  AdStatus,
  AlertSeverity,
  AlertStatus,
  CampaignStatus,
  ModerationStatus,
  NotificationStatus,
} from "@/types";

export const CAMPAIGN_STATUS: Record<CampaignStatus, string> = {
  active: "bg-green-50 text-green-600 border-green-600",
  completed: "bg-gray-50 text-gray-600 border-gray-600",
  paused: "bg-red-50 text-red-600 border-red-600",
  pending: "bg-yellow-50 text-yellow-600 border-yellow-600",
};

export const AD_STATUS: Record<AdStatus, string> = {
  all: "",
  draft: "bg-yellow-50 text-yellow-600 border-yellow-600",
  published: "bg-green-50 text-green-600 border-green-600",
  scheduled: "bg-blue-50 text-blue-600 border-blue-600",
  expiring: "bg-orange-50 text-orange-600 border-orange-600",
  expired: "bg-red-50 text-red-600 border-red-600",
};

export const USER_STATUS: Record<string, string> = {
  active: "bg-green-50 text-green-600 border-green-600",
  suspended: "bg-red-50 text-red-600 border-red-600",
  pending: "bg-yellow-50 text-yellow-600 border-yellow-600",
};

export const ALERT_SEVERITY: Record<AlertSeverity, string> = {
  info: "bg-blue-50 text-blue-600 border-blue-600",
  warning: "bg-yellow-50 text-yellow-600 border-yellow-600",
  error: "bg-orange-50 text-orange-600 border-orange-600",
  critical: "bg-red-50 text-red-600 border-red-600",
};

export const ALERT_STATUS: Record<AlertStatus, string> = {
  active: "bg-red-50 text-red-600 border-red-600",
  acknowledged: "bg-yellow-50 text-yellow-600 border-yellow-600",
  resolved: "bg-green-50 text-green-600 border-green-600",
};

export const MODERATION_STATUS: Record<ModerationStatus, string> = {
  pending: "bg-yellow-50 text-yellow-600 border-yellow-600",
  approved: "bg-green-50 text-green-600 border-green-600",
  rejected: "bg-red-50 text-red-600 border-red-600",
};

export const NOTIFICATION_STATUS: Record<NotificationStatus, string> = {
  unread: "bg-red-50 text-red-600 border-red-600",
  read: "bg-green-50 text-green-600 border-green-600",
  pending: "bg-yellow-50 text-yellow-600 border-yellow-600",
};
