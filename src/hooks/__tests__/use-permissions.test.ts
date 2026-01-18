/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook } from "@testing-library/react";

import { usePermissions, type PermissionMode } from "../use-permissions";
import type { UserProps } from "@/types";

const makeUser = (overrides: Partial<UserProps> = {}): UserProps =>
  ({
    id: "u1",
    name: "Test User",
    email: "t@example.com",
    role: "admin",
    permissions: ["read", "write", "delete"],
    ...overrides,
  }) as unknown as UserProps;

const exec = (mode: PermissionMode, permissions: string[], user: UserProps | null) =>
  renderHook(() => usePermissions({ mode, permissions, user }));

describe("usePermissions", () => {
  it("returns false when user is null", () => {
    const { result } = exec("any", ["read"], null);
    expect(result.current).toBe(false);
  });

  it("returns false when user has no role", () => {
    const user = makeUser({ role: undefined as any });
    const { result } = exec("any", ["read"], user);
    expect(result.current).toBe(false);
  });

  it("returns false when user has empty permissions", () => {
    const user = makeUser({ permissions: [] });
    const { result } = exec("any", ["read"], user);
    expect(result.current).toBe(false);
  });

  it("mode any: true when user has at least one permission", () => {
    const user = makeUser({ permissions: ["read"] });
    const { result } = exec("any", ["write", "read"], user);
    expect(result.current).toBe(true);
  });

  it("mode any: false when user lacks all requested permissions", () => {
    const user = makeUser({ permissions: ["read"] });
    const { result } = exec("any", ["write", "delete"], user);
    expect(result.current).toBe(false);
  });

  it("mode one: true when user has exactly one permission", () => {
    const user = makeUser({ permissions: ["read", "extra"] });
    const { result } = exec("one", ["write", "read"], user);
    expect(result.current).toBe(true);
  });

  it("mode one: false when user has none of the permissions", () => {
    const user = makeUser({ permissions: ["extra"] });
    const { result } = exec("one", ["write", "read"], user);
    expect(result.current).toBe(false);
  });

  it("mode one: false when user has more than one of the permissions", () => {
    const user = makeUser({ permissions: ["write", "read", "other"] });
    const { result } = exec("one", ["write", "read"], user);
    expect(result.current).toBe(false);
  });

  it("mode strict: true when user has all permissions", () => {
    const user = makeUser({ permissions: ["write", "read", "delete"] });
    const { result } = exec("strict", ["write", "read"], user);
    expect(result.current).toBe(true);
  });

  it("mode strict: false when user is missing any permission", () => {
    const user = makeUser({ permissions: ["write"] });
    const { result } = exec("strict", ["write", "read"], user);
    expect(result.current).toBe(false);
  });

  it("memoizes based on inputs: changes result when inputs change", () => {
    const user = makeUser({ permissions: ["read"] });
    const { result, rerender } = renderHook(({ m, p, u }) => usePermissions({ mode: m, permissions: p, user: u }), {
      initialProps: { m: "any" as PermissionMode, p: ["read"], u: user },
    });
    expect(result.current).toBe(true);

    rerender({ m: "any", p: ["write"], u: user });
    expect(result.current).toBe(false);

    const newUser = makeUser({ permissions: ["write"] });
    rerender({ m: "any", p: ["write"], u: newUser });
    expect(result.current).toBe(true);
  });
});
