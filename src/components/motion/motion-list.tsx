"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

import {
  staggerContainerVariants,
  staggerItemVariants,
  staggerScaleItemVariants,
  createStaggerVariants,
  useReducedMotion,
  getReducedMotionVariants,
} from "@/lib/motion";
import { cn } from "@/lib";

interface MotionListProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

export const MotionList = ({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0.1,
  once = true,
  amount = 0.2,
}: MotionListProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const shouldReduceMotion = useReducedMotion();

  const baseVariants = createStaggerVariants(staggerDelay, delayChildren);
  const variants = getReducedMotionVariants(shouldReduceMotion ?? false, baseVariants);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

interface MotionListItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: "slide" | "scale";
  customVariants?: Variants;
}

export const MotionListItem = ({ children, className, variant = "slide", customVariants }: MotionListItemProps) => {
  const shouldReduceMotion = useReducedMotion();

  const baseVariants = customVariants ?? (variant === "scale" ? staggerScaleItemVariants : staggerItemVariants);
  const variants = getReducedMotionVariants(shouldReduceMotion ?? false, baseVariants);

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
};

// Pre-configured grid variant
interface MotionGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 6;
  gap?: number;
  staggerDelay?: number;
}

export const MotionGrid = ({ children, className, staggerDelay = 0.08 }: MotionGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = getReducedMotionVariants(shouldReduceMotion ?? false, staggerContainerVariants);

  return (
    <motion.div
      ref={ref}
      className={cn("grid", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...containerVariants,
        visible: {
          ...containerVariants.visible,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
