"use client";

import { usePathname } from "next/navigation";
import {
  RiNotification3Line,
  RiErrorWarningLine,
  RiInformationLine,
  RiCheckboxCircleLine,
  RiSettings3Line,
  RiAlertLine,
} from "@remixicon/react";

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { NotificationType } from "@/types";
import { useUserStore } from "@/store/stores";
import { ScrollArea } from "./scroll-area";
import { Button } from "../ui/button";
import { cn, getTitle } from "@/lib";

import { MOCK_NOTIFICATIONS } from "@/__mock__";

const notificationConfig: Record<NotificationType, { icon: typeof RiInformationLine; className: string }> = {
  ERROR: { icon: RiErrorWarningLine, className: "text-red-500 bg-red-50" },
  INFO: { icon: RiInformationLine, className: "text-blue-500 bg-blue-50" },
  SUCCESS: { icon: RiCheckboxCircleLine, className: "text-green-500 bg-green-50" },
  SYSTEM: { icon: RiSettings3Line, className: "text-gray-500 bg-gray-50" },
  WARNING: { icon: RiAlertLine, className: "text-yellow-500 bg-yellow-50" },
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export const Header = () => {
  const { signout, user } = useUserStore();
  const pathname = usePathname();

  return (
    <header className="flex h-14 w-full items-center border-b">
      <div className="flex w-full items-center justify-between px-4">
        <div className="text-xl font-medium">{getTitle(pathname)}</div>
        <div className="flex items-center gap-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="grid size-8 place-items-center rounded-full border">
                <RiNotification3Line className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent className="space-y-2 p-6">
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription hidden></SheetDescription>
              <hr />
              <ScrollArea className="h-[calc(100%-36px)] w-full">
                <div className="w-full space-y-2">
                  {MOCK_NOTIFICATIONS.map((notification) => {
                    const config = notificationConfig[notification.type];
                    const Icon = config.icon;
                    const isUnread = notification.status === "unread";

                    return (
                      <div
                        className={cn(
                          "cursor-pointer rounded-md border p-3 transition-colors hover:bg-gray-50",
                          isUnread && "border-primary-200 bg-primary-50/30",
                        )}
                        key={notification.id}
                      >
                        <div className="flex gap-3">
                          <div className={cn("grid size-8 shrink-0 place-items-center rounded-full", config.className)}>
                            <Icon className="size-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className={cn("truncate text-sm font-medium capitalize", isUnread && "font-semibold")}>
                                {notification.title}
                              </p>
                              {isUnread && <span className="bg-primary-500 size-2 shrink-0 rounded-full" />}
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs text-gray-600">{notification.message}</p>
                            <p className="mt-2 text-xs text-gray-400">{formatTimestamp(notification.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex h-8 cursor-pointer items-center gap-x-3">
                <Avatar className="size-8 cursor-pointer border">
                  <AvatarImage src={user?.profile.avatar_url || ""} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="">
                  <p className="text-xs">{user?.full_name}</p>
                  <p className="text-[10px] text-gray-600">{user?.email}</p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-4 space-y-2">
              <div className="flex items-center gap-x-2">
                <Avatar className="border">
                  <AvatarImage src={user?.profile.avatar_url || ""} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="">
                  <p className="text-sm">{user?.full_name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>
              <hr />
              <div className="space-y-2">
                <Button className="w-full" onClick={() => signout({ soft: false })} size="sm" variant="destructive">
                  Sign Out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
