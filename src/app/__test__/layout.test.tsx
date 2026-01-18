import { render } from "@testing-library/react";

import RootLayout, { metadata } from "../layout";

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

jest.mock("@/components/providers/error-boundary", () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div data-testid="error-boundary">{children}</div>,
}));

jest.mock("@/components/providers/redux", () => ({
  Redux: ({ children }: { children: React.ReactNode }) => <div data-testid="redux">{children}</div>,
}));

jest.mock("@/components/ui/sonner", () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

describe("RootLayout", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders with correct structure", () => {
    const { container } = render(<RootLayout>Test content</RootLayout>);

    expect(container.querySelector('[data-testid="error-boundary"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="redux"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="toaster"]')).toBeInTheDocument();
  });

  it("has correct metadata", () => {
    expect(metadata.title).toBe("Adflow.ai - Ads management simplified");
    expect(metadata.description).toBe(
      "Streamline your advertising campaigns with Adflow.ai – the all-in-one platform for creating, managing, and optimizing ads across channels. Boost ROI with AI-driven insights, real-time analytics, and collaborative workflows.",
    );
  });
});
