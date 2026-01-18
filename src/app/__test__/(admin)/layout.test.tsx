import { render } from "@testing-library/react";

import AdminLayout from "../../(admin)/admin/layout";

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

jest.mock("@/components/providers/with-auth", () => ({
  WithAuth: ({ children }: { children: React.ReactNode }) => <div data-testid="with-auth">{children}</div>,
}));

jest.mock("@/components/shared", () => ({
  Header: () => <div data-testid="header">Header</div>,
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe("AdminLayout", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders with correct structure", () => {
    const { container } = render(<AdminLayout>Test content</AdminLayout>);

    expect(container.querySelector('[data-testid="with-auth"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="header"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="sidebar"]')).toBeInTheDocument();
  });
});
