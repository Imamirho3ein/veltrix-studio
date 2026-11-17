import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { CtaCopy } from "@/components/sections/CtaCopy";
import { CtaVisual } from "@/components/sections/CtaVisual";

export function CTA() {
  return (
    <section
      aria-labelledby="cta-title"
      className="close-band relative overflow-hidden border-t border-white/[0.06]"
    >
      <Container className="relative py-16 md:py-24 lg:py-28">
        <div className="relative xl:min-h-[27rem]">
          <CtaCopy />

          <FadeUp
            delay={0.4}
            y={20}
            className="relative z-0 mt-12 xl:absolute xl:top-[-4.5rem] xl:-left-10 xl:mt-0 xl:w-[38rem]"
          >
            <CtaVisual />
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
