import { faker } from "@faker-js/faker";
import { addDays, subDays, subHours, subMinutes } from "date-fns";

import type {
  ActivityLogProps,
  ActivityType,
  AdProps,
  AdStatus,
  AdminUserProps,
  AudienceProps,
  CampaignProps,
  CampaignStatus,
  FinanceProps,
  ModerationItemProps,
  NotificationProps,
  NotificationStatus,
  NotificationType,
  SystemAlertProps,
} from "@/types";

export const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const MOCK_CAMPAIGN_STATUS: CampaignStatus[] = ["active", "completed", "paused", "pending"];
export const MOCK_AD_STATUS: AdStatus[] = ["draft", "expired", "expiring", "published", "scheduled"];

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
  status: getRandomItem(MOCK_CAMPAIGN_STATUS),
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

export const MOCK_ADS: AdProps[] = Array.from({ length: 27 }, () => ({
  assets: [],
  comments: faker.number.int({ min: 5, max: 1200 }),
  created_at: new Date().toISOString(),
  description: faker.lorem.lines(1),
  id: faker.string.uuid(),
  impressions: faker.number.int({ min: 10000, max: 10000000 }),
  published_at: new Date().toISOString(),
  title: faker.lorem.lines(1),
  updated_at: new Date().toISOString(),
  reach: faker.number.int({ min: 0, max: 10000 }),
  reactions: faker.number.int({ min: 0, max: 10000 }),
  shares: faker.number.int({ min: 0, max: 10000 }),
  status: getRandomItem(MOCK_AD_STATUS),
}));

export const MOCK_AUDIENCE_STATUS: AudienceProps["status"][] = ["active", "paused", "archived"];

const INTERESTS = ["Technology", "Sports", "Fashion", "Travel", "Food", "Music", "Gaming", "Fitness", "Business"];
const LOCATIONS = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
];
const BEHAVIORS = [
  "Online Shoppers",
  "Frequent Travelers",
  "Tech Early Adopters",
  "Health Conscious",
  "Social Media Active",
];

export const MOCK_AUDIENCES: AudienceProps[] = Array.from({ length: 20 }, () => ({
  created_at: addDays(new Date(), faker.number.int({ min: -60, max: 0 })).toISOString(),
  description: faker.lorem.sentence(),
  id: faker.string.uuid(),
  name: faker.company.buzzPhrase(),
  status: getRandomItem(MOCK_AUDIENCE_STATUS),
  targeting: {
    age_range: { min: getRandomNumber(18, 25), max: getRandomNumber(45, 65) },
    genders: faker.helpers.arrayElements(["male", "female"] as const, getRandomNumber(1, 2)),
    locations: faker.helpers.arrayElements(LOCATIONS, getRandomNumber(1, 4)),
    interests: faker.helpers.arrayElements(INTERESTS, getRandomNumber(2, 5)),
    behaviors: faker.helpers.arrayElements(BEHAVIORS, getRandomNumber(1, 3)),
  },
  updated_at: new Date().toISOString(),
}));

const ACTIVITY_TYPES: ActivityType[] = ["login", "logout", "create", "update", "delete", "export", "import"];
const RESOURCE_TYPES = ["campaign", "ad", "audience", "user", "budget", "settings"];

export const MOCK_ADMIN_USERS: AdminUserProps[] = Array.from({ length: 50 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    email: faker.internet.email({ firstName, lastName }),
    first_name: firstName,
    last_name: lastName,
    full_name: `${firstName} ${lastName}`,
    email_verified: faker.datatype.boolean({ probability: 0.85 }),
    auth_provider: faker.helpers.arrayElement(["email", "google", "github"]),
    date_joined: subDays(new Date(), faker.number.int({ min: 1, max: 365 })).toISOString(),
    role: faker.helpers.arrayElement(["ADMIN", "USER"] as const),
    permissions: [],
    profile: {
      avatar_url: "",
      phone_number: faker.phone.number(),
      company_name: faker.company.name(),
      job_title: faker.person.jobTitle(),
      timezone: faker.location.timeZone(),
      newsletter_subscribed: faker.datatype.boolean(),
      marketing_emails: faker.datatype.boolean(),
    },
    status: faker.helpers.arrayElement(["active", "suspended", "pending"] as const),
    last_login: subHours(new Date(), faker.number.int({ min: 1, max: 720 })).toISOString(),
    total_campaigns: faker.number.int({ min: 0, max: 50 }),
    total_spend: faker.number.int({ min: 0, max: 100000 }),
  };
});

export const MOCK_ACTIVITY_LOGS: ActivityLogProps[] = Array.from({ length: 100 }, () => {
  const user = faker.helpers.arrayElement(MOCK_ADMIN_USERS);
  const resourceType = faker.helpers.arrayElement(RESOURCE_TYPES);
  return {
    id: faker.string.uuid(),
    user_id: user.id,
    user_name: user.full_name,
    user_email: user.email,
    action: faker.helpers.arrayElement(ACTIVITY_TYPES),
    resource_type: resourceType,
    resource_id: faker.string.uuid(),
    resource_name: faker.lorem.words(3),
    ip_address: faker.internet.ipv4(), // only IPv4
    user_agent: faker.internet.userAgent(),
    timestamp: subMinutes(new Date(), faker.number.int({ min: 1, max: 10000 })).toISOString(),
    details: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
  };
}).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export const MOCK_SYSTEM_ALERTS: SystemAlertProps[] = Array.from({ length: 25 }, () => ({
  id: faker.string.uuid(),
  title: faker.helpers.arrayElement([
    "High CPU Usage Detected",
    "Database Connection Pool Low",
    "API Rate Limit Warning",
    "Storage Capacity Warning",
    "Unusual Login Activity",
    "Payment Processing Error",
    "Campaign Budget Exhausted",
    "SSL Certificate Expiring",
    "Memory Usage Critical",
    "Failed Backup Alert",
  ]),
  message: faker.lorem.sentence(),
  severity: faker.helpers.arrayElement(["info", "warning", "error", "critical"] as const),
  status: faker.helpers.arrayElement(["active", "acknowledged", "resolved"] as const),
  source: faker.helpers.arrayElement(["System", "Database", "API", "Security", "Billing", "Infrastructure"]),
  created_at: subHours(new Date(), faker.number.int({ min: 1, max: 168 })).toISOString(),
  acknowledged_at: faker.datatype.boolean()
    ? subHours(new Date(), faker.number.int({ min: 1, max: 48 })).toISOString()
    : undefined,
  resolved_at: faker.datatype.boolean({ probability: 0.3 })
    ? subHours(new Date(), faker.number.int({ min: 1, max: 24 })).toISOString()
    : undefined,
})).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

export const MOCK_MODERATION_ITEMS: ModerationItemProps[] = Array.from({ length: 30 }, () => ({
  id: faker.string.uuid(),
  content_type: faker.helpers.arrayElement(["ad", "campaign", "user_report"] as const),
  content_id: faker.string.uuid(),
  content_title: faker.lorem.words(4),
  content_preview: faker.lorem.paragraph(),
  submitted_by: faker.person.fullName(),
  submitted_at: subHours(new Date(), faker.number.int({ min: 1, max: 72 })).toISOString(),
  status: faker.helpers.arrayElement(["pending", "approved", "rejected"] as const),
  reviewed_by: faker.datatype.boolean() ? faker.person.fullName() : undefined,
  reviewed_at: faker.datatype.boolean()
    ? subHours(new Date(), faker.number.int({ min: 1, max: 24 })).toISOString()
    : undefined,
  rejection_reason: faker.datatype.boolean({ probability: 0.2 }) ? faker.lorem.sentence() : undefined,
  flags: faker.helpers.arrayElements(
    ["inappropriate_content", "misleading", "copyright", "spam", "offensive", "policy_violation"],
    faker.number.int({ min: 1, max: 3 }),
  ),
})).sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());

export const MOCK_PLATFORM_METRICS = {
  total_users: 12847,
  active_users: 8234,
  total_campaigns: 45892,
  active_campaigns: 12456,
  total_revenue: 2847563,
  monthly_revenue: 324567,
  total_impressions: 892456123,
  pending_moderation: 23,
};

export const MOCK_NOTIFICATION_STATUS: NotificationStatus[] = ["pending", "read", "unread"];
export const MOCK_NOTIFICATION_TYPE: NotificationType[] = ["ERROR", "INFO", "SUCCESS", "SYSTEM", "WARNING"];

export const MOCK_NOTIFICATIONS: NotificationProps[] = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  message: faker.lorem.sentences({ max: 5, min: 2 }),
  status: getRandomItem(MOCK_NOTIFICATION_STATUS),
  timestamp: faker.date.between({ from: "2024-01-01T00:00:00.000Z", to: new Date().toISOString() }).toISOString(),
  title: faker.lorem.words({ max: 7, min: 4 }),
  type: getRandomItem(MOCK_NOTIFICATION_TYPE),
}));
