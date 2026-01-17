"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";

import { useUserStore } from "@/store/stores";
import type { RoleType } from "@/types";

interface Props {
  allowedRoles?: RoleType[];
  checkOnMount?: boolean;
  permissions?: string[];
  redirectTo?: string;
}

export const useProtectedRoutes = ({
  permissions = [],
  allowedRoles = ["ADMIN", "USER"],
  checkOnMount = true,
  redirectTo = "/",
}: Props = {}) => {
  const toastShown = React.useRef<string | null>(null);
  const { user } = useUserStore();
  const router = useRouter();

  const showErrorToast = React.useCallback((title: string, description: string, id: string) => {
    if (toastShown.current !== id) {
      toast.error(title, { description, id, richColors: true });
      toastShown.current = id;
    }
  }, []);

  const userPermissionNames = new Set(user?.permissions.map((permission) => permission));
  const hasPermissionAccess = permissions.length === 0 || permissions.some((p) => userPermissionNames.has(p));
  const hasRoleAccess = user?.role?.length && allowedRoles.includes(user.role);
  const hasAccess = Boolean(hasRoleAccess || hasPermissionAccess);

  const checkAccess = React.useCallback(() => {
    if (!user) {
      showErrorToast("Authentication Required", "Please log in to access this page", "auth-required");
      router.replace(redirectTo || "/signin");
      return false;
    }
    if (!hasAccess) {
      showErrorToast("Access Denied", "You don't have permission to access this page", "access-denied");
      router.back();
      return false;
    }
    return true;
  }, [user, hasAccess, redirectTo, router, showErrorToast]);

  React.useEffect(() => {
    if (checkOnMount) checkAccess();
    return () => {
      toastShown.current = null;
    };
  }, [checkAccess, checkOnMount]);

  return { hasAccess, checkAccess, user };
};
