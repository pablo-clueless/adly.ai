"use client";

import { useRouter } from "next/navigation";
import React from "react";

import type { Maybe, UserProps } from "@/types";

export const useRbacRedirect = () => {
  const router = useRouter();

  const handleRbacRedirect = React.useCallback(
    (user: Maybe<UserProps>) => {
      if (!user || !user.role) {
        router.push("/signin");
        return;
      }
      const redirect = user.role === "ADMIN" ? "/admin" : "/dashboard";
      router.push(redirect);
    },
    [router],
  );

  return handleRbacRedirect;
};
