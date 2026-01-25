"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { pageVariants, pageSlideVariants, useReducedMotion, getReducedMotionVariants } from "@/lib/motion";
import { cn } from "@/lib";

interface MotionPageProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "slide";
  mode?: "wait" | "sync" | "popLayout";
}

export const MotionPage = ({ children, className, variant = "fade", mode = "wait" }: MotionPageProps) => {
  const shouldReduceMotion = useReducedMotion();
  const baseVariants = variant === "slide" ? pageSlideVariants : pageVariants;
  const variants = getReducedMotionVariants(shouldReduceMotion ?? false, baseVariants);

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        className={cn("h-full w-full", className)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Wrapper for pages that need key-based transitions
interface MotionPageWrapperProps {
  children: React.ReactNode;
  pageKey: string;
  className?: string;
  variant?: "fade" | "slide";
}

export const MotionPageWrapper = ({ children, pageKey, className, variant = "fade" }: MotionPageWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();
  const baseVariants = variant === "slide" ? pageSlideVariants : pageVariants;
  const variants = getReducedMotionVariants(shouldReduceMotion ?? false, baseVariants);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        className={cn("h-full w-full", className)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
