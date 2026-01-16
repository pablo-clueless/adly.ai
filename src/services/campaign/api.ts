import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../base";

export const campaignApi = createApi({
  baseQuery,
  reducerPath: "campaign",
  tagTypes: ["Campaign"],
  endpoints: () => ({}),
});

export const {} = campaignApi;
