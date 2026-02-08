"use client";

import { RiNotification3Line } from "@remixicon/react";
import { usePathname } from "next/navigation";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/store/stores";
import { ScrollArea } from "./scroll-area";
import { Button } from "../ui/button";
import { getTitle } from "@/lib";

export const Header = () => {
  const { signout, user } = useUserStore();
  const pathname = usePathname();

  return (
    <header className="flex h-14 w-full items-center border-b">
      <div className="flex w-full items-center justify-between px-4">
        <div className="text-xl font-medium">{getTitle(pathname)}</div>
        <div className="flex items-center gap-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <button className="grid size-8 place-items-center rounded-full border">
                <RiNotification3Line className="size-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="mr-16 h-100 space-y-2">
              <div className="flex w-full items-center justify-between">
                <p className="text-sm">Notifications</p>
              </div>
              <hr />
              <ScrollArea className="w-ful h-[calc(100%-36px)]">
                <div></div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
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
