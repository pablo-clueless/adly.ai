"use client";

import { addMonths, format, isToday, isSameMonth, isSameDay } from "date-fns";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import { ScrollArea } from "@/components/shared";
import { useReducedMotion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import type { AdProps } from "@/types";
import { AD_STATUS } from "@/config";
import { cn } from "@/lib";

import { MOCK_ADS } from "@/__mock__";

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const MAX_VISIBLE_ADS = 2;

const Page = () => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [direction, setDirection] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const scheduled = useMemo(() => MOCK_ADS.filter((ad) => ad.status === "scheduled"), []);

  const handlePreviousMonth = useCallback(() => {
    setDirection(-1);
    setCurrentMonth((prev) => addMonths(prev, -1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setDirection(1);
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const getScheduledAdsForDate = useCallback(
    (date: Date): AdProps[] => {
      return scheduled.filter((ad) => ad.published_at && isSameDay(new Date(ad.published_at), date));
    },
    [scheduled],
  );

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
    return scheduled.filter((ad) => ad.published_at && isSameMonth(new Date(ad.published_at), currentMonth)).length;
  }, [currentMonth, scheduled]);

  const selectedDayAds = useMemo(() => {
    if (!selectedDay) return [];
    return getScheduledAdsForDate(selectedDay);
  }, [selectedDay, getScheduledAdsForDate]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <motion.div className="h-full w-full space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="text-2xl font-semibold">Schedule</p>
          <p className="mt-1 text-sm text-gray-500">{totalScheduled} ads scheduled this month</p>
        </div>
      </div>
      <div className="flex h-[calc(100%-80px)] w-full gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={format(currentMonth, "MMMM yyyy")}
                className="text-lg font-semibold"
                custom={direction}
                variants={shouldReduceMotion ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {format(currentMonth, "MMMM yyyy")}
              </motion.p>
            </AnimatePresence>
            <div className="flex items-center gap-x-2">
              <Button onClick={handlePreviousMonth} size="sm" variant="outline" className="h-8 w-8 p-0">
                <RiArrowLeftSLine className="size-5" />
              </Button>
              <Button onClick={handleNextMonth} size="sm" variant="outline" className="h-8 w-8 p-0">
                <RiArrowRightSLine className="size-5" />
              </Button>
            </div>
          </div>
          <motion.div
            className="h-[calc(100%-48px)] overflow-hidden rounded-lg border"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-7 border-b bg-gray-50">
              {daysOfTheWeek.map((day, index) => (
                <motion.div
                  key={day}
                  className="p-3 text-center text-xs font-semibold tracking-wide text-gray-600 uppercase"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  {day}
                </motion.div>
              ))}
            </div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={format(currentMonth, "yyyy-MM")}
                className="grid h-[calc(100%-40px)] auto-rows-fr grid-cols-7"
                custom={direction}
                variants={shouldReduceMotion ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {daysOfTheMonth.map((day, index) => {
                  const isCurrentDay = day && isToday(day);
                  const isCurrentMonth = day && isSameMonth(day, currentMonth);
                  const isSelected = day && selectedDay && isSameDay(day, selectedDay);
                  const ads = day ? getScheduledAdsForDate(day) : [];
                  const visibleAds = ads.slice(0, MAX_VISIBLE_ADS);
                  const remainingCount = ads.length - MAX_VISIBLE_ADS;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => day && setSelectedDay(day)}
                      className={cn(
                        "relative min-h-[80px] border-r border-b p-2 text-left transition-colors",
                        index % 7 === 6 && "border-r-0",
                        day && "cursor-pointer hover:bg-gray-50",
                        !day && "cursor-default",
                        !isCurrentMonth && "bg-gray-50/50",
                        isSelected && "bg-primary-50 ring-primary-500 ring-2 ring-inset",
                      )}
                      whileHover={shouldReduceMotion || !day ? undefined : { backgroundColor: "rgba(0,0,0,0.02)" }}
                    >
                      {day && (
                        <>
                          <div className="mb-1 flex items-start justify-between">
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
                            {ads.length > 0 && (
                              <span className="bg-primary-100 text-primary-700 rounded-full px-1.5 py-0.5 text-[10px] font-semibold">
                                {ads.length}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1">
                            {visibleAds.map((ad) => (
                              <motion.div
                                key={ad.id}
                                className="bg-primary-100 text-primary-700 truncate rounded px-1.5 py-0.5 text-[10px] font-medium"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                              >
                                {ad.title}
                              </motion.div>
                            ))}
                            {remainingCount > 0 && (
                              <div className="text-[10px] font-medium text-gray-500">+{remainingCount} more</div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        <AnimatePresence>
          {selectedDay && (
            <motion.div
              className="h-full w-80 space-y-4 rounded-lg border bg-white p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{format(selectedDay, "MMMM d, yyyy")}</p>
                  <p className="text-sm text-gray-500">{format(selectedDay, "EEEE")}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setSelectedDay(null)}>
                  Close
                </Button>
              </div>
              <div className="h-[calc(100%-64px)] space-y-3">
                <p className="text-sm font-medium text-gray-700">
                  {selectedDayAds.length} ad{selectedDayAds.length !== 1 ? "s" : ""} scheduled
                </p>
                <ScrollArea className="h-[calc(100%-32px)] w-full space-y-2">
                  {selectedDayAds.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center">
                      <p className="text-sm text-gray-500">No ads scheduled for this day</p>
                    </div>
                  ) : (
                    <div className="w-full space-y-2">
                      {selectedDayAds.map((ad) => (
                        <motion.div
                          key={ad.id}
                          className="rounded-lg border border-gray-200 p-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <p className="font-medium">{ad.title}</p>
                          <p className="mt-1 line-clamp-2 text-xs text-gray-500">{ad.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase",
                                AD_STATUS[ad.status],
                              )}
                            >
                              {ad.status}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {format(new Date(ad.published_at), "h:mm a")}
                            </span>
                          </div>
                          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                            <div className="rounded bg-gray-50 p-1.5">
                              <p className="text-xs font-semibold">{ad.reach.toLocaleString()}</p>
                              <p className="text-[10px] text-gray-500">Reach</p>
                            </div>
                            <div className="rounded bg-gray-50 p-1.5">
                              <p className="text-xs font-semibold">{ad.reactions.toLocaleString()}</p>
                              <p className="text-[10px] text-gray-500">Reactions</p>
                            </div>
                            <div className="rounded bg-gray-50 p-1.5">
                              <p className="text-xs font-semibold">{ad.shares.toLocaleString()}</p>
                              <p className="text-[10px] text-gray-500">Shares</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Page;
