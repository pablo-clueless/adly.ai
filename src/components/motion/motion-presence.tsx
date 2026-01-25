"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import React from "react";

import { fadeVariants, scaleVariants, slideUpVariants, useReducedMotion, getReducedMotionVariants } from "@/lib/motion";
import { cn } from "@/lib";

type PresenceVariant = "fade" | "scale" | "slideUp" | "custom";

interface MotionPresenceProps {
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
  variant?: PresenceVariant;
  customVariants?: Variants;
  mode?: "wait" | "sync" | "popLayout";
  presenceKey?: string;
}

const variantMap: Record<Exclude<PresenceVariant, "custom">, Variants> = {
  fade: fadeVariants,
  scale: scaleVariants,
  slideUp: slideUpVariants,
};

export const MotionPresence = ({
  children,
  isVisible,
  className,
  variant = "fade",
  customVariants,
  mode = "wait",
  presenceKey,
}: MotionPresenceProps) => {
  const shouldReduceMotion = useReducedMotion();

  const baseVariants = variant === "custom" ? (customVariants ?? fadeVariants) : variantMap[variant];
  const variants = getReducedMotionVariants(shouldReduceMotion ?? false, baseVariants);

  return (
    <AnimatePresence mode={mode}>
      {isVisible && (
        <motion.div
          key={presenceKey}
          className={cn(className)}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// For conditional content that toggles
interface TogglePresenceProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: PresenceVariant;
}

export const TogglePresence = ({ show, children, className, variant = "fade" }: TogglePresenceProps) => {
  return (
    <MotionPresence isVisible={show} className={className} variant={variant}>
      {children}
    </MotionPresence>
  );
};

// For dialog/modal overlays
interface OverlayPresenceProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const OverlayPresence = ({ isOpen, children, className, onClose }: OverlayPresenceProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className={cn("fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2", className)}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
