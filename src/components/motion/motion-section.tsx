"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

import {
  fadeInUpVariants,
  slideUpVariants,
  slideLeftVariants,
  slideRightVariants,
  scaleVariants,
  useReducedMotion,
  getReducedMotionVariants,
} from "@/lib/motion";
import { cn } from "@/lib";

type AnimationVariant = "fadeUp" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "custom";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  customVariants?: Variants;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  as?: "section" | "div" | "article" | "aside";
}

const variantMap: Record<Exclude<AnimationVariant, "custom">, Variants> = {
  fadeUp: fadeInUpVariants,
  slideUp: slideUpVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  scale: scaleVariants,
};

export const MotionSection = ({
  children,
  className,
  variant = "fadeUp",
  customVariants,
  delay = 0,
  once = true,
  amount = 0.3,
  as = "section",
}: MotionSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const shouldReduceMotion = useReducedMotion();

  const baseVariants = variant === "custom" ? (customVariants ?? fadeInUpVariants) : variantMap[variant];
  const variants = getReducedMotionVariants(shouldReduceMotion ?? false, baseVariants);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      // @ts-expect-error - using as prop to render different elements
      as={as}
    >
      {children}
    </motion.div>
  );
};

// Simplified hook for custom implementations
export const useScrollReveal = (options?: { once?: boolean; amount?: number | "some" | "all" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: options?.once ?? true, amount: options?.amount ?? 0.3 });

  return { ref, isInView };
};
