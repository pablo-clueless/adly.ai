"use client";

import { useReducedMotion as framerUseReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";

export const easings = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  spring: { type: "spring", stiffness: 300, damping: 30 } as const,
  springBouncy: { type: "spring", stiffness: 400, damping: 25 } as const,
  springSmooth: { type: "spring", stiffness: 200, damping: 35 } as const,
};

export const transitions = {
  fast: { duration: 0.15, ease: easings.easeOut } as Transition,
  normal: { duration: 0.3, ease: easings.easeOut } as Transition,
  slow: { duration: 0.5, ease: easings.easeOut } as Transition,
  spring: easings.spring as Transition,
  springBouncy: easings.springBouncy as Transition,
  springSmooth: easings.springSmooth as Transition,
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
  exit: { opacity: 0, transition: transitions.fast },
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  exit: { opacity: 0, y: -10, transition: transitions.fast },
};

export const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  exit: { opacity: 0, y: 10, transition: transitions.fast },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.easeOut },
  },
  exit: { opacity: 0, y: -20, transition: transitions.fast },
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.easeOut },
  },
  exit: { opacity: 0, y: 20, transition: transitions.fast },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easings.easeOut },
  },
  exit: { opacity: 0, x: -20, transition: transitions.fast },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easings.easeOut },
  },
  exit: { opacity: 0, x: 20, transition: transitions.fast },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.normal,
  },
  exit: { opacity: 0, scale: 0.95, transition: transitions.fast },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: easings.springSmooth,
  },
  exit: { opacity: 0, scale: 0.9, transition: transitions.fast },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  exit: { opacity: 0, y: -10, transition: transitions.fast },
};

export const staggerScaleItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.normal,
  },
  exit: { opacity: 0, scale: 0.95, transition: transitions.fast },
};

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easings.easeOut },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export const pageSlideVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: easings.easeOut },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export const hoverScaleVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, transition: transitions.fast },
  tap: { scale: 0.98, transition: transitions.fast },
};

export const hoverLiftVariants = {
  initial: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  hover: {
    y: -4,
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    transition: transitions.normal,
  },
};

export const cardHoverVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: easings.springSmooth,
  },
  tap: { scale: 0.98, transition: transitions.fast },
};

export const formContainerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.easeOut,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 15, x: 0 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.3, ease: easings.easeOut },
  },
};

export const shakeVariants: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 },
  },
};

export const useReducedMotion = () => {
  return framerUseReducedMotion();
};

export const getStaggerDelay = (index: number, baseDelay = 0.08) => ({
  delay: index * baseDelay,
});

export const createStaggerVariants = (staggerDelay = 0.08, delayChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

export const getReducedMotionVariants = (shouldReduce: boolean, variants: Variants): Variants => {
  if (shouldReduce) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
      exit: { opacity: 1 },
    };
  }
  return variants;
};
