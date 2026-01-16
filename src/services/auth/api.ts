import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../base";

export const authApi = createApi({
  baseQuery,
  reducerPath: "auth",
  tagTypes: ["Auth", "Users"],
  endpoints: () => ({}),
});

export const {} = authApi;
