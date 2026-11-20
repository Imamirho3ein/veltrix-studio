import { projects } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { FadeUp } from "@/components/animations/FadeUp";

export function PortfolioPreview() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="section-y border-t border-white/[0.06] bg-ink-2/20"
    >
      <Container>
        <SectionTitle
          id="portfolio-title"
          eyebrow="نمونه‌کارها"
          title={
            <>
              پروژه‌هایی که{" "}
              <span className="text-gradient">حرف می‌زنند.{" "}</span>
            </>
          }
          description="بخشی از پروژه‌هایی که با دقت و وسواس برای برندهای مختلف طراحی و توسعه داده‌ایم. هر کدام یک مسئله‌ی واقعی و یک راه‌حل اختصاصی دارند. یکی مسیر خرید را کوتاه‌تر می‌کند. دیگری داده‌های پیچیده را خوانا نشان می‌دهد. در همه‌ی این پروژه‌ها، طراحی و کد در خدمت هدف کسب‌وکار بوده‌اند. نتیجه، تجربه‌ای است که کاربر راحت‌تر تصمیم می‌گیرد و برند شما را جدی‌تر می‌گیرد."
          action={
            <Button href="/portfolio" variant="secondary" size="sm" arrow>
              همه‌ی پروژه‌ها
            </Button>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project, index) => (
            <FadeUp key={project.slug} delay={index * 0.07}>
              <PortfolioCard project={project} className="h-full" />
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
