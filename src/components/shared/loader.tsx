"use client";

import { motion, type Variants } from "framer-motion";

import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib";

interface LoaderProps {
  className?: string;
  variant?: "spinner" | "dots" | "pulse";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
}

const sizeMap = {
  sm: { container: "size-4", dot: "size-1.5" },
  md: { container: "size-8", dot: "size-2" },
  lg: { container: "size-12", dot: "size-3" },
};

const colorMap = {
  primary: "border-primary-500 bg-primary-500",
  white: "border-white bg-white",
  gray: "border-gray-400 bg-gray-400",
};

const Spinner = ({ size = "md", color = "primary" }: Pick<LoaderProps, "size" | "color">) => {
  const shouldReduceMotion = useReducedMotion();
  const { container } = sizeMap[size];

  return (
    <motion.div
      className={cn("rounded-full border-2 border-t-transparent", container, colorMap[color].split(" ")[0])}
      animate={shouldReduceMotion ? {} : { rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const dotsContainerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const dotVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 0, -4],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Dots = ({ size = "md", color = "primary" }: Pick<LoaderProps, "size" | "color">) => {
  const shouldReduceMotion = useReducedMotion();
  const { dot } = sizeMap[size];

  if (shouldReduceMotion) {
    return (
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cn("rounded-full", dot, colorMap[color].split(" ")[1])} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="flex items-center gap-1"
      variants={dotsContainerVariants}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className={cn("rounded-full", dot, colorMap[color].split(" ")[1])} variants={dotVariants} />
      ))}
    </motion.div>
  );
};

const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Pulse = ({ size = "md", color = "primary" }: Pick<LoaderProps, "size" | "color">) => {
  const shouldReduceMotion = useReducedMotion();
  const { container } = sizeMap[size];

  if (shouldReduceMotion) {
    return <div className={cn("rounded-full", container, colorMap[color].split(" ")[1])} />;
  }

  return (
    <motion.div
      className={cn("rounded-full", container, colorMap[color].split(" ")[1])}
      variants={pulseVariants}
      initial="initial"
      animate="animate"
    />
  );
};

export const Loader = ({ className, variant = "spinner", size = "md", color = "primary" }: LoaderProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {variant === "spinner" && <Spinner size={size} color={color} />}
      {variant === "dots" && <Dots size={size} color={color} />}
      {variant === "pulse" && <Pulse size={size} color={color} />}
    </div>
  );
};

interface PageLoaderProps {
  className?: string;
  variant?: "spinner" | "dots" | "pulse";
  message?: string;
}

export const PageLoader = ({ className, variant = "spinner", message }: PageLoaderProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("fixed inset-0 z-9999 grid place-items-center bg-white", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader variant={variant} size="lg" />
        {message && (
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

interface ButtonLoaderProps {
  className?: string;
  color?: "primary" | "white" | "gray";
}

export const ButtonLoader = ({ className, color = "white" }: ButtonLoaderProps) => {
  return <Loader className={className} variant="spinner" size="sm" color={color} />;
};
