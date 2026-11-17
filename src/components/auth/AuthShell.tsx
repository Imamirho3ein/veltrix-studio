import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pb-16 pt-[calc(var(--header-height)+4rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 grid-lines opacity-60" />
        <div className="orb -top-40 right-[18%] size-[26rem] bg-brand/15" />
        <div className="orb -left-32 bottom-0 size-72 bg-accent-500/10" />
      </div>

      <Container>
        <div className="mx-auto w-full max-w-md">
          <div className="mb-7 flex flex-col items-center gap-3 text-center">
            <Link
              href="/"
              aria-label="ولتریکس استودیو — صفحه اصلی"
              className="rounded-xl"
            >
              <Logo size={54} loading="eager" />
            </Link>
            <h1 className="text-xl font-bold text-white">{title}</h1>
            <p className="text-xs leading-6 text-fog-400">{subtitle}</p>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-card/60 p-6 backdrop-blur-sm sm:p-8">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
