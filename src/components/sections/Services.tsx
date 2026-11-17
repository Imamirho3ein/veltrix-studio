import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { FadeUp } from "@/components/animations/FadeUp";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative">
      <Container>
        <SectionTitle
          id="services-title"
          eyebrow="خدمات"
          title={
            <>
              همه‌چیز برای ساخت یک حضور دیجیتال{" "}
              <span className="text-gradient">قدرتمند</span>
            </>
          }
          description="از طراحی اولیه تا توسعه و پشتیبانی، تمام مسیر ساخت محصول دیجیتال را کنار شما هستیم؛ با یک تیم کوچک و تمرکز کامل."
          action={
            <Button href="/services" variant="secondary" size="sm" arrow>
              همه‌ی خدمات
            </Button>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <FadeUp key={service.slug} delay={index * 0.06}>
              <ServiceCard service={service} className="h-full" />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1} className="mt-4">
          <div className="gradient-border flex flex-col items-start justify-between gap-4 rounded-[20px] border border-white/[0.07] bg-ink-2/60 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-white">
                تعرفه‌ی شفاف، بدون غافلگیری
              </p>
              <p className="mt-1 text-xs text-fog-400">
                سایت شرکتی از ۷۵ میلیون تومان · فروشگاه اینترنتی از ۹۰ میلیون تومان
              </p>
            </div>
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 text-xs font-medium text-brand-300 transition hover:text-white"
            >
              مشاهده‌ی تعرفه‌ها
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
