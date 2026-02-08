export type RoleType = "ADMIN" | "USER";

export interface UserProps {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email_verified: boolean;
  auth_provider: string;
  date_joined: string;
  role: RoleType;
  permissions: string[];
  profile: {
    avatar_url: string;
    phone_number: string;
    company_name: string;
    job_title: string;
    timezone: string;
    newsletter_subscribed: boolean;
    marketing_emails: boolean;
  };
}
