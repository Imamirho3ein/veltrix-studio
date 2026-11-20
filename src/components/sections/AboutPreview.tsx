import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { FadeUp } from "@/components/animations/FadeUp";
import { toFa } from "@/lib/utils";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title" className="section-y relative overflow-hidden border-t border-white/[0.06] bg-ink-2/20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <FadeUp>
              <p className="eyebrow mb-4">درباره‌ی ولتریکس</p>
              <h2 id="about-preview-title" className="section-title">
                ما فقط سایت
                <br />{" "}
                <span className="text-gradient">نمی‌سازیم.</span>{" "}
              </h2>
            </FadeUp>

            <FadeUp delay={0.08}>
              <p className="mt-6 text-lg font-medium leading-9 text-fog-500">
                ما تجربه‌ای می‌سازیم که برند شما را به مخاطب نزدیک‌تر می‌کند.{" "}
              </p>
              <p className="mt-5 max-w-lg text-sm leading-8 text-fog-400">
                ولتریکس استودیو یک تیم کوچک و متمرکز برای طراحی تجربه‌های
                دیجیتال است. از استراتژی و رابط کاربری تا توسعه‌ی کامل وب‌سایت،
                کنار شما هستیم. هر پروژه را مثل محصول خودمان می‌بینیم؛ با وسواس
                در جزئیات و مسئولیت در نتیجه. کار را با شناخت کسب‌وکار شروع
                می‌کنیم و با تحویل یک سایت سریع، تمیز و قابل‌توسعه تمام
                می‌کنیم. در تمام مسیر، شفاف و در دسترس می‌مانیم.{" "}
              </p>
            </FadeUp>

            <FadeUp delay={0.14} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/about" variant="secondary" arrow>
                بیشتر درباره ما
              </Button>
              <span className="text-xs text-fog-500">
                تیم چهارنفره · مستقر در تهران
              </span>
            </FadeUp>
          </div>

          <div className="relative mx-auto w-full max-w-[480px]">
            <Reveal className="relative">
              <div className="relative aspect-square overflow-hidden rounded-[28px] border border-white/[0.09] bg-card">
              <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-80" />
              <div className="absolute -left-16 -top-10 size-56 rounded-full bg-brand/25 blur-[70px]" />
              <div className="absolute -bottom-20 -right-10 size-64 rounded-full bg-accent-500/15 blur-[80px]" />

              <svg
                viewBox="0 0 200 200"
                aria-hidden="true"
                className="absolute inset-6 size-[calc(100%-3rem)] animate-spin-slow text-fog-500/60"
              >
                <defs>
                  <path
                    id="about-orbit-path"
                    d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
                  />
                </defs>
                <text className="fill-current font-latin text-[7px] uppercase tracking-[0.34em]">
                  <textPath href="#about-orbit-path">
                    DESIGN · DEVELOPMENT · MOTION · STRATEGY ·
                  </textPath>
                </text>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-latin text-[clamp(5rem,12vw,7rem)] font-extrabold leading-none text-gradient-soft">
                  V
                </span>
                <span className="mt-2 font-latin text-[0.55rem] tracking-[0.4em] text-fog-400">
                  VELTRIX STUDIO
                </span>
                <span className="mt-4 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.62rem] text-fog-300 backdrop-blur">
                  از {toFa(1402)} تا امروز
                </span>
              </div>

              <div className="absolute right-5 top-6 rounded-lg border border-white/10 bg-[#1a1714]/80 px-3 py-2 backdrop-blur-md">
                <span className="block font-latin text-[0.55rem] tracking-[0.2em] text-fog-300">
                  LOCATION
                </span>
                <span className="mt-1 block text-[0.68rem] text-fog-200">
                  تهران، ایران
                </span>
              </div>

              <div className="absolute bottom-6 left-5 rounded-lg border border-white/10 bg-[#1a1714]/80 px-3 py-2 backdrop-blur-md">
                <span className="block font-latin text-[0.55rem] tracking-[0.2em] text-fog-300">
                  FOCUS
                </span>
                <span className="mt-1 block text-[0.68rem] text-fog-200">
                  طراحی × کد × حرکت
                </span>
              </div>
              </div>
            </Reveal>

            <div className="absolute -bottom-5 right-6 flex items-center gap-3 rounded-xl border border-white/10 bg-[#1a1714]/90 px-4 py-3 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md">
              <span className="text-xl font-bold text-[#FFF9F0]">
                {toFa(48)}+
              </span>
              <span className="text-[0.65rem] leading-5 text-fog-300">
                پروژه
                <br />{" "}
                تحویل‌شده
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
