"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatOptions?: Intl.NumberFormatOptions;
}

export const AnimatedCounter = ({
  value,
  className,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  formatOptions,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  const spring = useSpring(0, {
    duration: shouldReduceMotion ? 0 : duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => {
    const formatted = formatOptions
      ? new Intl.NumberFormat("en-US", formatOptions).format(current)
      : decimals > 0
        ? current.toFixed(decimals)
        : Math.round(current).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        spring.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, spring, value, delay]);

  if (shouldReduceMotion) {
    const formattedValue = formatOptions
      ? new Intl.NumberFormat("en-US", formatOptions).format(value)
      : decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString();
    return (
      <span ref={ref} className={cn(className)}>
        {prefix}
        {formattedValue}
        {suffix}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={cn(className)}>
      {display}
    </motion.span>
  );
};

// Simplified version for percentage values
interface AnimatedPercentageProps {
  value: number;
  className?: string;
  duration?: number;
}

export const AnimatedPercentage = ({ value, className, duration = 1.5 }: AnimatedPercentageProps) => {
  return <AnimatedCounter value={value} className={className} duration={duration} decimals={1} suffix="%" />;
};

// For displaying currency values
interface AnimatedCurrencyProps {
  value: number;
  className?: string;
  duration?: number;
  currency?: string;
}

export const AnimatedCurrency = ({ value, className, duration = 2, currency = "USD" }: AnimatedCurrencyProps) => {
  return (
    <AnimatedCounter
      value={value}
      className={className}
      duration={duration}
      formatOptions={{
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }}
    />
  );
};
