"use client";

import { RiNotification3Line } from "@remixicon/react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/store/stores";

export const Header = () => {
  const { user } = useUserStore();

  return (
    <header className="flex h-14 w-full items-center border-b">
      <div className="flex w-full items-center justify-between px-4">
        <div className=""></div>
        <div className="flex items-center gap-x-4">
          <button className="grid size-8 place-items-center rounded-full border">
            <RiNotification3Line className="size-4" />
          </button>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="size-8 cursor-pointer border">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mr-4 space-y-2">
              <div className="flex items-center gap-x-2">
                <Avatar className="border">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="">
                  <p className="text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>
              <hr />
              <div className=""></div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
