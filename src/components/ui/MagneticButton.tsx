"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticButton({
  children,
  className,
  strength = 14,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * strength * 2);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * strength);
  }

  function handleLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
