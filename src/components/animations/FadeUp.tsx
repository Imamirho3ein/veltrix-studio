"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function FadeUp({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: FadeUpProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
