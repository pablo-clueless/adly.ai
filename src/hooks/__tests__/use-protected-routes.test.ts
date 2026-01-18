/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useProtectedRoutes } from "../use-protected-routes";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: { error: jest.fn() },
}));

jest.mock("@/store/stores", () => ({
  useUserStore: jest.fn(),
}));

const makeUser = (overrides: Partial<any> = {}) => ({
  id: "u1",
  name: "Test User",
  email: "t@example.com",
  role: "USER",
  permissions: ["read"],
  ...overrides,
});

describe("useProtectedRoutes", () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  };

  const setUser = (user: any) => {
    const { useUserStore } = jest.requireMock("@/store/stores");
    (useUserStore as jest.Mock).mockReturnValue({ user });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("returns hasAccess true when user has allowed role (role-based)", () => {
    setUser(makeUser({ role: "ADMIN" }));

    const { result } = renderHook(() => useProtectedRoutes({ allowedRoles: ["ADMIN"], permissions: [] }));

    expect(result.current.hasAccess).toBe(true);
  });

  it("redirects and toasts when user is null (auth required)", () => {
    setUser(null);

    const { result } = renderHook(() => useProtectedRoutes({ checkOnMount: true, redirectTo: "/signin" }));

    expect(result.current.hasAccess).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Authentication Required",
      expect.objectContaining({ id: "auth-required" }),
    );
    expect(mockRouter.replace).toHaveBeenCalledWith("/signin");
  });

  it("denies access and navigates back when permissions insufficient", () => {
    setUser(makeUser({ role: "USER", permissions: ["read"] }));

    const { result } = renderHook(() => useProtectedRoutes({ permissions: ["admin:write"], checkOnMount: true }));

    expect(result.current.hasAccess).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Access Denied", expect.objectContaining({ id: "access-denied" }));
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("does not duplicate error toasts across multiple checks", () => {
    setUser(null);

    const { result } = renderHook(() => useProtectedRoutes({ checkOnMount: false }));

    expect(result.current.checkAccess()).toBe(false);
    expect(result.current.checkAccess()).toBe(false);

    expect((toast.error as jest.Mock).mock.calls.filter(([title]) => title === "Authentication Required")).toHaveLength(
      1,
    );
  });

  it("resets toast guard on unmount then allows toast again on next mount", () => {
    setUser(null);
    const { result, unmount } = renderHook(() => useProtectedRoutes({ checkOnMount: false }));

    expect(result.current.checkAccess()).toBe(false);
    expect(toast.error).toHaveBeenCalledTimes(1);

    unmount();

    const { result: result2 } = renderHook(() => useProtectedRoutes({ checkOnMount: false }));
    expect(result2.current.checkAccess()).toBe(false);
    expect(toast.error).toHaveBeenCalledTimes(2);
  });

  it("grants access when user has at least one required permission", () => {
    setUser(makeUser({ permissions: ["read"] }));

    const { result } = renderHook(() =>
      useProtectedRoutes({ permissions: ["write", "read"], allowedRoles: ["ADMIN", "USER"] }),
    );

    expect(result.current.hasAccess).toBe(true);
  });

  it("checkOnMount=false does not trigger navigation side-effects automatically", () => {
    setUser(null);

    renderHook(() => useProtectedRoutes({ checkOnMount: false, redirectTo: "/signin" }));

    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockRouter.back).not.toHaveBeenCalled();
  });
});
