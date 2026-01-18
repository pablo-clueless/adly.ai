/* eslint-disable @typescript-eslint/no-explicit-any */

import { render } from "@testing-library/react";

import AuthLayout from "../../(auth)/layout";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: () => <input data-testid="input" />,
}));

describe("RootLayout", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders with correct structure", () => {
    const { container } = render(<AuthLayout>Test content</AuthLayout>);

    expect(container.querySelector("video")).toBeInTheDocument();
  });
});
