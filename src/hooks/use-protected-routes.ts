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

  const hasAccess = React.useMemo(() => {
    if (!user) return false;

    const hasRoleAccess = user.role && allowedRoles.includes(user.role);

    if (permissions.length === 0) {
      return Boolean(hasRoleAccess);
    }
    const permissionSet = new Set(user.permissions);
    const hasPermissionAccess = permissions.some((p) => permissionSet.has(p));
    return Boolean(hasRoleAccess && hasPermissionAccess);
  }, [user, allowedRoles, permissions]);

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
