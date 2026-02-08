import type { Maybe } from "./app";

export interface AudienceProps {
  created_at: string;
  description?: string;
  id: string;
  name: string;
  status: "active" | "paused" | "archived";
  targeting: {
    age_range?: { min?: number; max?: number };
    genders?: ("male" | "female" | "unknown")[];
    locations?: string[];
    interests?: string[];
    behaviors?: string[];
    custom_audiences?: string[];
    excluded_audiences?: string[];
  };
  updated_at: Maybe<string>;
}
