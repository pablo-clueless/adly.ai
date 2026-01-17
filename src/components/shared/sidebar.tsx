"use client";

import { RiLayoutLeft2Line } from "@remixicon/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { ADMIN_ROUTES, DASHBOARD_ROUTES } from "@/config/routes";
import { useGlobalStore } from "@/store/stores";
import { cn, normalize } from "@/lib";

interface Props {
  type: "admin" | "dashboard";
}

export const Sidebar = ({ type }: Props) => {
  const routes = type === "admin" ? ADMIN_ROUTES : DASHBOARD_ROUTES;
  const { isSidebarOpen, setIsSidebarOpen } = useGlobalStore();
  const pathname = usePathname();
  const isOnPath = (href: string) => href === normalize(pathname);

  return (
    <aside
      className={cn(
        "h-full border-r transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-[285px]" : "w-[72px]",
      )}
    >
      <div
        className={cn(
          "flex h-14 w-full items-center border-b px-4 transition-all duration-300",
          isSidebarOpen ? "justify-between" : "justify-center",
        )}
      >
        <p
          className={cn(
            "text-lg font-semibold transition-all duration-300",
            isSidebarOpen ? "opacity-100" : "w-0 opacity-0",
          )}
        >
          Adflow.ai
        </p>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn("transition-transform duration-300", !isSidebarOpen && "rotate-180")}
        >
          <RiLayoutLeft2Line className="size-5" />
        </button>
      </div>

      <div className="h-[calc(100%-56px)] w-full p-4">
        <div className="space-y-4">
          {routes.map(({ href, icon: Icon, label }, index) => (
            <Link
              className={cn(
                "flex items-center gap-x-4 rounded-md px-3 py-2 text-sm transition-colors",
                isOnPath(href) ? "text-primary-500 font-semibold" : "text-gray-500 hover:bg-gray-300",
              )}
              href={href}
              key={index}
            >
              <Icon className="size-5 shrink-0" />
              <span
                className={cn(
                  "whitespace-nowrap transition-all duration-300",
                  isSidebarOpen ? "opacity-100" : "w-0 opacity-0",
                )}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
