import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../base";

export const audienceApi = createApi({
  baseQuery,
  reducerPath: "audience",
  tagTypes: ["Audience"],
  endpoints: () => ({}),
});

export const {} = audienceApi;
