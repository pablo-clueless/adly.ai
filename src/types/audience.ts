import type { Maybe } from "./app";

export interface AudienceProps {
  createdAt: string;
  description?: string;
  id: string;
  name: string;
  status: "active" | "paused" | "archived";
  targeting: {
    ageRange?: { min?: number; max?: number };
    genders?: ("male" | "female" | "unknown")[];
    locations?: string[];
    interests?: string[];
    behaviors?: string[];
    customAudiences?: string[];
    excludedAudiences?: string[];
  };
  updatedAt: Maybe<Date>;
}
