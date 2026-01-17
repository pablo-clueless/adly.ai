export interface FinanceProps {
  budget: number;
  currency: string;
  endDate: Date;
  id: string;
  name: string;
  remaining: number;
  spent: number;
  startDate: Date;
  status: "active" | "paused" | "completed";
}
