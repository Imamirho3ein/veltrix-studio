import type { Metadata, Viewport } from "next";
import { manrope, vazirmatn } from "@/lib/fonts";
import { siteConfig, siteKeywords } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Noise } from "@/components/Noise";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ولتریکس استودیو | طراحی سایت و تجربه‌های دیجیتال",
    template: "%s | ولتریکس استودیو",
  },
  description: siteConfig.description,
  keywords: [...siteKeywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: siteConfig.name,
    title: "ولتریکس استودیو | طراحی سایت و تجربه‌های دیجیتال",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/api/og?title=VELTRIX%20STUDIO&subtitle=Digital%20Design%20%26%20Development",
        width: 1200,
        height: 630,
        alt: "VELTRIX STUDIO — استودیو طراحی و توسعه وب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ولتریکس استودیو | طراحی سایت و تجربه‌های دیجیتال",
    description: siteConfig.description,
    images: [
      "/api/og?title=VELTRIX%20STUDIO&subtitle=Digital%20Design%20%26%20Development",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#FFF9F0",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <div id="top" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:right-5 focus:top-5 focus:z-[300] focus:rounded-xl focus:bg-[#FFFFFF] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-fog-900"
        >
          رفتن به محتوای اصلی
        </a>
        <ScrollProgress />
        <Noise />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
