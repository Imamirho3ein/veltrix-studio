"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ChevronDown, Code2, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type TreeItem = { label: string; depth: number; active?: boolean };

const tree: TreeItem[] = [
  { label: "صفحه اصلی", depth: 0, active: true },
  { label: "هدر", depth: 1 },
  { label: "هیرو", depth: 1 },
  { label: "خدمات", depth: 1 },
  { label: "نمونه‌کارها", depth: 1 },
  { label: "نظرات مشتریان", depth: 1 },
  { label: "پاورقی", depth: 1 },
];

type Segment = { t: string; c: string };

const K = "#c9b6e8"; // keyword, lilac
const F = "#b08968"; // function, tan
const S = "#e0cbb0"; // string, sand
const P = "#8ccfc4"; // property, teal
const N = "#d4b996"; // number, sand
const D = "#717171"; // punctuation

const code: Segment[][] = [
  [
    { t: "const ", c: K },
    { t: "site", c: "#ffffff" },
    { t: " = ", c: D },
    { t: "createSite", c: F },
    { t: "({", c: D },
  ],
  [
    { t: "  brand", c: P },
    { t: ": ", c: D },
    { t: '"veltrix"', c: S },
    { t: ",", c: D },
  ],
  [
    { t: "  lang", c: P },
    { t: ": ", c: D },
    { t: '"fa"', c: S },
    { t: ",", c: D },
  ],
  [
    { t: "  dir", c: P },
    { t: ": ", c: D },
    { t: '"rtl"', c: S },
    { t: ",", c: D },
  ],
  [
    { t: "  motion", c: P },
    { t: ": ", c: D },
    { t: "true", c: K },
    { t: ",", c: D },
  ],
  [
    { t: "  sections", c: P },
    { t: ":", c: D },
    { t: " ", c: D },
    { t: "12", c: N },
    { t: ",", c: D },
  ],
  [{ t: "});", c: D }],
  [{ t: "", c: D }],
  [
    { t: "export default ", c: K },
    { t: "site", c: "#ffffff" },
    { t: ";", c: D },
  ],
];

export function CtaVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 110, damping: 18 });
  const y = useSpring(rawY, { stiffness: 110, damping: 18 });

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 14);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 10);
  }

  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[44rem] select-none [perspective:1800px]"
    >
      <div className="pointer-events-none absolute -inset-x-6 -top-12 bottom-20 bg-[radial-gradient(52%_58%_at_62%_26%,rgba(176,137,104,0.42),rgba(176,137,104,0.12)_48%,transparent_74%)] blur-[46px]" />

      <div className="relative [transform:rotateX(4deg)_rotateY(-7deg)_rotateZ(-1.2deg)]">
        <motion.div
          style={{ x, y }}
          className="dark-scope relative overflow-hidden rounded-2xl border border-white/10 bg-[#141210] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95),0_0_60px_-18px_rgba(176,137,104,0.35)]"
        >
          <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-[linear-gradient(90deg,transparent,rgba(176,137,104,0.9),transparent)]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-6 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(176,137,104,0.4),transparent_70%)] blur-md" />

          <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#4a3a2a]" />
              <span className="size-2 rounded-full bg-[#6b5136]" />
              <span className="size-2 rounded-full bg-brand/70" />
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1">
              <Code2 className="size-3 text-brand" />
              <span dir="ltr" className="font-latin text-[0.58rem] text-fog-400">
                app/page.tsx
              </span>
            </div>
            <span className="hidden items-center gap-1 text-[0.56rem] text-fog-400 sm:flex">
              <Sparkles className="size-2.5 text-brand-2" />
              پیش‌نمایش زنده
            </span>
          </div>

          <div className="grid min-h-[19rem] grid-cols-[0.82fr_1.18fr] sm:min-h-[23rem]">
            <div className="border-e border-white/[0.06] p-2.5 sm:p-3.5">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="flex items-center gap-1.5 text-[0.56rem] text-fog-400 sm:text-[0.62rem]">
                  <Layers className="size-2.5" />
                  ساختار صفحه
                </span>
                <ChevronDown className="size-2.5 text-fog-400" />
              </div>

              <div className="space-y-0.5">
                {tree.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-1.5 py-[0.32rem] text-[0.6rem] transition-colors sm:text-[0.66rem]",
                      item.depth === 1 && "ms-2.5",
                      item.active
                        ? "bg-brand/[0.12] text-brand-200 ring-1 ring-brand/25"
                        : "text-fog-400",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1 rounded-full",
                        item.active ? "bg-brand" : "bg-fog-700",
                      )}
                    />
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-md border border-white/[0.07] bg-white/[0.025] p-2">
                <div className="flex items-center justify-between">
                  <span className="text-[0.52rem] text-fog-400">پرفورمنس</span>
                  <span className="font-latin text-[0.52rem] text-brand-2">
                    ۹۸
                  </span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full w-[92%] rounded-full bg-[linear-gradient(90deg,#b08968,#d4b996)]" />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden px-3 py-2.5 sm:px-4 sm:py-3.5">
              <div className="mb-1.5 flex items-center gap-1.5 text-[0.54rem] text-fog-400">
                <span className="size-1 rounded-full bg-brand/70" />
                کد
              </div>
              <div dir="ltr" className="font-mono text-[0.6rem] leading-[1.85] sm:text-[0.68rem]">
                {code.map((line, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="w-3 shrink-0 select-none text-end text-fog-400">
                      {index + 1}
                    </span>
                    <span className="whitespace-pre text-fog-300">
                      {line.map((segment, segmentIndex) => (
                        <span key={segmentIndex} style={{ color: segment.c }}>
                          {segment.t}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-[linear-gradient(to_right,#141210,transparent)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,#141210_18%,transparent)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
