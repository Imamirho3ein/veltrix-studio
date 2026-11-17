import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { TelegramSection } from "@/components/sections/TelegramSection";
import { FaqSection } from "@/components/sections/FAQ";
import { FadeUp } from "@/components/animations/FadeUp";
import { faqItems } from "@/data/faq";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "تماس با ما",
  description:
    "برای شروع پروژه، مشاوره یا هر سؤالی با ولتریکس استودیو در تماس باشید. فرم درخواست پروژه، ایمیل و تلگرام — پاسخ کمتر از ۲۴ ساعت کاری.",
  path: "/contact",
  ogTitle: "تماس با ولتریکس استودیو",
  ogSubtitle: "داستان پروژه‌تان را برایمان بنویسید.",
});

const contactFaq = [
  faqItems[0]!,
  faqItems[1]!,
  faqItems[6]!,
  faqItems[7]!,
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { title: "خانه", href: "/" },
            { title: "تماس با ما", href: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "تماس با ولتریکس استودیو",
            url: absoluteUrl("/contact"),
            inLanguage: "fa-IR",
            mainEntity: {
              "@type": "Organization",
              name: siteConfig.name,
              email: siteConfig.email,
              url: siteConfig.url,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: siteConfig.email,
                availableLanguage: ["fa", "en"],
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                  ],
                  opens: "10:00",
                  closes: "20:00",
                },
              },
            },
          },
        ]}
      />

      <PageHero
        eyebrow="تماس با ما"
        breadcrumb="تماس با ما"
        title={
          <>
            بیایید درباره‌ی
            <br />
            <span className="text-gradient">پروژه‌ی شما</span> حرف بزنیم.
          </>
        }
        description="فرم را پر کنید یا مستقیم پیام بدهید؛ هر مسیری که انتخاب کنید، به همان تیم می‌رسد. پاسخ‌گویی معمولاً کمتر از ۲۴ ساعت کاری طول می‌کشد."
      />

      <Container className="section-y">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          <FadeUp>
            <ContactForm />
          </FadeUp>
          <FadeUp delay={0.1}>
            <ContactInfo />
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mt-6">
          <div className="flex flex-col gap-2 rounded-[20px] border border-white/[0.06] bg-white/[0.015] px-5 py-4 text-[0.68rem] leading-6 text-fog-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              اطلاعات فرم فقط برای بررسی درخواست استفاده می‌شود و در اختیار
              شخص ثالث قرار نمی‌گیرد.
            </span>
            <span className="shrink-0 font-latin tracking-wide text-fog-600">
              RESPONSE &lt; 24H
            </span>
          </div>
        </FadeUp>
      </Container>

      <TelegramSection />
      <FaqSection
        items={contactFaq}
        eyebrow="قبل از تماس"
        title={
          <>
            شاید پاسخ‌تان <span className="text-gradient">همین‌جا</span> باشد
          </>
        }
        description="چند سؤال که بیشتر از همه از ما پرسیده می‌شود."
        id="contact-faq"
      />
    </>
  );
}
