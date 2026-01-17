import {
  RiApps2Line,
  RiCalendarLine,
  RiMegaphoneLine,
  RiPieChartLine,
  RiRocket2Line,
  RiSettings3Line,
  RiUserCommunityLine,
  RiWalletLine,
  RiShieldUserLine,
  RiFileListLine,
  RiAlarmWarningLine,
  RiBarChartBoxLine,
  RiMoneyDollarCircleLine,
  RiUserSettingsLine,
  RiStackLine,
} from "@remixicon/react";

import type { RouteProps } from "@/types";

export const ADMIN_ROUTES: RouteProps[] = [
  {
    href: "/admin",
    icon: RiApps2Line,
    label: "Dashboard",
  },
  {
    href: "/admin/users",
    icon: RiUserCommunityLine,
    label: "User Management",
  },
  {
    href: "/admin/activities",
    icon: RiFileListLine,
    label: "Activity Logs",
  },
  {
    href: "/admin/campaigns",
    icon: RiRocket2Line,
    label: "Campaign Oversight",
  },
  {
    href: "/admin/analytics",
    icon: RiBarChartBoxLine,
    label: "Platform Analytics",
  },
  {
    href: "/admin/finance",
    icon: RiMoneyDollarCircleLine,
    label: "Financial Overview",
  },
  {
    href: "/admin/moderation",
    icon: RiShieldUserLine,
    label: "Content Moderation",
  },
  {
    href: "/admin/alerts",
    icon: RiAlarmWarningLine,
    label: "System Alerts",
  },
  {
    href: "/admin/settings",
    icon: RiUserSettingsLine,
    label: "Settings",
  },
];

export const DASHBOARD_ROUTES: RouteProps[] = [
  {
    href: "/dashboard",
    icon: RiApps2Line,
    label: "Overview",
  },
  {
    href: "/dashboard/ads",
    icon: RiStackLine,
    label: "Ads",
  },
  {
    href: "/dashboard/campaigns",
    icon: RiMegaphoneLine,
    label: "Campaigns",
  },
  {
    href: "/dashboard/analytics",
    icon: RiPieChartLine,
    label: "Analytics",
  },
  {
    href: "/dashboard/audiences",
    icon: RiUserCommunityLine,
    label: "Audiences",
  },
  {
    href: "/dashboard/schedule",
    icon: RiCalendarLine,
    label: "Schedule",
  },
  {
    href: "/dashboard/finance",
    icon: RiWalletLine,
    label: "Finance",
  },
  {
    href: "/dashboard/settings",
    icon: RiSettings3Line,
    label: "Settings",
  },
];

export const FOOTER_ROUTES = [
  { label: "Pricing", href: "/pricing" },
  { label: "Help Center", href: "/help-center" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
