import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../base";

export const adApi = createApi({
  baseQuery,
  reducerPath: "ad",
  tagTypes: ["Ads"],
  endpoints: () => ({}),
});

export const {} = adApi;
