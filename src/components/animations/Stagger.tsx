"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
};

export function Stagger({ children, className, amount = 0.15 }: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4 } },
      }
    : staggerItem;

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}
