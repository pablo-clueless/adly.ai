/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { useRbacRedirect } from "../use-rbac-redirect";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("useRbacRedirect", () => {
  const mockRouter = {
    push: jest.fn(),
  } as unknown as ReturnType<typeof useRouter>;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("redirects to /signin when user is null", () => {
    const { result } = renderHook(() => useRbacRedirect());

    act(() => {
      result.current(null as any);
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/signin");
  });

  it("redirects to /signin when user has no role", () => {
    const { result } = renderHook(() => useRbacRedirect());

    act(() => {
      result.current({ id: "1", name: "No Role" } as any);
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/signin");
  });

  it("redirects ADMIN to /admin", () => {
    const { result } = renderHook(() => useRbacRedirect());

    act(() => {
      result.current({ id: "1", name: "Admin", role: "ADMIN" } as any);
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/admin");
  });

  it("redirects non-admin to /dashboard", () => {
    const { result } = renderHook(() => useRbacRedirect());

    act(() => {
      result.current({ id: "2", name: "User", role: "USER" } as any);
    });

    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });

  it("is memoized and stable across renders (same function reference)", () => {
    const { result, rerender } = renderHook(() => useRbacRedirect());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
