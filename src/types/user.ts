import type { Maybe } from "./app";

export type RoleType = "ADMIN" | "USER";

export interface UserProps {
  createdAt: Date;
  email: string;
  id: string;
  image: Maybe<string>;
  name: string;
  permissions: string[];
  role: RoleType;
  updatedAt: Maybe<Date>;
}
