import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animations/FadeUp";
import { PricingCard } from "@/components/ui/PricingCard";
import { FaqSection } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { pricingPlans } from "@/data/pricing";
import { pricingFaqItems } from "@/data/faq";
import { pageMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "تعرفه‌ها",
  description:
    "تعرفه‌ی طراحی سایت در ولتریکس استودیو: فروشگاهی، شرکتی، رستوران، پزشکی، مدرسه، خدماتی، فروش دوره، شخصی و سازمانی — با تفکیک قالب آماده و طرح اختصاصی.",
  path: "/pricing",
  ogTitle: "تعرفه‌ی طراحی سایت",
  ogSubtitle: "قیمت شفاف، بدون هزینه‌ی پنهان.",
});

const included = [
  "طراحی واکنش‌گرا برای موبایل، تبلت و دسکتاپ",
  "سئوی تکنیکال پایه و اتصال به Google Search Console",
  "فرم تماس امن با اعتبارسنجی و ارسال به تلگرام",
  "بهینه‌سازی سرعت و تصاویر",
  "سه ماه پشتیبانی رایگان پس از تحویل",
  "انتقال کامل مالکیت کد، دامنه و هاست",
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { title: "خانه", href: "/" },
            { title: "تعرفه‌ها", href: "/pricing" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "تعرفه‌ی طراحی سایت ولتریکس استودیو",
            url: absoluteUrl("/pricing"),
            itemListElement: pricingPlans.map((plan, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Offer",
                name: plan.title,
                description: plan.description,
                priceCurrency: "IRR",
                availability: "https://schema.org/InStock",
                url: absoluteUrl("/contact"),
              },
            })),
          },
          faqSchema(pricingFaqItems),
        ]}
      />

      <PageHero
        eyebrow="تعرفه‌ها"
        breadcrumb="تعرفه‌ها"
        title={
          <>
            قیمت شفاف،
            <br />
            <span className="text-gradient">بدون غافلگیری.</span>
          </>
        }
        description="تعرفه‌ها بر اساس نوع پروژه و سطح سفارشی‌سازی تعیین می‌شوند. اعداد زیر حدودی هستند و قیمت نهایی بعد از جلسه‌ی کشف و مشخص‌شدن دامنه‌ی کار، مکتوب اعلام می‌شود."
      >
        <div className="flex items-start gap-2.5 rounded-xl border border-accent-400/20 bg-accent-400/[0.06] px-4 py-3 text-[0.72rem] leading-6 text-accent-100/90">
          <Info className="mt-0.5 size-4 shrink-0 text-accent-300" />
          <p>
            همه‌ی مبالغ به <span className="font-semibold">تومان</span> و
            تقریبی هستند. هزینه‌ی دامنه و هاست جداگانه محاسبه می‌شود.
          </p>
        </div>
      </PageHero>

      <Container className="section-y">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <FadeUp key={plan.slug} delay={index * 0.04}>
              <PricingCard plan={plan} />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1} className="mt-10">
          <div className="grid gap-6 rounded-[24px] border border-white/[0.07] bg-card/50 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-lg font-bold text-white">
                در همه‌ی پروژه‌ها
              </h2>
              <p className="mt-2 text-xs leading-6 text-fog-400">
                این موارد جدا از نوع قرارداد، همیشه بخشی از تحویل هستند.
              </p>
              <ul className="mt-5 space-y-3">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.8rem] leading-7 text-fog-300"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-brand-400/25 bg-brand-400/10 text-brand-300">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-ink-2/50 p-5">
              <h2 className="text-sm font-bold text-white">
                قالب آماده یا طرح اختصاصی؟
              </h2>
              <div className="mt-4 space-y-4 text-[0.78rem] leading-7">
                <div>
                  <p className="font-semibold text-fog-200">
                    قالب آماده — سریع‌تر، اقتصادی‌تر
                  </p>
                  <p className="mt-1 text-fog-400">
                    ساختار و طراحی پایه از یک قالب حرفه‌ای شروع می‌شود و هویت
                    برند شما روی آن پیاده می‌شود. مناسب کسب‌وکارهایی که زودتر به
                    نتیجه نیاز دارند.
                  </p>
                </div>
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="font-semibold text-fog-200">
                    طرح اختصاصی — متمایزتر، قابل‌توسعه‌تر
                  </p>
                  <p className="mt-1 text-fog-400">
                    معماری، رابط و حرکت از صفر برای کسب‌وکار شما طراحی می‌شود.
                    مناسب برندهایی که تمایز بصری برایشان اولویت است.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                <p className="text-[0.68rem] leading-6 text-fog-500">
                  <span className="font-semibold text-fog-300">
                    نحوه‌ی پرداخت:
                  </span>{" "}
                  ۴۰٪ در شروع، ۳۰٪ پس از تأیید طراحی و ۳۰٪ هنگام تحویل.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.12} className="mt-6">
          <SectionTitle
            eyebrow="سؤال دارید؟"
            title={
              <>
                تعرفه‌ی دقیق <span className="text-gradient">پروژه‌ی شما</span>
              </>
            }
            description="اگر نوع پروژه‌تان در لیست نیست یا امکانات خاصی می‌خواهید، فرم تماس را پر کنید؛ برآورد اختصاصی دریافت می‌کنید."
            action={
              <a
                href="/contact"
                className="btn btn-secondary btn-sm shrink-0"
              >
                دریافت برآورد اختصاصی
              </a>
            }
            className="mt-6"
          />
        </FadeUp>
      </Container>

      <FaqSection
        items={pricingFaqItems}
        eyebrow="سؤالات تعرفه"
        title={
          <>
            هر چیزی درباره‌ی <span className="text-gradient">هزینه‌ها</span>
          </>
        }
        description="پاسخ شفاف به سؤال‌هایی که قبل از شروع پروژه پیش می‌آید."
        id="pricing-faq"
      />
      <CTA />
    </>
  );
}
