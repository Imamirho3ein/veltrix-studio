"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, MousePointer2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { useIntroReady } from "@/hooks/useIntroReady";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" as const },
  },
};

const highlights = ["طراحی اختصاصی", "توسعه‌ی سریع", "پشتیبانی واقعی"];

export function Hero() {
  const ready = useIntroReady();
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-14 pt-[calc(var(--header-height)+2.75rem)] sm:pb-20 lg:min-h-[92svh] lg:pb-24 lg:pt-[calc(var(--header-height)+4.5rem)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-70" />
        <div className="orb -top-32 right-[8%] size-[32rem] bg-brand/20 animate-aurora" />
        <div className="orb top-[18%] -left-40 size-[30rem] bg-accent-500/12 animate-aurora [animation-delay:-6s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 xl:gap-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
          >
            <motion.div variants={item}>
              <Badge className="border-white/10 bg-white/[0.04]">
                <span className="font-latin tracking-[0.18em]">VELTRIX STUDIO</span>
                <span className="text-fog-600">/</span>
                <span>استودیو دیجیتال</span>
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-title"
              variants={item}
              className="display-title mt-7"
            >
              ایده‌ات را به
              <br />
              یک <span className="text-gradient">تجربه دیجیتال</span>
              <br />
              تبدیل می‌کنیم.
            </motion.h1>

            <motion.p variants={item} className="lead mt-7 max-w-xl">
              ما برای برندهایی که می‌خواهند متفاوت دیده شوند، وب‌سایت‌هایی
              سریع، زیبا و هدفمند طراحی و توسعه می‌دهیم؛ جایی که طراحی خوب با
              کدی تمیز و جزئیاتی که حس می‌شود همراه است.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/contact" arrow fullWidth className="sm:w-auto">
                شروع پروژه
              </Button>
              <Button
                href="/portfolio"
                variant="secondary"
                fullWidth
                className="sm:w-auto"
              >
                مشاهده نمونه‌کارها
              </Button>
            </motion.div>

            <motion.ul
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-fog-400"
            >
              {highlights.map((highlight) => (
                <li key={highlight} className="inline-flex items-center gap-2">
                  <span className="flex size-4 items-center justify-center rounded-full bg-brand/15 text-brand-300">
                    <Check className="size-2.5" />
                  </span>
                  {highlight}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <HeroVisual />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 hidden items-center justify-between border-t border-white/[0.06] pt-6 lg:flex"
        >
          <p className="flex items-center gap-2 text-[0.7rem] text-fog-500">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-400" />
            </span>
            در حال پذیرش پروژه‌های جدید
          </p>
          <a
            href="#stats"
            className="group inline-flex items-center gap-2 text-[0.7rem] text-fog-500 transition hover:text-white"
          >
            <MousePointer2 className="size-3.5 text-brand" />
            کمی پایین‌تر را ببینید
            <span className="h-px w-10 bg-gradient-to-l from-[#FFF9F0]/40 to-transparent transition-all group-hover:w-16" />
          </a>
          {reduced ? null : (
            <span className="font-latin text-[0.6rem] tracking-[0.3em] text-fog-600">
              SCROLL TO EXPLORE
            </span>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
