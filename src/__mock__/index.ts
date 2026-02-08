import { faker } from "@faker-js/faker";

import type { FinanceProps } from "@/types/finance";
import { addDays } from "date-fns";

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
