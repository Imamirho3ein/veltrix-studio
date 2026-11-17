"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { hasSeenIntro, markIntroDone } from "@/lib/intro";
import { toFa } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export function Preloader() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) {
      markIntroDone();
      return;
    }

    if (hasSeenIntro()) {
      markIntroDone();
      return;
    }

    const showFrame = requestAnimationFrame(() => setVisible(true));

    let value = 0;
    const interval = window.setInterval(() => {
      value = Math.min(96, value + Math.random() * 14 + 7);
      setProgress(Math.round(value));
    }, 85);

    let hideTimeout = 0;
    const finish = window.setTimeout(() => {
      setProgress(100);
      markIntroDone();
      hideTimeout = window.setTimeout(() => setVisible(false), 380);
    }, 1050);

    return () => {
      cancelAnimationFrame(showFrame);
      window.clearInterval(interval);
      window.clearTimeout(finish);
      window.clearTimeout(hideTimeout);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute left-1/2 top-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[130px]" />
          <div className="relative flex flex-col items-center">
            <Logo size={76} loading="eager" />
            <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
              <div
                className="h-full bg-[linear-gradient(90deg,#f0a24c,#f7c98a,#e9c79b)] transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 flex w-56 items-center justify-between text-[0.65rem] text-fog-500">
              <span className="font-latin tracking-[0.3em]">LOADING</span>
              <span className="font-latin">{toFa(progress)}٪</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
