import Cookies from "js-cookie";

import { createPersistMiddleware } from "../middleware";
import type { Maybe, UserProps } from "@/types";

interface SignOutOptions {
  callbackUrl?: string;
  clearStorage?: boolean;
  redirectUrl?: string;
  soft?: boolean;
}

interface SignInOptions {
  expiresIn?: number;
  redirectUrl?: string;
  remember?: boolean;
}

interface UserStore {
  hydrate: () => void;
  isHydrated: boolean;
  signin: (data: UserProps, token: string, options?: SignInOptions) => void;
  signout: (options?: SignOutOptions) => void;
  user: Maybe<UserProps>;
}

export const STORAGE_KEY = "user-store";
export const COOKIE_NAME = "";
const COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  expires: 30,
};

class UserManager {
  static clearUserData(clearStorage = true) {
    Cookies.remove(COOKIE_NAME, { path: "/" });
    if (clearStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  static redirect(path: string = "/signin") {
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  }

  static getCookieOptions(remember?: boolean, expiresIn?: number) {
    return {
      ...COOKIE_OPTIONS,
      expires: remember ? expiresIn || 30 : undefined,
    };
  }

  static getStoredUser(): UserProps | null {
    if (typeof window === "undefined") return null;
    try {
      const user = Cookies.get(COOKIE_NAME);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
}

const useUserStore = createPersistMiddleware<UserStore>(STORAGE_KEY, (set, get) => ({
  user: {
    createdAt: new Date(),
    email: "johnnyappleseed@example.com",
    id: "1",
    image: "/assets/images/avatar.png",
    name: "Johnny Appleseed",
    permissions: [],
    role: "ADMIN",
    updatedAt: new Date(),
  },
  isHydrated: false,
  hydrate: () => {
    if (typeof window !== "undefined" && !get().isHydrated) {
      const user = UserManager.getStoredUser();
      set({ user, isHydrated: true });
    }
  },
  signin: (user, token, options) => {
    try {
      const cookieOptions = UserManager.getCookieOptions(options?.remember, options?.expiresIn);
      Cookies.set(COOKIE_NAME, token, cookieOptions);
      set({ user });
      if (options?.redirectUrl) {
        UserManager.redirect(options.redirectUrl);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      throw new Error("Failed to sign in user");
    }
  },
  signout: (options) => {
    try {
      if (options?.soft) {
        set({ user: null });
        return;
      }
      UserManager.clearUserData(options?.clearStorage ?? true);
      set({ user: null });
      UserManager.redirect(options?.redirectUrl || options?.callbackUrl);
    } catch (error) {
      console.error("Sign out failed:", error);
      UserManager.clearUserData(options?.clearStorage ?? true);
      UserManager.redirect(options?.redirectUrl || options?.callbackUrl);
    }
  },
}));

export { useUserStore };
