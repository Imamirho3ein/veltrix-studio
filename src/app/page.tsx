import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { WhyUs } from "@/components/sections/WhyUs";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { TelegramSection } from "@/components/sections/TelegramSection";
import { FaqSection } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Marquee } from "@/components/ui/Marquee";
import { faqItems } from "@/data/faq";
import { faqSchema } from "@/lib/seo";
import { siteConfig, siteKeywords } from "@/lib/constants";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "ولتریکس استودیو | طراحی سایت اختصاصی و تجربه‌های دیجیتال",
  },
  description: siteConfig.description,
  keywords: [...siteKeywords],
  alternates: { canonical: "/" },
  openGraph: {
    title: "ولتریکس استودیو | طراحی سایت اختصاصی و تجربه‌های دیجیتال",
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: "/api/og?title=VELTRIX%20STUDIO&subtitle=Digital%20Design%20%26%20Development",
        width: 1200,
        height: 630,
        alt: "VELTRIX STUDIO",
      },
    ],
  },
};

const marqueeItems = [
  "طراحی سایت",
  "WEB DESIGN",
  "توسعه فرانت‌اند",
  "MOTION DESIGN",
  "تجربه کاربری",
  "E-COMMERCE",
  "سئوی تکنیکال",
  "BRANDING",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <Hero />

      <div className="relative border-y border-white/[0.06] bg-ink-2/30 py-4">
        <Marquee
          items={marqueeItems}
          className="text-[0.72rem] tracking-wide text-fog-500"
        />
      </div>

      <Stats />
      <Services />
      <AboutPreview />
      <WhyUs />
      <PortfolioPreview />
      <Process />
      <Testimonials />
      <TelegramSection />
      <FaqSection items={faqItems} />
      <CTA />
    </>
  );
}
