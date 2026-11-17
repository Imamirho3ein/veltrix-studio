"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={
        reduced
          ? { opacity: 1 }
          : { opacity: 0, clipPath: "inset(12% 0% 12% 0% round 20px)" }
      }
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 20px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
