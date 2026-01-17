import type { Maybe } from "./app";

export interface AdProps {
  assets: string[];
  createdAt: Date;
  description: string;
  id: string;
  status: "active" | "paused" | "completed";
  title: string;
  updatedAt: Maybe<Date>;
}
