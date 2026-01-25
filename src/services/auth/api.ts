import { createApi } from "@reduxjs/toolkit/query/react";

import type { ChangePasswordDto, GoogleSigninDto, HttpResponse, ResetConfirmDto, SignInDto, SignUpDto } from "@/types";
import { baseQuery } from "../base";

export const authApi = createApi({
  baseQuery,
  reducerPath: "auth",
  tagTypes: ["Auth", "Users"],
  endpoints: (builder) => ({
    signup: builder.mutation<HttpResponse<unknown>, SignUpDto>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    signin: builder.mutation<HttpResponse<unknown>, SignInDto>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    signout: builder.mutation<HttpResponse<unknown>, { refresh: string }>({
      query: (data) => ({
        url: "/auth/logout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    google: builder.mutation<HttpResponse<unknown>, GoogleSigninDto>({
      query: (data) => ({
        url: "/auth/google",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    refresh: builder.mutation<HttpResponse<unknown>, { refresh: string }>({
      query: (data) => ({
        url: "/auth/token/refresh",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    verify: builder.mutation<HttpResponse<unknown>, string>({
      query: (token) => ({
        url: `/auth/verify-email/${token}`,
        method: "GET",
      }),
      invalidatesTags: ["Users"],
    }),
    changePassword: builder.mutation<HttpResponse<unknown>, ChangePasswordDto>({
      query: (data) => ({
        url: "/auth/password/change",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    resetPassword: builder.mutation<HttpResponse<unknown>, { email: string }>({
      query: (data) => ({
        url: "/auth/password/reset",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    confirmResetPassword: builder.mutation<HttpResponse<unknown>, ResetConfirmDto>({
      query: (data) => ({
        url: "/auth/password/reset/confirm",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useConfirmResetPasswordMutation,
  useGoogleMutation,
  useRefreshMutation,
  useResetPasswordMutation,
  useSigninMutation,
  useSignoutMutation,
  useSignupMutation,
  useVerifyMutation,
} = authApi;
