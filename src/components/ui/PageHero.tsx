import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  breadcrumb: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-[calc(var(--header-height)+3.5rem)] sm:pb-20 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-60" />
        <div className="orb -top-40 right-[12%] size-[28rem] bg-brand/18" />
        <div className="orb -left-32 top-1/3 size-72 bg-accent-500/10" />
      </div>

      <Container>
        <FadeUp>
          <nav
            aria-label="مسیر صفحه"
            className="mb-8 flex items-center gap-2 text-[0.68rem] text-fog-500"
          >
            <Link href="/" className="transition hover:text-white">
              خانه
            </Link>
            <ChevronLeft className="size-3" aria-hidden="true" />
            <span className="text-fog-300">{breadcrumb}</span>
          </nav>

          <Badge>{eyebrow}</Badge>

          <h1 className="page-title mt-6 max-w-4xl">{title}</h1>

          <p className="lead mt-6 max-w-2xl text-[0.95rem]">{description}</p>

          {children ? <div className="mt-8">{children}</div> : null}
        </FadeUp>
      </Container>
    </section>
  );
}
