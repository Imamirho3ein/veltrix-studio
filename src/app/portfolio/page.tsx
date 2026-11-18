import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioFilter";
import { CTA } from "@/components/sections/CTA";
import { Process } from "@/components/sections/Process";
import { projects } from "@/data/portfolio";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "نمونه‌کارها",
  description:
    "مجموعه‌ای از پروژه‌های ولتریکس استودیو در حوزه‌های فروشگاهی، فین‌تک، شرکتی، SaaS و آموزشی؛ هر پروژه با مسئله، راه‌حل و نتیجه‌ی مشخص.",
  path: "/portfolio",
  ogTitle: "نمونه‌کارهای ولتریکس استودیو",
  ogSubtitle: "پروژه‌هایی که مسئله‌ی واقعی حل کرده‌اند.",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "نمونه‌کارهای ولتریکس استودیو",
          url: absoluteUrl("/portfolio"),
          inLanguage: "fa-IR",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${project.titleFa} (${project.title})`,
              url: absoluteUrl(`/portfolio/${project.slug}`),
            })),
          },
        }}
      />

      <PageHero
        eyebrow="نمونه‌کارها"
        breadcrumb="نمونه‌کارها"
        title={
          <>
            کارهایی که
            <br />{" "}
            <span className="text-gradient">به آن‌ها افتخار</span> می‌کنیم.
          </>
        }
        description="هر پروژه یک مسئله‌ی واقعی داشته است؛ از فروشگاهی که باید از اینستاگرام مهاجرت می‌کرد تا داشبوردی که باید داده‌ی پیچیده را قابل‌فهم می‌کرد. این‌ها نتیجه‌ی کار است."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-fog-400">
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand" />
            {projects.length} پروژه‌ی منتخب
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent-400" />
            طراحی، توسعه و نتیجه‌ی قابل اندازه‌گیری
          </span>
        </div>
      </PageHero>

      <Container className="section-y">
        <PortfolioExplorer projects={projects} />
      </Container>

      <Process />
      <CTA />
    </>
  );
}
