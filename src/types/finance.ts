import type { Maybe } from "./app";

export interface FinanceProps {
  budget: number;
  currency: string;
  end_date: Maybe<string>;
  id: string;
  name: string;
  remaining: number;
  spent: number;
  start_date: string;
  status: "active" | "paused" | "completed";
}
