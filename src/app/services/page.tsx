import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  ArrowLeft,
  Check,
  Clock,
  Headset,
  KeyRound,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { Process } from "@/components/sections/Process";
import { FaqSection } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Marquee } from "@/components/ui/Marquee";
import {
  serviceFeatures,
  services,
  technologies,
} from "@/data/services";
import { faqItems } from "@/data/faq";
import { pageMetadata, serviceSchema, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "خدمات",
  description:
    "طراحی سایت، توسعه وب، فروشگاه اینترنتی و طراحی UI/UX؛ خدمات کامل ولتریکس استودیو برای ساخت یک حضور دیجیتال سریع، امن و متمایز.",
  path: "/services",
  ogTitle: "خدمات ولتریکس استودیو",
  ogSubtitle: "طراحی، توسعه و محصول — زیر یک سقف.",
});

const featureIcons: Record<(typeof serviceFeatures)[number]["icon"], LucideIcon> =
  {
    zap: Zap,
    search: Search,
    accessibility: Accessibility,
    shield: ShieldCheck,
    support: Headset,
    key: KeyRound,
  };

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[serviceSchema(services), faqSchema(faqItems)]} />

      <PageHero
        eyebrow="خدمات"
        breadcrumb="خدمات"
        title={
          <>
            از ایده تا اجرا؛
            <br />
            <span className="text-gradient">همه‌ی مسیر</span> با یک تیم.
          </>
        }
        description="ما در چهار حوزه‌ی به‌هم‌پیوسته کار می‌کنیم: طراحی، توسعه، فروشگاه و محصول. لازم نیست برای هر بخش سراغ تیم دیگری بروید."
      >
        <div className="flex flex-wrap items-center gap-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`#${service.slug}`}
              className="inline-flex h-9 items-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-[0.75rem] text-fog-300 transition hover:border-brand/40 hover:bg-brand/10 hover:text-white"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </PageHero>

      <div className="border-b border-white/[0.06] py-4">
        <Marquee
          items={technologies}
          className="text-[0.7rem] tracking-[0.14em] text-fog-500"
        />
      </div>

      <Container className="section-y">
        <div className="space-y-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-32 overflow-hidden rounded-[28px] border border-white/[0.07] bg-card/50"
              >
                <div
                  className={`grid gap-0 lg:grid-cols-[1.05fr_0.95fr] ${
                    isReversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="p-6 sm:p-9 lg:p-11">
                    <FadeUp>
                      <div className="flex items-center gap-3">
                        <span className="flex size-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-brand-300">
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <span className="block font-latin text-[0.6rem] tracking-[0.22em] text-fog-500">
                            {service.latin} · {service.number}
                          </span>
                          <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="mt-6 text-sm leading-8 text-fog-300">
                        {service.description}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Badge dot={false}>
                          <Clock className="size-3.5 text-brand-2" />
                          {service.duration}
                        </Badge>
                        {service.outcomes.map((outcome) => (
                          <span key={outcome} className="tag">
                            {outcome}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8">
                        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-fog-500">
                          مناسب برای
                        </p>
                        <ul className="mt-3 space-y-2">
                          {service.idealFor.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-[0.8rem] text-fog-400"
                            >
                              <Sparkles className="mt-1 size-3.5 shrink-0 text-brand-2/80" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        href="/contact"
                        className="group mt-8 inline-flex items-center gap-2 text-[0.8rem] font-medium text-brand-300 transition hover:text-white"
                      >
                        درخواست مشاوره برای این خدمت
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                      </Link>
                    </FadeUp>
                  </div>

                  <div className="relative border-t border-white/[0.06] bg-ink-2/50 p-6 sm:p-9 lg:border-s lg:border-t-0 lg:p-11">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(240, 162, 76,0.14),transparent_65%)]"
                    />
                    <FadeUp delay={0.1} className="relative">
                      <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-fog-300">
                        خروجی این مرحله
                      </h3>
                      <ul className="mt-5 space-y-3.5">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[0.82rem] leading-7 text-fog-300"
                          >
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand-200">
                              <Check className="size-3" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </FadeUp>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

      <section
        aria-labelledby="features-title"
        className="section-y border-t border-white/[0.06] bg-ink-2/20"
      >
        <Container>
          <SectionTitle
            id="features-title"
            eyebrow="استانداردهای ما"
            title={
              <>
                چیزهایی که در هر پروژه <span className="text-gradient">تضمین</span>{" "}
                می‌کنیم
              </>
            }
            description="این‌ها وعده‌ی تبلیغاتی نیستند؛ بخشی از چک‌لیست تحویل هر پروژه‌اند."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceFeatures.map((feature, index) => {
              const Icon = featureIcons[feature.icon];
              return (
                <FadeUp key={feature.title} delay={index * 0.05}>
                  <div className="group h-full rounded-[20px] border border-white/[0.07] bg-card/60 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-white/[0.13] hover:bg-card-hover">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-accent-300 transition-colors group-hover:border-accent-400/30 group-hover:text-white">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="mt-5 text-[0.95rem] font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[0.8rem] leading-7 text-fog-400">
                      {feature.description}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </section>

      <Process />

      <section className="section-y">
        <Container>
          <FadeUp>
            <div className="gradient-border relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-2 px-6 py-10 sm:px-10">
              <div
                aria-hidden="true"
                className="absolute -left-20 -top-20 size-64 rounded-full bg-brand/20 blur-[80px]"
              />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="eyebrow mb-3">تعرفه‌ها</p>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    قبل از شروع، هزینه را بدانید.
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-fog-400">
                    تعرفه‌ی شفاف همه‌ی انواع پروژه — از سایت شرکتی تا فروشگاه و
                    سازمانی — بدون هزینه‌ی پنهان.
                  </p>
                </div>
                <Button href="/pricing" arrow>
                  مشاهده‌ی تعرفه‌ها
                </Button>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      <FaqSection items={faqItems} />
      <CTA />
    </>
  );
}
