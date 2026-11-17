import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-20 pt-[calc(var(--header-height)+5rem)] sm:pt-[calc(var(--header-height)+8rem)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-60" />
        <div className="orb -top-40 right-[16%] size-[26rem] bg-brand/20" />
        <div className="orb -left-24 top-1/2 size-72 bg-accent-500/10" />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-latin text-[clamp(6rem,20vw,11rem)] font-extrabold leading-none tracking-tight text-gradient-soft">
            404
          </p>

          <h1 className="page-title mt-4">این صفحه پیدا نشد.</h1>
          <p className="lead mx-auto mt-5 max-w-md text-[0.95rem]">
            آدرسی که دنبالش بودید وجود ندارد یا جابه‌جا شده است. می‌توانید از
            صفحه‌ی اصلی شروع کنید یا نمونه‌کارها را ببینید.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/" icon={<Home className="size-4" />} fullWidth className="sm:w-auto">
              بازگشت به خانه
            </Button>
            <Button
              href="/portfolio"
              variant="secondary"
              icon={<Search className="size-4" />}
              fullWidth
              className="sm:w-auto"
            >
              دیدن نمونه‌کارها
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-fog-500">
            {[
              { title: "خدمات", href: "/services" },
              { title: "تعرفه‌ها", href: "/pricing" },
              { title: "درباره ما", href: "/about" },
              { title: "تماس با ما", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-1.5 transition hover:text-white"
              >
                {item.title}
                <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
