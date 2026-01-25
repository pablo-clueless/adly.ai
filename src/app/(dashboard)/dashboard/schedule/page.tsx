"use client";

import { useCallback, useMemo, useState } from "react";
import { addMonths, format, isToday, isSameMonth } from "date-fns";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";

import { useReducedMotion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import type { DayItemProps } from "@/types";
import { cn } from "@/lib";

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
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const handlePreviousMonth = useCallback(() => {
    setDirection(-1);
    setCurrentMonth((prev) => addMonths(prev, -1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setDirection(1);
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
          <p className="mt-1 text-sm text-gray-500">{totalScheduled} campaigns scheduled this month</p>
        </div>
      </div>

      <div className="h-[calc(100%-80px)] w-full space-y-4">
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
                const scheduledAd = day ? getScheduledAdsForDate(day) : null;

                return (
                  <motion.div
                    key={index}
                    className={cn(
                      "relative min-h-[80px] border-r border-b p-3 transition-colors",
                      index % 7 === 6 && "border-r-0",
                      day && "cursor-pointer hover:bg-gray-50",
                      !isCurrentMonth && "bg-gray-50/50",
                    )}
                    whileHover={shouldReduceMotion || !day ? undefined : { backgroundColor: "rgba(0,0,0,0.02)" }}
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
                          <motion.div
                            className="space-y-1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <div className="bg-primary-100 text-primary-700 rounded-md px-2 py-1 text-xs font-medium">
                              {scheduledAd.schedule.length} campaign{scheduledAd.schedule.length !== 1 ? "s" : ""}
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Page;
