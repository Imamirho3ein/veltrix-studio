"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Briefcase, Sparkles, Star } from "lucide-react";
import { useIntroReady } from "@/hooks/useIntroReady";
import { toFa } from "@/lib/utils";

function MiniNav() {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] px-[4%] py-[2.6%]">
      <div className="flex items-center gap-1.5">
        <span className="flex size-4 items-center justify-center rounded-[4px] bg-gradient-to-br from-brand-400 to-accent-400 font-latin text-[7px] font-black text-[#2c241d]">
          V
        </span>
        <span className="font-latin text-[7.5px] font-bold tracking-[0.2em] text-white">
          VELTRIX
        </span>
      </div>
      <div className="hidden items-center gap-3 text-[6.5px] text-fog-400 sm:flex">
        <span>خدمات</span>
        <span>نمونه‌کارها</span>
        <span>درباره ما</span>
      </div>
      <span className="rounded-[4px] bg-white px-1.5 py-1 text-[6px] font-semibold text-fog-900">
        شروع پروژه
      </span>
    </div>
  );
}

function MiniSite() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0d0d0d] dark-scope">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(176, 137, 104,0.22),transparent_45%),radial-gradient(circle_at_18%_85%,rgba(212, 185, 150,0.16),transparent_42%)]" />
      <div className="relative flex h-full flex-col">
        <MiniNav />
        <div className="grid flex-1 grid-cols-[1.08fr_0.92fr] items-center gap-2 px-[4%] py-[3%]">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-1.5 py-0.5 text-[5.5px] text-brand-200">
              <span className="size-1 rounded-full bg-accent-400" />
              استودیو دیجیتال
            </span>
            <p className="mt-1.5 text-[11px] font-extrabold leading-[1.5] text-white sm:text-[13px]">
              برند تو،
              <br />
              فراتر از یک سایت.{" "}
            </p>
            <p className="mt-1 hidden text-[5.5px] leading-[1.9] text-fog-400 sm:block">
              طراحی اختصاصی، سرعت بالا و جزئیاتی که دیده می‌شود.{" "}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-[4px] bg-gradient-to-l from-brand-500 to-accent-500 px-2 py-1 text-[5.5px] font-semibold text-[#2c241d]">
              شروع پروژه
              <span aria-hidden="true">←</span>
            </span>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.03] p-2">
              <div className="absolute -right-4 -top-4 size-12 rounded-full bg-brand-500/40 blur-lg" />
              <div className="relative space-y-1.5">
                <div className="h-1 w-8 rounded-full bg-white/20" />
                <div className="h-7 rounded-[4px] bg-gradient-to-br from-brand-500/40 via-brand-500/20 to-accent-400/30 p-1.5">
                  <div className="flex h-full items-end justify-between">
                    <span className="h-3 w-1 rounded-sm bg-white/50" />
                    <span className="h-4 w-1 rounded-sm bg-white/40" />
                    <span className="h-2.5 w-1 rounded-sm bg-white/60" />
                    <span className="h-5 w-1 rounded-sm bg-accent-300/80" />
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="h-5 flex-1 rounded-[3px] bg-white/[0.06]" />
                  <div className="h-5 flex-1 rounded-[3px] bg-white/[0.06]" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 flex items-center gap-1 rounded-md border border-white/10 bg-[#1a1714]/90 px-1.5 py-1 backdrop-blur">
              <span className="size-1 rounded-full bg-brand-400" />
              <span className="text-[5px] text-fog-300">Lighthouse ۹۸</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border-[3px] border-[#26201a] bg-[#0d0d0d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
      <div className="flex items-center justify-center py-1">
        <span className="h-1 w-8 rounded-full bg-white/15" />
      </div>
      <div className="bg-[radial-gradient(circle_at_70%_10%,rgba(176, 137, 104,0.24),transparent_50%),radial-gradient(circle_at_20%_90%,rgba(212, 185, 150,0.15),transparent_45%)] px-2.5 pb-2.5">
        <div className="flex items-center justify-between">
          <span className="font-latin text-[5px] font-bold tracking-[0.18em] text-white">
            VELTRIX
          </span>
          <div className="space-y-[2px]">
            <span className="block h-[1.5px] w-2.5 rounded bg-white/60" />
            <span className="block h-[1.5px] w-2.5 rounded bg-white/60" />
          </div>
        </div>
        <p className="mt-2 text-[7px] font-extrabold leading-[1.6] text-white">
          تجربه‌ای که
          <br />
          در ذهن می‌ماند.{" "}
        </p>
        <p className="mt-1 text-[4.5px] leading-[1.9] text-fog-400">
          طراحی و توسعه‌ی سایت‌های اختصاصی برای برندهای جسور.{" "}
        </p>
        <div className="mt-1.5 h-10 overflow-hidden rounded-[5px] border border-white/10 bg-gradient-to-br from-brand-500/35 via-brand-500/15 to-accent-400/25 p-1">
          <div className="flex h-full items-end gap-1">
            <span className="h-3 flex-1 rounded-sm bg-white/30" />
            <span className="h-6 flex-1 rounded-sm bg-white/20" />
            <span className="h-4 flex-1 rounded-sm bg-white/40" />
            <span className="h-7 flex-1 rounded-sm bg-accent-300/60" />
            <span className="h-5 flex-1 rounded-sm bg-white/25" />
          </div>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[4px] text-fog-400">
          <span>+۵۰ پروژه</span>
          <span>۹۸٪ رضایت</span>
        </div>
      </div>
    </div>
  );
}

function TabletMockup() {
  return (
    <div className="overflow-hidden rounded-[0.9rem] border-[3px] border-[#241f1a] bg-[#0d0d0d] p-1 ring-1 ring-white/10">
      <div className="rounded-[0.5rem] bg-[radial-gradient(circle_at_50%_0%,rgba(247, 201, 138,0.2),transparent_55%)] p-2">
        <div className="flex items-center justify-between">
          <span className="font-latin text-[5px] font-bold tracking-[0.16em] text-white">
            VELTRIX
          </span>
          <span className="size-1 rounded-full bg-accent-400" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="aspect-[4/3] rounded-[3px] border border-white/[0.07] bg-white/[0.035]"
            >
              <div className="m-1 h-1 w-4 rounded-full bg-white/15" />
              <div className="mx-1 h-3 rounded-[2px] bg-gradient-to-br from-brand-500/25 to-accent-400/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatingCard({
  children,
  className,
  duration,
  delay,
  enabled,
}: {
  children: React.ReactNode;
  className: string;
  duration: number;
  delay: number;
  enabled: boolean;
}) {
  return (
    <motion.div
      className={className}
      animate={enabled ? { y: [0, -9, 0] } : { y: 0 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroVisual() {
  const reduced = useReducedMotion();
  const ready = useIntroReady();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(rawX, { stiffness: 90, damping: 18 });
  const rotateX = useSpring(rawY, { stiffness: 90, damping: 18 });

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * -5);
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
      className="relative mx-auto h-[400px] w-full max-w-[620px] sm:h-[470px] lg:h-[540px] lg:max-w-none"
      aria-label="نمونه‌ای از طراحی سایت روی لپ‌تاپ، تبلت و موبایل"
      role="img"
    >
      <div className="absolute left-1/2 top-1/2 size-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[90px]" />
      <div className="absolute left-[12%] top-[8%] size-40 rounded-full bg-accent-500/15 blur-[70px]" />

      <div className="absolute right-[2%] top-[6%] hidden size-56 rounded-full border border-white/[0.06] sm:block">
        <div className="absolute inset-6 rounded-full border border-dashed border-white/[0.08] [animation:spin-slow_40s_linear_infinite]" />
        <div className="absolute inset-16 rounded-full border border-white/[0.05]" />
      </div>

      <motion.div
        className="absolute inset-x-[3%] top-[9%] z-20 [perspective:1400px]"
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative [transform-style:preserve-3d] will-change-transform"
        >
          <div className="rounded-2xl border border-white/15 bg-[#1a1714] p-1.5 shadow-[0_50px_120px_-42px_rgba(212, 185, 150,0.45)]">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-ink">
              <div className="flex h-6 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-2.5 sm:h-7">
                <span className="size-1.5 rounded-full bg-white/20" />
                <span className="size-1.5 rounded-full bg-white/20" />
                <span className="size-1.5 rounded-full bg-white/20" />
                <div className="mx-auto flex h-3.5 w-1/2 items-center justify-center rounded-full bg-white/[0.05] text-[5px] text-fog-500 sm:text-[6px]">
                  veltrixstudio
                </div>
              </div>
              <MiniSite />
            </div>
          </div>
          <div className="mx-auto h-2.5 w-[112%] -translate-x-[5%] rounded-b-2xl border-x border-b border-white/10 bg-gradient-to-b from-[#26201a] to-[#121110]" />
          <div className="mx-auto h-1 w-24 rounded-b-full bg-black/40 blur-sm" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-[7%] right-[-1%] z-10 w-[30%] max-w-[190px] rotate-[7deg] opacity-95 max-sm:hidden">
        <TabletMockup />
      </div>

      <div className="absolute -bottom-[1%] left-0 z-30 w-[24%] max-w-[136px] -rotate-[7deg] sm:left-[2%]">
        <PhoneMockup />
      </div>

      <FloatingCard
        enabled={ready && !reduced}
        duration={7}
        delay={0.4}
        className="absolute -left-[2%] top-[20%] z-30 sm:left-[-4%]"
      >
        <div className="flex items-center gap-2.5 rounded-xl border border-[#FFF9F0]/15 bg-[#1a1714]/85 px-3 py-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md">
          <span className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand-300">
            <Briefcase className="size-3.5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-[#FFF9F0]">
              +{toFa(50)}
            </span>
            <span className="block text-[0.6rem] text-fog-300">پروژه موفق</span>
          </span>
        </div>
      </FloatingCard>

      <FloatingCard
        enabled={ready && !reduced}
        duration={8}
        delay={1}
        className="absolute -right-[2%] top-[48%] z-30 sm:right-[-4%]"
      >
        <div className="flex items-center gap-2.5 rounded-xl border border-[#FFF9F0]/15 bg-[#1a1714]/85 px-3 py-2.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md">
          <span className="flex size-7 items-center justify-center rounded-lg bg-accent-400/15 text-accent-300">
            <Star className="size-3.5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-[#FFF9F0]">
              {toFa(98)}٪
            </span>
            <span className="block text-[0.6rem] text-fog-300">
              رضایت مشتری
            </span>
          </span>
        </div>
      </FloatingCard>

      <FloatingCard
        enabled={ready && !reduced}
        duration={6.5}
        delay={1.6}
        className="absolute bottom-[2%] left-[22%] z-30 hidden sm:block"
      >
        <div className="flex items-center gap-2 rounded-lg border border-[#FFF9F0]/15 bg-[#1a1714]/80 px-2.5 py-2 backdrop-blur-md">
          <Sparkles className="size-3 text-brand-300" />
          <span className="text-[0.62rem] text-fog-300">
            <span className="font-bold text-[#FFF9F0]">
              +{toFa(3)}
            </span>{" "}
            سال تجربه
          </span>
        </div>
      </FloatingCard>

      <div className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.62rem] text-fog-500 sm:flex">
        <span className="size-1.5 rounded-full bg-brand" />
        طراحی، توسعه و موشن؛ زیر یک سقف
      </div>
    </div>
  );
}
