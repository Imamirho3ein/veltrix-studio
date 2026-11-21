import { processSteps } from "@/data/process";
import { FadeUp } from "@/components/animations/FadeUp";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section-y border-t border-white/[0.06]">
      <Container>
        <SectionTitle
          id="process-title"
          eyebrow="فرایند"
          title={
            <>
              از ایده تا <span className="text-gradient">اجرا</span>
            </>
          }
          description="چهار مرحله‌ی روشن، بدون ابهام و بدون غافلگیری. در هر قدم می‌دانید کجای پروژه هستیم و قدم بعدی چیست. کار را با شناخت کسب‌وکار، مخاطب و هدف واقعی پروژه شروع می‌کنیم. سپس مسیر کاربری و رابط اختصاصی را طراحی می‌کنیم. در مرحله‌ی توسعه، کد تمیز و تست‌شده را با بهینه‌سازی کامل تحویل می‌دهیم. بعد از انتشار هم آموزش و پشتیبانی ادامه دارد. زمان‌بندی هر مرحله از قبل مشخص می‌شود تا برنامه‌ی شما دستخوش غافلگیری نشود."
        />

        <div className="relative mt-14 grid gap-8 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-[27px] w-px bg-gradient-to-b from-brand/40 via-brand/15 to-transparent lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-l from-transparent via-brand/15 to-transparent lg:block"
          />

          {processSteps.map((step, index) => (
            <FadeUp
              key={step.number}
              delay={index * 0.08}
              className="relative flex gap-5 lg:block"
            >
              <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-ink-2 text-sm font-bold text-brand-300 shadow-[0_10px_30px_-16px_rgba(176, 137, 104,0.8)]">
                {step.number}
              </div>
              <div className="pb-2 lg:mt-7">
                <span className="font-latin text-[0.6rem] uppercase tracking-[0.26em] text-fog-500">
                  {step.latin}
                </span>
                <p className="mt-2 text-base text-white">
                  <strong className="font-bold">{step.title}</strong>
                </p>
                <p className="mt-2 text-[0.83rem] leading-7 text-fog-400">
                  {step.description}{" "}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2 text-[0.72rem] text-fog-500"
                    >
                      <span className="size-1 rounded-full bg-brand-2/70" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
