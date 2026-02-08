"use client";

import React from "react";

import { useProtectedRoutes, useRbacRedirect } from "@/hooks";
import type { RoleType } from "@/types";
import { useUserStore } from "@/store/stores";
import { Loader } from "../shared";

interface WithAuthProps {
  allowedRoles: RoleType[];
  children: React.ReactNode;
  enableRbacRedirect?: boolean;
  fallback?: React.ReactNode;
  permissions?: string[];
  redirectTo?: string;
}

export const WithAuth = React.memo(
  ({
    allowedRoles,
    children,
    enableRbacRedirect = false,
    fallback = <Loader />,
    permissions,
    redirectTo,
  }: WithAuthProps) => {
    const { user, isHydrated, hydrate } = useUserStore();
    const handleRbacRedirect = useRbacRedirect();

    React.useEffect(() => {
      hydrate();
    }, [hydrate]);

    const { hasAccess } = useProtectedRoutes({
      allowedRoles,
      checkOnMount: false,
      permissions,
      redirectTo,
    });

    React.useEffect(() => {
      if (isHydrated && !hasAccess && enableRbacRedirect) {
        handleRbacRedirect(user);
      }
    }, [isHydrated, hasAccess, enableRbacRedirect, handleRbacRedirect, user]);

    if (!isHydrated) {
      return fallback;
    }

    if (!hasAccess) {
      return fallback;
    }

    return children;
  },
);

WithAuth.displayName = "WithAuth";
