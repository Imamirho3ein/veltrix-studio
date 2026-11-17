import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const Icon = service.icon;

  return (
    <Link
      href={`/services#${service.slug}`}
      className={cn(
        "gradient-border group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-[20px] border border-white/[0.07] bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/[0.12] hover:bg-card-hover hover:shadow-[0_30px_80px_-40px_rgba(240, 162, 76,0.55)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240, 162, 76,0.16),transparent_62%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-brand-300 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:border-brand/30 group-hover:bg-brand/15 group-hover:text-white">
          <Icon className="size-5" />
        </span>
        <span className="font-latin text-[0.68rem] tracking-[0.2em] text-fog-600">
          {service.number}
        </span>
      </div>

      <div className="relative mt-9">
        <h3 className="text-[1.05rem] font-bold text-white">{service.title}</h3>
        <p className="mt-3 text-[0.84rem] leading-7 text-fog-400">
          {service.summary}
        </p>
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="font-latin text-[0.62rem] tracking-[0.16em] text-fog-500">
          {service.latin}
        </span>
        <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-fog-300 transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand/15 group-hover:text-white">
          <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
