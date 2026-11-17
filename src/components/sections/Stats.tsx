import { stats } from "@/data/site";
import { CountUp } from "@/components/animations/CountUp";
import { FadeUp } from "@/components/animations/FadeUp";
import { Container } from "@/components/ui/Container";

export function Stats() {
  return (
    <section
      id="stats"
      aria-label="آمار ولتریکس استودیو"
      className="relative border-y border-white/[0.06] bg-ink-2/40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176, 137, 104,0.08),transparent_70%)]"
      />
      <Container className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeUp
              key={stat.label}
              delay={index * 0.06}
              className="relative border-white/[0.07] px-2 py-10 text-center [&:nth-child(even)]:border-s sm:px-6 lg:border-s lg:py-14 lg:[&:first-child]:border-s-0 lg:[&:nth-child(even)]:border-s"
            >
              <div
                aria-hidden="true"
                className="text-[clamp(2rem,4.4vw,3.35rem)] font-extrabold leading-none tracking-tight text-white"
              >
                <CountUp
                  value={stat.value}
                  prefix={stat.suffix === "+" ? "+" : ""}
                  suffix={stat.suffix === "+" ? "" : stat.suffix}
                />
              </div>
              <p className="mt-3 text-xs text-fog-400 sm:text-sm">
                {stat.label}
              </p>
              <span className="sr-only">
                {stat.label}: {stat.value}
              </span>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
