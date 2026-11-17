import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  Layers,
  Quote,
  User,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { Reveal } from "@/components/animations/Reveal";
import { CTA } from "@/components/sections/CTA";
import { DeviceShowcase } from "@/components/portfolio/DeviceShowcase";
import {
  getAdjacentProjects,
  getProject,
  projects,
} from "@/data/portfolio";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";
import { JsonLd } from "@/components/JsonLd";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return pageMetadata({
      title: "پروژه پیدا نشد",
      description: "این پروژه در مجموعه‌ی ولتریکس استودیو وجود ندارد.",
      path: `/portfolio/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: `${project.titleFa} — ${project.categoryLabel}`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
    ogTitle: `${project.titleFa} | ${project.title}`,
    ogSubtitle: project.summary,
    keywords: [project.titleFa, project.categoryLabel, ...project.tags],
  });
}

const sections = [
  { key: "challenge", label: "چالش", latin: "Challenge" },
  { key: "solution", label: "راه‌حل", latin: "Solution" },
  { key: "design", label: "طراحی", latin: "Design" },
  { key: "development", label: "توسعه", latin: "Development" },
] as const;

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);

  const breadcrumbs = [
    { title: "خانه", href: "/" },
    { title: "نمونه‌کارها", href: "/portfolio" },
    { title: project.titleFa, href: `/portfolio/${project.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.titleFa,
            alternateName: project.title,
            description: project.summary,
            url: absoluteUrl(`/portfolio/${project.slug}`),
            image: absoluteUrl(project.image),
            dateCreated: project.year,
            creator: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            keywords: project.tags.join(", "),
          },
        ]}
      />

      <article>
        <header className="relative overflow-hidden border-b border-white/[0.06] pb-12 pt-[calc(var(--header-height)+3rem)] sm:pb-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 grid-lines opacity-50" />
            <div
              className="orb -top-40 right-[10%] size-[26rem]"
              style={{ backgroundColor: `${project.accent}26` }}
            />
            <div className="orb -left-32 top-1/2 size-72 bg-accent-500/10" />
          </div>

          <Container>
            <FadeUp>
              <nav
                aria-label="مسیر صفحه"
                className="mb-8 flex flex-wrap items-center gap-2 text-[0.68rem] text-fog-500"
              >
                <Link href="/" className="transition hover:text-white">
                  خانه
                </Link>
                <ChevronLeft className="size-3" aria-hidden="true" />
                <Link href="/portfolio" className="transition hover:text-white">
                  نمونه‌کارها
                </Link>
                <ChevronLeft className="size-3" aria-hidden="true" />
                <span className="text-fog-300">{project.titleFa}</span>
              </nav>

              <div className="flex flex-wrap items-center gap-2.5">
                <Badge>{project.categoryLabel}</Badge>
                <span className="tag">{project.year}</span>
                <span className="tag font-latin">{project.title}</span>
              </div>

              <h1 className="page-title mt-6 max-w-3xl">{project.titleFa}</h1>
              <p className="lead mt-5 max-w-2xl text-[0.95rem]">
                {project.summary}
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                  <dt className="flex items-center gap-1.5 text-[0.62rem] text-fog-500">
                    <User className="size-3" /> کارفرما
                  </dt>
                  <dd className="mt-1.5 text-[0.8rem] text-fog-600">
                    {project.client}
                  </dd>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                  <dt className="flex items-center gap-1.5 text-[0.62rem] text-fog-500">
                    <Calendar className="size-3" /> زمان‌بندی
                  </dt>
                  <dd className="mt-1.5 text-[0.8rem] text-fog-600">
                    {project.timeline}
                  </dd>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                  <dt className="flex items-center gap-1.5 text-[0.62rem] text-fog-500">
                    <Layers className="size-3" /> دسته‌بندی
                  </dt>
                  <dd className="mt-1.5 text-[0.8rem] text-fog-600">
                    {project.categoryLabel}
                  </dd>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                  <dt className="text-[0.62rem] text-fog-500">تکنولوژی</dt>
                  <dd className="mt-1.5 truncate text-[0.8rem] text-fog-600">
                    {project.tags.join(" · ")}
                  </dd>
                </div>
              </dl>
            </FadeUp>

            <Reveal className="mt-10">
              <div className="image-frame relative">
                <Image
                  src={project.image}
                  alt={`تصویر پروژه‌ی ${project.titleFa} — ${project.categoryLabel}`}
                  width={1200}
                  height={900}
                  loading="eager"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="h-auto w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 flex flex-wrap gap-1.5">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-[#FFF9F0]/15 bg-black/40 px-3 py-1 text-[0.65rem] text-[#FFF9F0]/90 backdrop-blur"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </header>

        <DeviceShowcase
          projectTitle={project.title}
          projectTitleFa={project.titleFa}
          image={project.image}
          accent={project.accent}
        />

        <Container className="py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,0.28fr)] lg:gap-16">
            <div className="space-y-12">
              <FadeUp>
                <p className="text-lg font-medium leading-9 text-fog-500">
                  {project.intro}
                </p>
              </FadeUp>

              {sections.map((section, index) => (
                <FadeUp key={section.key} delay={0.04 * index}>
                  <section aria-labelledby={`${section.key}-title`}>
                    <div className="flex items-center gap-3">
                      <span className="font-latin text-[0.6rem] tracking-[0.24em] text-brand-2">
                        0{index + 1}
                      </span>
                      <h2
                        id={`${section.key}-title`}
                        className="text-lg font-bold text-white sm:text-xl"
                      >
                        {section.label}
                      </h2>
                      <span className="font-latin text-[0.58rem] uppercase tracking-[0.2em] text-fog-600">
                        {section.latin}
                      </span>
                    </div>
                    <p className="mt-4 text-[0.88rem] leading-9 text-fog-400">
                      {project[section.key]}
                    </p>
                  </section>
                </FadeUp>
              ))}

              {project.quote ? (
                <FadeUp>
                  <figure className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-ink-2 p-7 sm:p-9">
                    <div
                      aria-hidden="true"
                      className="absolute -left-8 -top-8 size-40 rounded-full bg-brand/15 blur-[60px]"
                    />
                    <Quote className="size-7 text-brand-2/60" aria-hidden="true" />
                    <blockquote className="relative mt-4 text-[0.95rem] leading-9 text-fog-500">
                      «{project.quote.text}»
                    </blockquote>
                    <figcaption className="mt-5 border-t border-white/[0.07] pt-4 text-xs text-fog-500">
                      <span className="font-semibold text-fog-300">
                        {project.quote.author}
                      </span>
                      <span className="mx-1.5">—</span>
                      {project.quote.role}
                    </figcaption>
                  </figure>
                </FadeUp>
              ) : null}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <FadeUp delay={0.08}>
                <div className="rounded-[20px] border border-white/[0.07] bg-card/60 p-5">
                  <h2 className="text-[0.78rem] font-semibold text-white">
                    نتیجه‌ی پروژه
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {project.results.map((result) => (
                      <li
                        key={result.label}
                        className="border-b border-white/[0.06] pb-4 last:border-b-0 last:pb-0"
                      >
                        <span className="block text-xl font-extrabold text-white">
                          {result.value}
                        </span>
                        <span className="mt-1 block text-[0.68rem] text-fog-500">
                          {result.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.12}>
                <div className="rounded-[20px] border border-white/[0.07] bg-card/60 p-5">
                  <h2 className="text-[0.78rem] font-semibold text-white">
                    خدمات این پروژه
                  </h2>
                  <ul className="mt-3.5 space-y-2">
                    {project.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-center gap-2 text-[0.74rem] text-fog-400"
                      >
                        <span className="size-1 rounded-full bg-brand-2/80" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.16}>
                <Button href="/contact" fullWidth arrow>
                  پروژه‌ی مشابه می‌خواهم
                </Button>
              </FadeUp>
            </aside>
          </div>
        </Container>

        <div className="border-y border-white/[0.06] bg-ink-2/30">
          <Container>
            <nav
              aria-label="پروژه‌های دیگر"
              className="grid gap-px sm:grid-cols-2"
            >
              <Link
                href={`/portfolio/${next.slug}`}
                className="group flex flex-col gap-2 py-8 pe-6 transition-colors hover:bg-white/[0.02] sm:py-10"
              >
                <span className="inline-flex items-center gap-2 text-[0.65rem] text-fog-500">
                  <ArrowRight className="size-3.5" />
                  پروژه‌ی بعدی
                </span>
                <span className="text-lg font-bold text-white transition-colors group-hover:text-brand-600">
                  {next.titleFa}
                </span>
                <span className="text-[0.7rem] text-fog-500">
                  {next.categoryLabel}
                </span>
              </Link>
              <Link
                href={`/portfolio/${previous.slug}`}
                className="group flex flex-col gap-2 border-t border-white/[0.06] py-8 ps-6 transition-colors hover:bg-white/[0.02] sm:border-s sm:border-t-0 sm:py-10"
              >
                <span className="inline-flex items-center gap-2 text-[0.65rem] text-fog-500">
                  <ArrowLeft className="size-3.5" />
                  پروژه‌ی قبلی
                </span>
                <span className="text-lg font-bold text-white transition-colors group-hover:text-brand-600">
                  {previous.titleFa}
                </span>
                <span className="text-[0.7rem] text-fog-500">
                  {previous.categoryLabel}
                </span>
              </Link>
            </nav>
          </Container>
        </div>
      </article>

      <CTA />
    </>
  );
}
