import Image from "next/image";
import { Monitor, Smartphone } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { Container } from "@/components/ui/Container";

type DeviceShowcaseProps = {
  projectTitle: string;
  projectTitleFa: string;
  image: string;
  accent: string;
};

/**
 * نمایش واکنش‌گرای نمونه‌کار: همان سایت روی مانیتور و موبایل.
 * بدون جاوااسکریپت — فقط CSS.
 */
export function DeviceShowcase({
  projectTitle,
  projectTitleFa,
  image,
  accent,
}: DeviceShowcaseProps) {
  return (
    <section
      aria-labelledby="responsive-showcase-title"
      className="border-y border-white/[0.06] bg-ink-2/40 py-14 sm:py-18"
    >
      <Container>
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.64rem] text-fog-400">
              <Smartphone className="size-3.5 text-brand-2" />
              Mobile Responsive
            </span>
            <h2
              id="responsive-showcase-title"
              className="page-title mt-4 text-[1.35rem]"
            >
              از دسکتاپ تا موبایل، یک تجربه‌ی یکپارچه
            </h2>
            <p className="lead mt-3 text-[0.86rem]">
              نسخه‌ی موبایلِ {projectTitleFa} جدا طراحی و تست شده است؛ نه فقط
              کوچک‌شده‌ی نسخه‌ی دسکتاپ.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.08} className="mt-10 sm:mt-12">
          <div className="relative mx-auto max-w-4xl">
            {/* مانیتور */}
            <div
              className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#1a1714] p-1.5"
              style={{
                boxShadow: `0 44px 110px -48px ${accent}66`,
              }}
            >
              <div className="overflow-hidden rounded-xl border border-white/10 bg-ink">
                <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-3">
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="mx-auto flex h-4 w-1/3 items-center justify-center gap-1.5 rounded-full bg-white/[0.05] text-[7px] text-fog-500">
                    <span className="size-1 rounded-full bg-emerald-600/70" />
                    veltrixstudio/projects/{projectTitle}
                  </span>
                </div>
                <Image
                  src={image}
                  alt={`نمای دسکتاپ ${projectTitleFa}`}
                  width={1200}
                  height={900}
                  loading="lazy"
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </div>
            </div>
            <div className="mx-auto h-2.5 w-[92%] rounded-b-2xl border-x border-b border-white/10 bg-gradient-to-b from-[#26201a] to-[#121110]" />
            <div className="mx-auto h-1 w-28 rounded-b-full bg-black/50 blur-sm" />

            {/* موبایل */}
            <div className="absolute -bottom-10 left-2 w-[26%] max-w-[150px] rotate-[-6deg] sm:-bottom-14 sm:left-6 sm:w-[22%]">
              <div className="relative rounded-[1.4rem] border border-white/15 bg-[#141210] p-1.5 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)]">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-2.5 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-[#FFF9F0]/15"
                />
                <div className="overflow-hidden rounded-[1.05rem] border border-white/[0.06] bg-ink">
                  <Image
                    src={image}
                    alt={`نمای موبایل ${projectTitleFa}`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    sizes="150px"
                    className="aspect-[9/16] w-full object-cover object-top pt-3"
                  />
                </div>
              </div>
              <div className="mx-auto mt-0.5 h-1.5 w-10 rounded-b-full bg-black/50 blur-[2px]" />
            </div>

            {/* تبلت */}
            <div className="absolute -top-8 right-4 hidden w-[34%] max-w-[250px] rotate-[5deg] sm:block">
              <div className="relative rounded-2xl border border-white/12 bg-[#17140f] p-1.5 shadow-[0_34px_80px_-38px_rgba(0,0,0,0.8)]">
                <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-ink">
                  <Image
                    src={image}
                    alt={`نمای تبلت ${projectTitleFa}`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    sizes="250px"
                    className="aspect-[4/3] w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.14}>
          <ul className="mx-auto mt-14 grid max-w-3xl gap-3 text-center sm:grid-cols-3">
            {[
              {
                Icon: Monitor,
                title: "دسکتاپ",
                note: "چیدمان کامل با تمام جزئیات",
              },
              {
                Icon: Smartphone,
                title: "موبایل",
                note: "منو، سرعت و مسیر خرید بهینه‌شده",
              },
              {
                Icon: Monitor,
                title: "تبلت",
                note: "ترکیب هوشمندانه‌ی دو حالت",
              },
            ].map(({ Icon, title, note }) => (
              <li
                key={title}
                className="rounded-[18px] border border-white/[0.07] bg-card/50 px-4 py-5"
              >
                <span className="mx-auto flex size-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-brand-300">
                  <Icon className="size-4" />
                </span>
                <p className="mt-3 text-[0.8rem] font-bold text-white">{title}</p>
                <p className="mt-1 text-[0.68rem] leading-6 text-fog-500">
                  {note}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </Container>
    </section>
  );
}
