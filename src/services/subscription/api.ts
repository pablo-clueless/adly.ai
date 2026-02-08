import { createApi } from "@reduxjs/toolkit/query/react";

import type { HttpResponse } from "@/types";
import { baseQuery } from "../base";

export const subscriptionApi = createApi({
  baseQuery,
  reducerPath: "subscription",
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({
    cancelSubscription: builder.mutation<HttpResponse<unknown>, { at_period_end: boolean }>({
      query: (body) => ({
        url: `/subscriptions/cancel/`,
        method: "POST",
        body,
      }),
    }),
    checkoutSubscription: builder.mutation<
      HttpResponse<unknown>,
      {
        plan_id: string;
        success_url: string;
        cancel_url: string;
      }
    >({
      query: (body) => ({
        url: `/subscriptions/checkout/`,
        method: "POST",
        body,
      }),
    }),
    upgradeSubscription: builder.mutation<HttpResponse<unknown>, { plan_id: string }>({
      query: (body) => ({
        url: `/subscriptions/upgrade/`,
        method: "POST",
        body,
      }),
    }),
    stripe: builder.mutation<HttpResponse<unknown>, { return_url: string }>({
      query: (body) => ({
        url: `/subscriptions/billing-portal/`,
        method: "POST",
        body,
      }),
    }),
    getUsage: builder.query<HttpResponse<unknown>, null>({
      query: () => ({
        url: `billing/usage/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCancelSubscriptionMutation,
  useCheckoutSubscriptionMutation,
  useGetUsageQuery,
  useStripeMutation,
  useUpgradeSubscriptionMutation,
} = subscriptionApi;
