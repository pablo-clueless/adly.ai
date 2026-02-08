"use client";

import React from "react";

import { useProtectedRoutes } from "@/hooks";
import type { RoleType } from "@/types";
import { Loader } from "../shared";

interface WithAuthProps {
  allowedRoles: RoleType[];
  children: React.ReactNode;
  permissions?: string[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const WithAuth = React.memo(
  ({ allowedRoles, children, fallback = <Loader />, permissions, redirectTo }: WithAuthProps) => {
    const { hasAccess } = useProtectedRoutes({ allowedRoles, checkOnMount: false, permissions, redirectTo });

    if (!hasAccess) {
      return fallback;
    }

    return children;
  },
);

WithAuth.displayName = "WithAuth";
