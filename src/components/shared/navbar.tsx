"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import { useReducedMotion } from "@/lib/motion";
import { Button } from "../ui/button";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.95)"]);

  const boxShadow = useTransform(scrollY, [0, 100], ["0 0 0 rgba(0,0,0,0)", "0 1px 3px rgba(0,0,0,0.1)"]);

  return (
    <motion.nav
      className="fixed top-0 right-0 left-0 z-50 w-screen py-4 backdrop-blur backdrop-filter"
      style={shouldReduceMotion ? { backgroundColor: "rgba(255, 255, 255, 0.95)" } : { backgroundColor, boxShadow }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-0">
        <motion.p
          className="font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Adflow.ai
        </motion.p>
        <div className="flex items-center gap-x-4"></div>
        <motion.div
          className="flex items-center gap-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button asChild size="sm" variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Start for Free</Link>
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  );
};
