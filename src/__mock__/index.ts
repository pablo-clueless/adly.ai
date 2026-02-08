import { faker } from "@faker-js/faker";
import { addDays } from "date-fns";

import type { AdProps, CampaignProps, CampaignStatus, FinanceProps } from "@/types";

export const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const MOCK_STATUS: CampaignStatus[] = ["active", "completed", "paused", "pending"];

export const MOCK_FINANCES: FinanceProps[] = Array.from({ length: 10 }, () => ({
  budget: faker.number.int({ min: 1000, max: 10000 }),
  currency: "NGN",
  end_date: addDays(new Date(), faker.number.int({ min: 10, max: 30 })).toISOString(),
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  remaining: faker.number.int({ min: 0, max: 10000 }),
  spent: faker.number.int({ min: 0, max: 10000 }),
  start_date: addDays(new Date(), faker.number.int({ min: -30, max: 0 })).toISOString(),
  status: faker.helpers.arrayElement(["active", "paused", "completed"]),
}));

export const MOCK_CAMPAIGNS: CampaignProps[] = Array.from({ length: 27 }, () => ({
  budget: faker.number.int({ min: 1000, max: 10000 }),
  campaign_id: faker.string.uuid(),
  clicks: faker.number.int({ min: 0, max: 10000 }),
  cost: faker.number.int({ min: 0, max: 10000 }),
  created_at: new Date().toISOString(),
  end_date: addDays(new Date(), faker.number.int({ min: 10, max: 30 })).toISOString(),
  id: faker.string.uuid(),
  status: getRandomItem(MOCK_STATUS),
  title: faker.lorem.lines(1),
  updated_at: new Date().toISOString(),
  audiences: [],
  conversions: faker.number.int({ min: 0, max: 10000 }),
  cost_per_click: faker.number.int({ min: 0, max: 10000 }),
  finance_id: faker.string.uuid(),
  impressions: faker.number.int({ min: 10000, max: 10000000 }),
  reach: faker.number.int({ min: 0, max: 10000 }),
  revenue: faker.number.int({ min: 0, max: 10000 }),
  start_date: addDays(new Date(), faker.number.int({ min: -30, max: 0 })).toISOString(),
  name: faker.lorem.words(2),
}));

export const MOCK_ADS: AdProps[] = [];
