import { services } from "@/data/services";
import { campaign } from "@/data/campaign";
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
          description="از طراحی اولیه تا توسعه و پشتیبانی، کنار شما هستیم. با یک تیم کوچک و تمرکز کامل، مسیر ساخت محصول دیجیتال را پیش می‌بریم. از شناخت کسب‌وکار و معماری اطلاعات شروع می‌کنیم. سپس رابط کاربری اختصاصی را طراحی می‌کنیم و کد را با استانداردهای روز پیاده می‌سازیم. پیش از انتشار، سرعت، دسترس‌پذیری و سئوی تکنیکال را بررسی می‌کنیم. بعد از تحویل هم برای آموزش و رفع اشکال در دسترس می‌مانیم."
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
                {campaign.enabled
                  ? `جشنواره یک‌ماهه: همه‌ی خدمات ${campaign.priceLabel} — ${campaign.shortRangeLabel}`
                  : "سایت شرکتی از ۷۵ میلیون تومان · فروشگاه اینترنتی از ۹۰ میلیون تومان"}
              </p>
            </div>
            <Link
              href={campaign.enabled ? "/campaign" : "/pricing"}
              className="group inline-flex items-center gap-2 text-xs font-medium text-brand-300 transition hover:text-white"
            >
              {campaign.enabled ? "جزئیات جشنواره" : "مشاهده‌ی تعرفه‌ها"}
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
