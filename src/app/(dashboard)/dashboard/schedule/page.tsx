"use client";
import { useCallback, useMemo, useState } from "react";
import { addMonths, format, isToday, isSameMonth } from "date-fns";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import type { DayItemProps } from "@/types";

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const mockScheduledAds: DayItemProps[] = [
  { date: new Date(2026, 0, 17), schedule: [] },
  { date: new Date(2026, 0, 18), schedule: [] },
  { date: new Date(2026, 0, 19), schedule: [] },
  { date: new Date(2026, 0, 20), schedule: [] },
  { date: new Date(2026, 0, 22), schedule: [] },
  { date: new Date(2026, 0, 25), schedule: [] },
];

const Page = () => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, -1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const getScheduledAdsForDate = useCallback((date: Date) => {
    return mockScheduledAds.find((ad) => ad.date && ad.date.toDateString() === date.toDateString());
  }, []);

  const daysOfTheMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentMonth]);

  const totalScheduled = useMemo(() => {
    return mockScheduledAds.filter((ad) => ad.date && isSameMonth(ad.date, currentMonth)).length;
  }, [currentMonth]);

  return (
    <div className="h-full w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Schedule</p>
          <p className="mt-1 text-sm text-gray-500">{totalScheduled} campaigns scheduled this month</p>
        </div>
      </div>
      <div className="h-[calc(100%-80px)] w-full space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</p>
          <div className="flex items-center gap-x-2">
            <Button onClick={handlePreviousMonth} size="sm" variant="outline" className="h-8 w-8 p-0">
              <RiArrowLeftSLine className="size-5" />
            </Button>
            <Button onClick={handleNextMonth} size="sm" variant="outline" className="h-8 w-8 p-0">
              <RiArrowRightSLine className="size-5" />
            </Button>
          </div>
        </div>
        <div className="h-[calc(100%-48px)] overflow-hidden rounded-lg border">
          <div className="grid grid-cols-7 border-b bg-gray-50">
            {daysOfTheWeek.map((day) => (
              <div key={day} className="p-3 text-center text-xs font-semibold tracking-wide text-gray-600 uppercase">
                {day}
              </div>
            ))}
          </div>
          <div className="grid h-[calc(100%-40px)] auto-rows-fr grid-cols-7">
            {daysOfTheMonth.map((day, index) => {
              const isCurrentDay = day && isToday(day);
              const isCurrentMonth = day && isSameMonth(day, currentMonth);
              const scheduledAd = day ? getScheduledAdsForDate(day) : null;
              return (
                <div
                  key={index}
                  className={cn(
                    "relative min-h-[80px] cursor-pointer border-r border-b p-3 transition-colors",
                    index % 7 === 6 && "border-r-0",
                    day && "cursor-pointer hover:bg-gray-50",
                    !isCurrentMonth && "bg-gray-50/50",
                  )}
                >
                  {day && (
                    <>
                      <div className="mb-2 flex items-start justify-between">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            !isCurrentMonth && "text-gray-400",
                            isCurrentDay &&
                              "bg-primary-600 flex size-7 items-center justify-center rounded-full text-white",
                          )}
                        >
                          {format(day, "d")}
                        </span>
                      </div>
                      {scheduledAd && (
                        <div className="space-y-1">
                          <div className={cn("rounded-md px-2 py-1 text-xs font-medium")}>
                            {scheduledAd.schedule.length} campaign{scheduledAd.schedule.length > 1 ? "s" : ""}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
