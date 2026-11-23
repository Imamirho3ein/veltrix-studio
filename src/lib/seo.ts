import type { Metadata } from "next";
import { campaign } from "@/data/campaign";
import { siteConfig, siteKeywords } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogSubtitle?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogSubtitle,
  keywords = [],
  noIndex = false,
}: PageMetaInput): Metadata {
  const params = new URLSearchParams({
    title: ogTitle ?? title,
    subtitle: ogSubtitle ?? description.slice(0, 110),
  });
  const ogImage = `/api/og?${params.toString()}`;

  return {
    title,
    description,
    keywords: [...siteKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: siteConfig.name,
      title,
      description,
      url: absoluteUrl(path),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

type SchemaNode = Record<string, unknown>;

export function organizationSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    alternateName: siteConfig.nameFa,
    url: siteConfig.url,
    logo: absoluteUrl("/brand/logo-512.png?v=2"),
    image: absoluteUrl("/api/og?title=VELTRIX%20STUDIO&subtitle=Digital%20Design%20Studio"),
    description: siteConfig.description,
    telephone: siteConfig.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer support",
      availableLanguage: ["fa", "en"],
      areaServed: "IR",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "تهران",
      addressCountry: "IR",
    },
    areaServed: {
      "@type": "Country",
      name: "Iran",
    },
    sameAs: [
      siteConfig.telegram.channel,
      siteConfig.telegram.bot,
    ].filter(Boolean),
    knowsAbout: [
      "طراحی وب‌سایت",
      "توسعه وب",
      "طراحی رابط کاربری",
      "برندینگ",
      "سئو",
    ],
  };
}

export function websiteSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "fa-IR",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/logo-512.png?v=2"),
      },
    },
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[]): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: readonly { title: string; href: string }[],
): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serviceSchema(
  services: readonly { title: string; description: string }[],
): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "خدمات ولتریکس استودیو",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: "IR",
      },
    })),
  };
}

export function campaignOfferSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "جشنواره یک‌ماهه ولتریکس استودیو",
    description:
      "در جشنواره یک‌ماهه ولتریکس استودیو، همه‌ی خدمات طراحی و توسعه‌ی سایت با قیمت ثابت ۱۵ میلیون تومان و بدون محدودیت ظرفیت ارائه می‌شوند.",
    url: absoluteUrl("/campaign"),
    priceCurrency: "IRR",
    price: String(campaign.priceRial),
    priceValidUntil: campaign.endDate,
    validFrom: campaign.startDate,
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Iran",
    },
    itemOffered: {
      "@type": "Service",
      name: "طراحی و توسعه وب‌سایت",
      description:
        "طراحی سایت اختصاصی، واکنش‌گرا و سریع همراه با سئوی تکنیکال پایه، فرم تماس امن و سه ماه پشتیبانی رایگان.",
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  };
}

