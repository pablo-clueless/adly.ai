import type { Maybe } from "./app";

export interface AdProps {
  assets: string[];
  created_at: string;
  description: string;
  id: string;
  status: "active" | "paused" | "completed";
  title: string;
  updated_at: Maybe<string>;
  budget_id?: string;
  campaign_id?: string;
}
