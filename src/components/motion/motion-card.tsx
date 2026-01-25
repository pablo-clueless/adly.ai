"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

import { cardHoverVariants, hoverLiftVariants, staggerItemVariants, useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "scale" | "lift" | "both" | "none";
  as?: "div" | "article" | "li";
  onClick?: () => void;
  isListItem?: boolean;
}

export const MotionCard = ({
  children,
  className,
  hoverEffect = "scale",
  as = "div",
  onClick,
  isListItem = false,
}: MotionCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  const Component = motion[as];

  const getHoverProps = () => {
    if (shouldReduceMotion || hoverEffect === "none") {
      return {};
    }

    switch (hoverEffect) {
      case "lift":
        return {
          initial: hoverLiftVariants.initial,
          whileHover: hoverLiftVariants.hover,
        };
      case "both":
        return {
          initial: { scale: 1, y: 0 },
          whileHover: { scale: 1.02, y: -4 },
          whileTap: { scale: 0.98 },
        };
      case "scale":
      default:
        return {
          initial: cardHoverVariants.initial,
          whileHover: cardHoverVariants.hover,
          whileTap: cardHoverVariants.tap,
        };
    }
  };

  const listItemVariants: Variants | undefined = isListItem ? staggerItemVariants : undefined;

  return (
    <Component
      className={cn("transition-shadow", className)}
      variants={listItemVariants}
      onClick={onClick}
      {...getHoverProps()}
    >
      {children}
    </Component>
  );
};

// Simple hover wrapper for any element
interface HoverScaleProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  disabled?: boolean;
}

export const HoverScale = ({ children, className, scale = 1.02, disabled = false }: HoverScaleProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
};
