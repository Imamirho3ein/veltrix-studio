import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { FadeUp } from "@/components/animations/FadeUp";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { initials } from "@/lib/utils";

const accents = ["#b08968", "#d4b996", "#c4a379", "#e0cbb0"];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="section-y border-t border-white/[0.06]"
    >
      <Container>
        <SectionTitle
          id="testimonials-title"
          eyebrow="نظر مشتری‌ها"
          title={
            <>
              مشتری‌ها <span className="text-gradient">چه می‌گویند؟</span>
            </>
          }
          description="ما بعد از تحویل پروژه هم در دسترس هستیم. پشتیبانی برای ما یک بند قرارداد نیست؛ بخشی از رابطه‌ی کاری است. این چند جمله از کسانی است که این مسیر را با ما رفته‌اند و نتیجه را از نزدیک دیده‌اند. بازخوردشان هم درباره‌ی کیفیت طراحی و سرعت سایت است و هم درباره‌ی شفافیت مسیر و پاسخ‌گویی تیم. همین بازخوردهاست که باعث می‌شود هر پروژه‌ی بعدی را با دقت بیشتری شروع کنیم."
          action={
            <Badge dot={false} className="gap-3 px-4 py-2">
              <span className="flex items-center gap-0.5 text-accent-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3 fill-current" />
                ))}
              </span>
              <span className="text-fog-300">۹۸٪ رضایت مشتری</span>
            </Badge>
          }
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <FadeUp key={testimonial.name} delay={index * 0.06}>
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-card p-6 transition-colors duration-500 hover:border-white/[0.13] hover:bg-card-hover sm:p-7">
                <Quote
                  aria-hidden="true"
                  className="absolute -left-2 -top-2 size-20 text-white/[0.025]"
                />
                <div className="flex items-center gap-0.5 text-accent-500">
                  {Array.from({ length: testimonial.rating }).map((_, star) => (
                    <Star key={star} className="size-3 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[0.86rem] leading-8 text-fog-300">
                  «{testimonial.comment} »
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <span
                    className="flex size-10 items-center justify-center rounded-full text-[0.7rem] font-bold text-[#FFF9F0]"
                    style={{
                      background: `linear-gradient(135deg, ${accents[index % accents.length]}, rgba(18, 17, 16,0.9))`,
                    }}
                    aria-hidden="true"
                  >
                    {initials(testimonial.name)}
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-white">
                      {testimonial.name}
                    </span>
                    <span className="mt-0.5 block text-[0.65rem] text-fog-500">
                      {testimonial.role} · {testimonial.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
