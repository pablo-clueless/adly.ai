import type { Maybe } from "./app";

export type AdStatus = "all" | "draft" | "published" | "scheduled" | "expiring" | "expired";

export interface AdProps {
  assets: string[];
  comments: number;
  created_at: string;
  description: string;
  id: string;
  published_at: string;
  reach: number;
  reactions: number;
  shares: number;
  status: AdStatus;
  title: string;
  updated_at: Maybe<string>;
  budget_id?: string;
  campaign_id?: string;
}
