export interface CampaignProps {
  id: string;
  name: string;
  status: string;
  budget: number;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  cost: number;
  finance_id: string;
  audiences: string[];
}
