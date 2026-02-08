import { configureStore } from "@reduxjs/toolkit";

import { subscriptionApi } from "./subscription/api";
import { audienceApi } from "./audience/api";
import { campaignApi } from "./campaign/api";
import { authApi } from "./auth/api";
import { adApi } from "./ad/api";

export const store = configureStore({
  reducer: {
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [audienceApi.reducerPath]: audienceApi.reducer,
    [campaignApi.reducerPath]: campaignApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adApi.reducerPath]: adApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(subscriptionApi.middleware)
      .concat(audienceApi.middleware)
      .concat(campaignApi.middleware)
      .concat(authApi.middleware)
      .concat(adApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
