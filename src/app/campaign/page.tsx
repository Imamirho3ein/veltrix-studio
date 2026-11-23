import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Gift,
  Globe,
  Infinity as InfinityIcon,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeUp } from "@/components/animations/FadeUp";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqSection } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { pricingPlans } from "@/data/pricing";
import {
  campaign,
  campaignFaqItems,
  campaignIncluded,
  campaignSteps,
} from "@/data/campaign";
import { siteConfig } from "@/lib/constants";
import {
  breadcrumbSchema,
  campaignOfferSchema,
  faqSchema,
  pageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "جشنواره ۱۵ میلیونی طراحی سایت",
  description:
    "جشنواره یک‌ماهه ولتریکس استودیو: همه‌ی خدمات طراحی سایت و توسعه وب با قیمت ثابت ۱۵ میلیون تومان، از ۲ آذر تا ۲ دی ۱۴۰۵ و بدون محدودیت ظرفیت.",
  path: "/campaign",
  ogTitle: "جشنواره ۱۵ میلیونی ولتریکس",
  ogSubtitle: "همه‌ی خدمات، یک قیمت: ۱۵ میلیون تومان.",
  keywords: [
    "جشنواره طراحی سایت",
    "طراحی سایت ۱۵ میلیون تومان",
    "قیمت طراحی سایت",
    "تخفیف طراحی سایت",
  ],
});

const terms: Array<{
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
  {
    title: "بازه‌ی جشنواره",
    text: `${campaign.startLabel} تا ${campaign.endLabel}`,
    Icon: CalendarDays,
  },
  {
    title: "قیمت ثابت",
    text: `${campaign.priceLabel} برای هر ۹ پکیج`,
    Icon: Wallet,
  },
  {
    title: "ظرفیت",
    text: "بدون محدودیت؛ همه‌ی سفارش‌های این بازه پذیرفته می‌شوند",
    Icon: InfinityIcon,
  },
  {
    title: "زیرساخت",
    text: "دامنه و هاست جداگانه و به نام خودتان",
    Icon: Globe,
  },
];

export default function CampaignPage() {
  if (!campaign.enabled) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { title: "خانه", href: "/" },
            { title: "جشنواره", href: "/campaign" },
          ]),
          campaignOfferSchema(),
          faqSchema(campaignFaqItems),
        ]}
      />

      <PageHero
        eyebrow="جشنواره یک‌ماهه"
        breadcrumb="جشنواره"
        title={
          <>
            یک ماه،
            <br />{" "}
            <span className="text-gradient">یک قیمت برای همه.</span>
          </>
        }
        description={`از ${campaign.startLabel} تا ${campaign.endLabel}، همه‌ی خدمات طراحی و توسعه‌ی سایت با قیمت ثابت ${campaign.priceLabel} ارائه می‌شوند؛ بدون محدودیت ظرفیت و بدون هزینه‌ی پنهان.`}
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex h-9 items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.06] px-4 text-[0.72rem] text-brand-700">
            <CalendarDays className="size-3.5" />
            {campaign.rangeLabel}
          </span>
          <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-[0.72rem] text-fog-500">
            <InfinityIcon className="size-3.5" />
            بدون محدودیت ظرفیت
          </span>
          <Link href="#order" className="btn btn-primary btn-sm">
            ثبت سفارش جشنواره
            <ArrowLeft className="size-3.5" />
          </Link>
        </div>
      </PageHero>

      <Container className="section-y">
        <FadeUp>
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="dark-scope relative overflow-hidden rounded-[28px] border border-[#8a6240]/30 bg-[linear-gradient(135deg,#2a1d14_0%,#4a3223_54%,#6f4e37_100%)] p-6 text-[#fff6ec] shadow-[0_40px_100px_-50px_rgba(59,42,31,0.9)] sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-[#d4b996]/20 blur-[80px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-[#b08968]/20 blur-[90px]"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d4b996]/30 bg-white/[0.06] px-3 py-1.5 text-[0.68rem] text-[#e6d3bd]">
                  <Gift className="size-3.5" />
                  قیمت ثابت جشنواره
                </span>

                <p className="mt-7 text-[0.72rem] text-[#c9b49b]">
                  قیمت عادی پروژه‌ها
                </p>
                <p className="mt-1 text-lg text-[#c9b49b] line-through decoration-[#d4b996]/60 decoration-2">
                  {campaign.normalRangeLabel}
                </p>

                <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
                  <span className="font-latin text-[clamp(4.5rem,12vw,7rem)] font-extrabold leading-[0.82] text-[#fff6ec]">
                    ۱۵
                  </span>
                  <span className="pb-2 text-lg font-bold text-[#e6d3bd]">
                    میلیون تومان
                  </span>
                </div>

                <p className="mt-5 max-w-md text-[0.84rem] leading-7 text-[#d8c4ac]">
                  برای همه‌ی ۹ پکیج؛ از سایت شرکتی و فروشگاهی تا پزشکی، آموزشی و
                  سازمانی. بدون محدودیت ظرفیت و بدون هزینه‌ی پنهان.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="#order"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#fff6ec] px-5 text-sm font-semibold text-[#3b2a1f] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    ثبت سفارش جشنواره
                    <ArrowLeft className="size-4" />
                  </Link>
                  <span className="inline-flex items-center gap-2 text-[0.7rem] text-[#c9b49b]">
                    <CalendarDays className="size-3.5" />
                    {campaign.rangeLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-[28px] border border-white/[0.08] bg-card p-6 sm:p-8">
              <span className="flex size-11 items-center justify-center rounded-xl border border-brand/20 bg-brand/[0.07] text-brand-500">
                <ShieldCheck className="size-5" />
              </span>
              <h2 className="mt-5 text-xl font-bold text-white">
                در قیمت ۱۵ میلیون تومان چه چیزی دریافت می‌کنید؟
              </h2>
              <p className="mt-2 text-[0.78rem] leading-7 text-fog-400">
                همه‌ی موارد زیر بخشی از تحویل هر پروژه در جشنواره است؛ بدون
                افزودن هزینه‌ی پنهان.
              </p>

              <ul className="mt-6 grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {campaignIncluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.78rem] leading-6 text-fog-600"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-brand-400/25 bg-brand-400/10 text-brand-500">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[0.66rem] leading-6 text-fog-500">
                هزینه‌ی دامنه و هاست جداگانه محاسبه می‌شود و به نام خودتان ثبت
                می‌گردد.
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="mt-16">
          <SectionTitle
            eyebrow="همه‌ی پکیج‌ها"
            title={
              <>
                هر خدمتی لازم دارید،{" "}
                <span className="text-gradient">۱۵ میلیون تومان.</span>
              </>
            }
            description="۹ پکیج پرکاربرد برای کسب‌وکارهای مختلف. اگر نوع پروژه‌تان در لیست نیست، در فرم سفارش توضیح دهید تا مسیر مناسب را پیشنهاد بدهیم."
          />

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <FadeUp key={plan.slug} delay={index * 0.03}>
                  <Link
                    href="#order"
                    className="group flex h-full flex-col rounded-[20px] border border-white/[0.07] bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand/25 hover:bg-card-hover hover:shadow-[0_30px_70px_-45px_rgba(59,42,31,0.4)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-brand-300 transition group-hover:border-brand/30 group-hover:bg-brand/10 group-hover:text-brand-500">
                        <Icon className="size-4.5" />
                      </span>
                      <span className="font-latin text-[0.55rem] tracking-[0.18em] text-fog-600">
                        {plan.slug.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-white">
                      {plan.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.72rem] leading-6 text-fog-400">
                      {plan.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <span className="text-[0.6rem] text-fog-500">
                        قیمت جشنواره
                      </span>
                      <span className="text-[0.82rem] font-bold text-brand-700">
                        {campaign.priceLabel}
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>

          <p className="mt-5 flex items-start gap-2 text-[0.68rem] leading-6 text-fog-500">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-brand" />
            همه‌ی قیمت‌ها به تومان و برای طراحی و توسعه‌ی سایت هستند؛ دامنه و
            هاست جداگانه محاسبه می‌شود.
          </p>
        </div>

        <div className="mt-16">
          <SectionTitle
            eyebrow="شرایط جشنواره"
            title={
              <>
                شفاف،{" "}
                <span className="text-gradient">بدون ستاره و پانویس.</span>
              </>
            }
            description="چهار چیزی که قبل از ثبت سفارش باید بدانید. اگر سؤال دیگری دارید، بخش سؤالات متداول پایین همین صفحه پاسخ می‌دهد."
          />

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {terms.map(({ title, text, Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
              >
                <span className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-brand-300">
                  <Icon className="size-4.5" />
                </span>
                <h3 className="mt-4 text-sm font-bold text-white">{title}</h3>
                <p className="mt-2 text-[0.72rem] leading-6 text-fog-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionTitle
            eyebrow="مسیر سفارش"
            title={
              <>
                سه قدم تا{" "}
                <span className="text-gradient">شروع پروژه.</span>
              </>
            }
            description="فرایند جشنواره ساده است؛ از انتخاب پکیج تا شروع طراحی، کمتر از یک روز کاری."
          />

          <ol className="mt-9 grid gap-3 md:grid-cols-3">
            {campaignSteps.map((step) => (
              <li
                key={step.number}
                className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-card p-5"
              >
                <span className="font-latin text-[0.62rem] tracking-[0.24em] text-brand-400">
                  {step.number}
                </span>
                <h3 className="mt-3 text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.76rem] leading-7 text-fog-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      <section
        id="order"
        className="section-y scroll-mt-24 border-y border-white/[0.06] bg-ink-2/35"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
            <FadeUp>
              <p className="eyebrow">ثبت سفارش</p>
              <h2 className="section-title mt-4">
                پروژه‌ی شما در جشنواره جا دارد.
              </h2>
              <p className="lead mt-4 text-[0.95rem]">
                فرم کوتاه زیر را پر کنید؛ نیازی به ساخت حساب کاربری نیست. بعد از
                بررسی، برای هماهنگی تماس و زمان‌بندی با شما صحبت می‌کنیم و
                قیمت ثابت ۱۵ میلیون تومان روی سفارش شما قفل می‌شود.
              </p>

              <div className="mt-6 rounded-2xl border border-brand/20 bg-brand/[0.05] p-5">
                <p className="text-[0.66rem] text-fog-500">
                  قیمت ثابت جشنواره
                </p>
                <p className="mt-1 text-2xl font-extrabold text-white">
                  {campaign.priceLabel}
                </p>
                <p className="mt-1 text-[0.68rem] text-fog-500">
                  {campaign.rangeLabel} — بدون محدودیت ظرفیت
                </p>
              </div>

              <ul className="mt-6 space-y-3 text-[0.78rem] text-fog-400">
                <li className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-brand-300">
                    <Phone className="size-3.5" />
                  </span>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    dir="ltr"
                    className="transition hover:text-white"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-brand-300">
                    <Send className="size-3.5" />
                  </span>
                  <a
                    href={siteConfig.telegram.channel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    گفتگو در تلگرام
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-brand-300">
                    <Clock className="size-3.5" />
                  </span>
                  پاسخ‌گویی {siteConfig.responseTime}
                </li>
              </ul>
            </FadeUp>

            <FadeUp delay={0.1}>
              <ContactForm campaign />
            </FadeUp>
          </div>
        </Container>
      </section>

      <FaqSection
        items={campaignFaqItems}
        eyebrow="سؤالات جشنواره"
        title={
          <>
            هر چیزی که درباره‌ی{" "}
            <span className="text-gradient">جشنواره</span> می‌پرسید
          </>
        }
        description="اگر پاسخ سؤال‌تان اینجا نبود، در تلگرام یا فرم سفارش بپرسید؛ همان تیم جواب می‌دهد."
        id="campaign-faq"
      />
    </>
  );
}
