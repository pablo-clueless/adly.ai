"use client";

import { Provider } from "react-redux";
import React from "react";

import { store } from "@/services";

interface Props {
  children: React.ReactNode;
}

export const Redux = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
