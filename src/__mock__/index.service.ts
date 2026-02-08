import { faker } from "@faker-js/faker";

import type { SignInDto, SigninResponse } from "@/types";

export const mockApiAuth = async (payload: SignInDto): Promise<SigninResponse> => {
  if (!payload.email || !payload.password) {
    throw {
      message: "Invalid email or password",
      status: 401,
    };
  }
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    accessToken: faker.internet.jwt(),
    refreshToken: faker.internet.jwt(),
    user: {
      id: faker.string.uuid(),
      full_name: "John Doe",
      email: payload.email,
      role: "ADMIN",
      permissions: [],
      auth_provider: "email",
      date_joined: new Date().toISOString(),
      email_verified: true,
      first_name: "John",
      last_name: "Doe",
      profile: {
        avatar_url: faker.image.avatar(),
        phone_number: faker.phone.number(),
        company_name: faker.company.name(),
        job_title: faker.person.jobTitle(),
        timezone: faker.location.timeZone(),
        newsletter_subscribed: faker.datatype.boolean(),
        marketing_emails: faker.datatype.boolean(),
      },
    },
  };
};
