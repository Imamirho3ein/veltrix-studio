import {
  Gauge,
  Headset,
  MousePointerClick,
  PenTool,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { whyUs } from "@/data/site";
import { FadeUp } from "@/components/animations/FadeUp";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const icons: Record<(typeof whyUs)[number]["icon"], LucideIcon> = {
  pen: PenTool,
  gauge: Gauge,
  pointer: MousePointerClick,
  support: Headset,
};

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="section-y border-t border-white/[0.06]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <SectionTitle
              id="why-title"
              eyebrow="تفاوت ما"
              title={
                <>
                  چرا <span className="text-gradient">ولتریکس</span>؟{" "}
                </>
              }
              description="ما ادعای «بهترین بودن» نداریم؛ ترجیح می‌دهیم نتیجه‌ی کار صحبت کند. یک فرایند روشن، تیم کوچک و وسواس واقعی داریم و هر تصمیم طراحی را بر اساس هدف کسب‌وکار شما می‌سنجیم. از انتخاب فونت و فاصله‌ها تا سرعت بارگذاری و مسیر تبدیل، همه‌چیز با دقت بررسی می‌شود. نتیجه، سایت‌هایی است که هم سریع و تمیز کار می‌کنند و هم هویت برند شما را درست نشان می‌دهند."
            />
            <FadeUp delay={0.15} className="mt-8 hidden lg:block">
              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-400/10 text-brand-300">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">
                    تعهد ما: مالکیت کامل شما
                  </p>
                  <p className="mt-1 text-[0.7rem] leading-6 text-fog-400">
                    کد، دامنه و هاست به نام شماست. بدون وابستگی.{" "}
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyUs.map((feature, index) => {
              const Icon = icons[feature.icon];
              return (
                <FadeUp key={feature.number} delay={index * 0.06}>
                  <div className="group h-full rounded-[20px] border border-white/[0.07] bg-card/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-card-hover">
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-brand-300 transition-colors group-hover:border-brand/30 group-hover:text-accent-300">
                        <Icon className="size-4.5" />
                      </span>
                      <span className="text-[0.65rem] tracking-[0.2em] text-fog-600">
                        {feature.number}
                      </span>
                    </div>
                    <p className="mt-6 text-base text-white">
                      <strong className="font-bold">{feature.title}</strong>
                    </p>
                    <p className="mt-2.5 text-[0.82rem] leading-7 text-fog-400">
                      {feature.description}{" "}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
