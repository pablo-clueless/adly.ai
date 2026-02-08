export type CampaignStatus = "active" | "completed" | "paused" | "pending";

export interface CampaignProps {
  id: string;
  name: string;
  status: CampaignStatus;
  budget: number;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  reach: number;
  revenue: number;
  cost: number;
  cost_per_click: number;
  finance_id: string;
  audiences: string[];
}
