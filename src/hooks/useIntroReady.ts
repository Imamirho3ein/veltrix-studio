"use client";

import { useEffect, useState } from "react";
import { INTRO_EVENT, hasSeenIntro } from "@/lib/intro";

export function useIntroReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onDone = () => setReady(true);

    if (reduced || hasSeenIntro()) {
      const frame = requestAnimationFrame(onDone);
      return () => cancelAnimationFrame(frame);
    }

    window.addEventListener(INTRO_EVENT, onDone);
    const fallback = window.setTimeout(onDone, 2400);

    return () => {
      window.removeEventListener(INTRO_EVENT, onDone);
      window.clearTimeout(fallback);
    };
  }, []);

  return ready;
}
