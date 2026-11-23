import Link from "next/link";
import { ArrowLeft, CalendarDays, Sparkles } from "lucide-react";
import { campaign } from "@/data/campaign";
import { cn } from "@/lib/utils";

type CampaignBannerProps = {
  className?: string;
  compact?: boolean;
};

export function CampaignBanner({ className, compact = false }: CampaignBannerProps) {
  if (!campaign.enabled) return null;

  return (
    <div
      className={cn(
        "dark-scope relative overflow-hidden rounded-[24px] border border-[#8a6240]/30 bg-[linear-gradient(115deg,#2a1d14_0%,#4a3223_52%,#6f4e37_100%)] text-[#fff6ec] shadow-[0_30px_80px_-45px_rgba(59,42,31,0.8)]",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-20 size-52 rounded-full bg-[#d4b996]/20 blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-10 size-56 rounded-full bg-[#b08968]/20 blur-[80px]"
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#d4b996]/25 bg-[#d4b996]/10 text-[#e6d3bd]">
            <Sparkles className="size-4.5" />
          </span>
          <div>
            {compact ? null : (
              <p className="font-latin text-[0.55rem] tracking-[0.26em] text-[#c9b49b]">
                ONE-MONTH CAMPAIGN
              </p>
            )}
            <p className="text-[0.95rem] font-bold leading-7 text-[#fff6ec] sm:text-base">
              جشنواره یک‌ماهه: همه‌ی خدمات {campaign.priceLabel}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] leading-6 text-[#c9b49b]">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                {campaign.rangeLabel}
              </span>
              <span aria-hidden="true" className="text-[#8a6240]">
                /
              </span>
              <span>بدون محدودیت ظرفیت</span>
            </p>
          </div>
        </div>

        <Link
          href="/campaign"
          className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#fff6ec] px-4 text-[0.76rem] font-semibold text-[#3b2a1f] transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-auto"
        >
          جزئیات و ثبت سفارش
          <ArrowLeft className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
