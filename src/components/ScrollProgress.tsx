"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY || doc.scrollTop || 0;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="scroll-progress fixed inset-x-0 top-0 z-[65] h-[3px] origin-right bg-[linear-gradient(90deg,#f0a24c,#f7c98a,#e9c79b)] shadow-[0_0_14px_rgba(240,162,76,0.55)]"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
