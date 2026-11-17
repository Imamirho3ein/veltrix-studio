"use client";

import { motion, useReducedMotion } from "motion/react";
import { Clock, Send, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export function CtaCopy() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={container}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="relative z-10 max-w-[32rem] xl:max-w-xl"
    >
      <motion.span
        variants={item}
        className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-[#1d1510] px-3.5 py-1.5 text-[0.72rem] font-medium text-[#e7c69a] shadow-[inset_0_1px_0_rgba(255,214,170,0.14),0_0_22px_-6px_rgba(240,162,76,0.28)]"
      >
        <Sparkles className="size-3.5 text-brand" />
        ایده‌ات را بفرست
      </motion.span>

      <motion.h2
        id="cta-title"
        variants={item}
        className="mt-6 text-[clamp(2.15rem,4.5vw,3.4rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-white"
      >
        پروژه‌ی بعدی‌ات
        <br />
        از همین‌جا <span className="text-gradient">شروع می‌شود.</span>
      </motion.h2>

      <motion.p
        variants={item}
        className="mt-5 max-w-[30rem] text-[0.92rem] leading-8 text-fog-400 sm:text-base"
      >
        ایده‌ات را بگو؛ در بوم یا کد شکلش می‌دهیم و سایت آماده را تحویل
        می‌دهیم. مشاوره‌ی اولیه بدون تعهد است و مسیر را شفاف پیش می‌بریم.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
      >
        <Button href="/contact" arrow fullWidth className="sm:w-auto">
          شروع پروژه
        </Button>
        <Button
          href={siteConfig.telegram.channel}
          external
          variant="ghost"
          fullWidth
          className="sm:w-auto"
        >
          گفتگو در تلگرام
          <Send className="size-4" />
        </Button>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[0.68rem] text-fog-500"
      >
        <span className="inline-flex items-center gap-2">
          <Clock className="size-3.5 text-brand" />
          {siteConfig.responseTime}
        </span>
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-accent-400" />
          مشاوره‌ی اولیه بدون تعهد
        </span>
      </motion.div>
    </motion.div>
  );
}
