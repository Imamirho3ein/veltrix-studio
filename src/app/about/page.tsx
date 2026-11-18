import type { Metadata } from "next";
import {
  BarChart3,
  Eye,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { FadeUp } from "@/components/animations/FadeUp";
import { Reveal } from "@/components/animations/Reveal";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";
import { Process } from "@/components/sections/Process";
import { storyTimeline, team, values } from "@/data/about";
import { siteConfig } from "@/lib/constants";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { toFa } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "درباره ما",
  description:
    "ولتریکس استودیو یک تیم چهارنفره‌ی مستقر در تهران است؛ متخصص طراحی، توسعه و استراتژی که پروژه‌ها را مثل محصول خودش می‌بیند.",
  path: "/about",
  ogTitle: "درباره‌ی ولتریکس استودیو",
  ogSubtitle: "یک تیم کوچک، با وسواس بزرگ در جزئیات.",
});

const valueIcons: Record<(typeof values)[number]["icon"], LucideIcon> = {
  spark: Sparkles,
  eye: Eye,
  chart: BarChart3,
  shield: ShieldCheck,
};

const accents = ["#b08968", "#d4b996", "#c4a379", "#e0cbb0"];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { title: "خانه", href: "/" },
          { title: "درباره ما", href: "/about" },
        ])}
      />

      <PageHero
        eyebrow="درباره‌ی ولتریکس"
        breadcrumb="درباره ما"
        title={
          <>
            تیم کوچک،
            <br />{" "}
            <span className="text-gradient">وسواس بزرگ.</span>
          </>
        }
        description="ما معتقدیم سایت خوب فقط زیبا نیست؛ باید سریع باشد، قابل‌فهم باشد و کاری برای کسب‌وکار شما انجام دهد. این باور، پایه‌ی هر تصمیمی در ولتریکس است."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge dot={false}>
            <MapPin className="size-3.5 text-brand-2" />
            {siteConfig.location}
          </Badge>
          <Badge dot={false}>
            <Users className="size-3.5 text-accent-400" />
            تیم چهارنفره
          </Badge>
          <Badge dot={false}>
            <Sparkles className="size-3.5 text-brand-400" />
            از {toFa(1402)} تا امروز
          </Badge>
        </div>
      </PageHero>

      <Container className="section-y">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <FadeUp>
              <p className="text-xl font-medium leading-10 text-fog-500 sm:text-2xl sm:leading-[2.1]">
                ولتریکس با یک ایده‌ی ساده شروع شد: سایت‌هایی بسازیم که شبیه هم
                نباشند و بعد از تحویل هم کار کنند.
              </p>
            </FadeUp>

            <FadeUp delay={0.08} className="mt-7 space-y-5">
              <p className="text-sm leading-9 text-fog-400">
                در سال ۱۴۰۲، بیشتر پروژه‌های وب در ایران یا قالب‌های آماده‌ی
                تکراری بودند یا پروژه‌هایی که زیبا به نظر می‌رسیدند اما در
                استفاده‌ی واقعی می‌شکستند. ما می‌خواستیم هر دو طرف را کنار هم
                بگذاریم: طراحی اختصاصی و مهندسی دقیق.
              </p>
              <p className="text-sm leading-9 text-fog-400">
                امروز تیم ما چهار نفر است: یک طراح محصول، یک توسعه‌دهنده، یک
                استراتژیست محتوا و یک مدیر خلاقیت. کوچک مانده‌ایم تا هر پروژه را
                خودمان جلو ببریم؛ بدون واسطه، بدون لایه‌های اضافه و با
                مسئولیت‌پذیری کامل.
              </p>
              <p className="text-sm leading-9 text-fog-400">
                ما ادعا نمی‌کنیم برای همه مناسبیم. اگر به دنبال ارزان‌ترین گزینه
                هستید، احتمالاً جای دیگری بهتر است. اما اگر کیفیت طراحی، سرعت و
                جزئیات برایتان مهم است، احتمالاً می‌توانیم خوب کنار هم کار
                کنیم.
              </p>
            </FadeUp>

            <FadeUp delay={0.14} className="mt-9">
              <div className="gradient-border rounded-[20px] border border-white/[0.08] bg-card/60 p-5">
                <p className="text-[0.8rem] leading-7 text-fog-300">
                  «ما هیچ‌وقت پروژه‌ای را شروع نمی‌کنیم که به آن باور نداریم. اگر
                  مطمئن باشیم سایت شما به چیزی که می‌خواهید نمی‌رسد، همان
                  ابتدا می‌گوییم.»
                </p>
                <p className="mt-3 text-[0.68rem] text-fog-500">
                  — آرمین کاظمی، بنیان‌گذار ولتریکس
                </p>
              </div>
            </FadeUp>
          </div>

          <Reveal className="lg:pt-2">
            <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-ink-2">
              <div className="relative border-b border-white/[0.07] p-6">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 size-40 rounded-full bg-brand/20 blur-[60px]"
                />
                <p className="font-latin text-[0.6rem] tracking-[0.28em] text-fog-500">
                  VELTRIX STUDIO
                </p>
                <p className="mt-3 font-latin text-4xl font-extrabold leading-none text-gradient-soft">
                  V
                </p>
                <p className="mt-4 text-xs leading-6 text-fog-400">
                  استودیو طراحی و توسعه‌ی تجربه‌های دیجیتال؛ مستقر در تهران،
                  همکار با برندهای سراسر ایران.
                </p>
              </div>

              <dl className="divide-y divide-brand/10">
                {[
                  { label: "سال تأسیس", value: siteConfig.founded },
                  { label: "اندازه‌ی تیم", value: "۴ متخصص" },
                  { label: "حوزه‌ی تمرکز", value: "وب، محصول، برند" },
                  { label: "زمان پاسخ‌گویی", value: "کمتر از ۲۴ ساعت" },
                  { label: "شروع قیمت پروژه", value: "۴۷ میلیون تومان" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 px-6 py-3.5"
                  >
                    <dt className="text-[0.7rem] text-fog-500">{item.label}</dt>
                    <dd className="text-[0.74rem] text-fog-600">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>

      <Stats />

      <section
        aria-labelledby="values-title"
        className="section-y border-t border-white/[0.06]"
      >
        <Container>
          <SectionTitle
            id="values-title"
            eyebrow="ارزش‌های ما"
            title={
              <>
                چهار چیزی که <span className="text-gradient">کنار نمی‌گذاریم</span>
              </>
            }
            description="این‌ها شعار دیوار دفتر نیستند؛ معیار تصمیم‌گیری روزانه‌ی ما هستند."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = valueIcons[value.icon];
              return (
                <FadeUp key={value.title} delay={index * 0.06}>
                  <div className="group flex h-full gap-4 rounded-[20px] border border-white/[0.07] bg-card/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.13] hover:bg-card-hover">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-brand-300 transition-colors group-hover:text-accent-300">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-[0.95rem] font-bold text-white">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-[0.8rem] leading-7 text-fog-400">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="timeline-title"
        className="section-y border-t border-white/[0.06] bg-ink-2/20"
      >
        <Container>
          <SectionTitle
            id="timeline-title"
            eyebrow="مسیر ما"
            title={
              <>
                از دو نفر تا <span className="text-gradient">یک تیم کامل</span>
              </>
            }
            description="ولتریکس یک‌شبه ساخته نشد. این مسیر، مرحله‌به‌مرحله شکل گرفته است."
          />

          <div className="relative mt-14">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-[7px] w-px bg-gradient-to-b from-brand/50 via-brand/15 to-transparent md:right-1/2"
            />

            <ol className="space-y-10 md:space-y-0">
              {storyTimeline.map((item, index) => (
                <li key={item.year} className="relative md:grid md:grid-cols-2">
                  <FadeUp
                    delay={index * 0.06}
                    className={
                      index % 2 === 0
                        ? "pe-9 md:pe-14 md:text-end"
                        : "pe-9 md:col-start-2 md:ps-14 md:pe-0"
                    }
                  >
                    <span className="text-[0.68rem] text-brand-2">
                      {item.year}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.82rem] leading-7 text-fog-400">
                      {item.description}
                    </p>
                  </FadeUp>

                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-1.5 size-[15px] rounded-full border-[3px] border-ink bg-brand shadow-[0_0_0_4px_rgba(176, 137, 104,0.18)] md:right-1/2 md:translate-x-1/2"
                  />
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="team-title" className="section-y">
        <Container>
          <SectionTitle
            id="team-title"
            eyebrow="تیم"
            title={
              <>
                آدم‌هایی که <span className="text-gradient">پشت کار</span> هستند
              </>
            }
            description="ما همه‌ی کارها را خودمان انجام می‌دهیم؛ بدون برون‌سپاری، بدون واسطه."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <FadeUp key={member.name} delay={index * 0.06}>
                <div className="group h-full overflow-hidden rounded-[20px] border border-white/[0.07] bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.13] hover:bg-card-hover">
                  <span
                    className="flex size-14 items-center justify-center rounded-2xl text-sm font-bold text-[#FFF9F0]"
                    style={{
                      background: `linear-gradient(135deg, ${accents[index % accents.length]}, rgba(18, 17, 16,0.9))`,
                    }}
                    aria-hidden="true"
                  >
                    {member.initials}
                  </span>
                  <h3 className="mt-5 text-[0.92rem] font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[0.65rem] text-brand-300/90">
                    {member.role}
                  </p>
                  <p className="mt-3 text-[0.76rem] leading-7 text-fog-400">
                    {member.bio}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      <Process />
      <CTA />
    </>
  );
}
