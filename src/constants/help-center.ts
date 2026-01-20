import {
  RiBarChart2Line,
  RiBookOpenLine,
  RiCalendarLine,
  RiFlashlightLine,
  RiMessage3Line,
  RiMoneyDollarCircleLine,
} from "@remixicon/react";

export const HELP_CATEGORIES = [
  {
    icon: RiBookOpenLine,
    title: "Getting Started",
    description: "Learn the basics and set up your first campaign",
    articles: [
      "Creating your first ad campaign",
      "Setting up your account",
      "Understanding the dashboard",
      "Quick start guide",
    ],
  },
  {
    icon: RiFlashlightLine,
    title: "Campaign Management",
    description: "Master campaign creation and optimization",
    articles: [
      "How to create a campaign",
      "Editing existing campaigns",
      "Pausing and resuming campaigns",
      "Deleting campaigns",
    ],
  },
  {
    icon: RiBarChart2Line,
    title: "Analytics & Reporting",
    description: "Track and analyze your campaign performance",
    articles: ["Understanding metrics", "Reading the analytics dashboard", "Exporting reports", "Performance insights"],
  },
  {
    icon: RiMoneyDollarCircleLine,
    title: "Billing & Budget",
    description: "Manage your spending and billing",
    articles: ["Setting campaign budgets", "Understanding billing", "Payment methods", "Invoice history"],
  },
  {
    icon: RiCalendarLine,
    title: "Scheduling",
    description: "Schedule your ads for maximum impact",
    articles: ["Creating a schedule", "Best times to run ads", "Recurring schedules", "Timezone settings"],
  },
  {
    icon: RiMessage3Line,
    title: "Support & Account",
    description: "Account management and support",
    articles: ["Contacting support", "Account settings", "Team management", "Privacy & security"],
  },
];
