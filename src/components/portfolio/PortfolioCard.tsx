import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Smartphone } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function PortfolioCard({
  project,
  loading = "lazy",
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
}: {
  project: Project;
  loading?: "eager" | "lazy";
  className?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      aria-label={`مشاهده‌ی پروژه‌ی ${project.titleFa}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-card transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_36px_90px_-45px_rgba(176, 137, 104,0.6)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={`پیش‌نمایش وب‌سایت ${project.titleFa} — ${project.categoryLabel}`}
          width={1200}
          height={900}
          loading={loading}
          sizes={sizes}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/10 to-transparent opacity-80" />

        <span className="absolute right-4 top-4 rounded-full border border-[#FFF9F0]/15 bg-black/35 px-3 py-1 text-[0.65rem] text-[#FFF9F0]/90 backdrop-blur-md">
          {project.categoryLabel}
        </span>

        <span className="absolute bottom-4 left-4 flex size-10 translate-y-2 items-center justify-center rounded-full bg-[#FFFFFF] text-fog-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpLeft className="size-4" />
        </span>

        <span className="absolute bottom-4 right-4 font-latin text-[0.6rem] tracking-[0.2em] text-[#FFF9F0]/60">
          {project.year}
        </span>

        {/* نشان واکنش‌گرا بودن روی موبایل */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#FFF9F0]/12 bg-black/40 px-2.5 py-1 text-[0.58rem] text-[#FFF9F0]/85 backdrop-blur-md">
          <Smartphone className="size-3 text-brand-2" aria-hidden="true" />
          Mobile Ready
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="flex flex-wrap items-baseline gap-2 text-lg font-bold text-white">
            {project.titleFa}
            <span className="font-latin text-[0.68rem] font-medium tracking-wide text-fog-500">
              {project.title}
            </span>
          </h3>
        </div>
        <p className="mt-2 text-[0.83rem] leading-7 text-fog-400">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
