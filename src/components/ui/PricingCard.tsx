import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PricingPlan } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const Icon = plan.icon;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-[20px] border p-6 transition-all duration-500 hover:-translate-y-1",
        plan.popular
          ? "gradient-border border-brand/30 bg-[linear-gradient(160deg,rgba(176, 137, 104,0.16),rgba(255, 249, 240,0.94))] shadow-[0_30px_80px_-45px_rgba(176, 137, 104,0.8)]"
          : "border-white/[0.07] bg-card hover:border-white/[0.13] hover:bg-card-hover",
      )}
    >
      {plan.popular ? (
        <span className="absolute -top-3 right-5 rounded-full bg-[linear-gradient(135deg,#b08968,#d4b996)] px-3 py-1 text-[0.6rem] font-medium text-[#2c241d]">
          پرطرفدار
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-brand-300">
          <Icon className="size-5" />
        </span>
        <span className="font-latin text-[0.58rem] tracking-[0.18em] text-fog-600">
          {plan.slug.toUpperCase()}
        </span>
      </div>

      <h2 className="mt-5 text-base font-bold text-white">{plan.title}</h2>
      <p className="mt-2 text-[0.76rem] leading-6 text-fog-400">
        {plan.description}
      </p>

      <div className="mt-6 flex-1 space-y-2.5 border-t border-white/[0.06] pt-5">
        {plan.templateRange ? (
          <div className="flex items-center justify-between gap-3">
            <span className="text-[0.7rem] text-fog-500">قالب آماده</span>
            <span className="text-[0.78rem] font-medium text-fog-300">
              {plan.templateRange}
            </span>
          </div>
        ) : null}

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3">
          <span className="block text-[0.62rem] text-fog-500">
            {plan.customLabel}
          </span>
          <span className="mt-1 block text-[0.92rem] font-bold text-white">
            {plan.customPrice}
          </span>
        </div>

        {plan.note ? (
          <p className="pt-1 text-[0.62rem] leading-5 text-fog-500">
            {plan.note}
          </p>
        ) : null}
      </div>

      <Link
        href="/contact"
        className="group mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[0.7rem] border border-white/10 bg-white/[0.03] text-[0.76rem] text-fog-500 transition-all duration-300 hover:border-brand/35 hover:bg-brand/10 hover:text-brand-800"
      >
        درخواست مشاوره
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
      </Link>
    </div>
  );
}
