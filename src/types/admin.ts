import type { UserProps } from "./user";

export type ActivityType = "login" | "logout" | "create" | "update" | "delete" | "export" | "import";
export type AlertSeverity = "info" | "warning" | "error" | "critical";
export type AlertStatus = "active" | "acknowledged" | "resolved";
export type ModerationStatus = "pending" | "approved" | "rejected";
export type ModerationContentType = "ad" | "campaign" | "user_report";

export interface ActivityLogProps {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  action: ActivityType;
  resource_type: string;
  resource_id: string;
  resource_name: string;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  details?: string;
}

export interface SystemAlertProps {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  created_at: string;
  acknowledged_at?: string;
  resolved_at?: string;
  acknowledged_by?: string;
}

export interface ModerationItemProps {
  id: string;
  content_type: ModerationContentType;
  content_id: string;
  content_title: string;
  content_preview: string;
  submitted_by: string;
  submitted_at: string;
  status: ModerationStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  flags: string[];
}

export interface AdminUserProps extends UserProps {
  status: "active" | "suspended" | "pending";
  last_login: string;
  total_campaigns: number;
  total_spend: number;
}

export interface PlatformMetrics {
  total_users: number;
  active_users: number;
  total_campaigns: number;
  active_campaigns: number;
  total_revenue: number;
  monthly_revenue: number;
  total_impressions: number;
  pending_moderation: number;
}
