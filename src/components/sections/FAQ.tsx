"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import type { FaqItem } from "@/data/faq";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Container } from "@/components/ui/Container";

type FaqSectionProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  id?: string;
};

export function FaqSection({
  items,
  eyebrow = "سؤالات متداول",
  title = (
    <>
      هر چیزی که باید <span className="text-gradient">بدانید</span>
    </>
  ),
  description = "اگر پاسخ سؤالتان را پیدا نکردید، کافی است یک پیام تلگرام بفرستید؛ سریع جواب می‌دهیم.",
  id = "faq",
}: FaqSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="section-y border-t border-white/[0.06] bg-ink-2/20"
    >
      <Container>
        <SectionTitle
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 overflow-hidden rounded-[20px] border border-white/[0.07] bg-card/50">
          {items.map((item, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div
                key={item.question}
                className="border-b border-white/[0.06] last:border-b-0"
              >
                <button
                  type="button"
                  id={`${id}-button-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-panel-${index}`}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-start transition-colors hover:bg-white/[0.02] sm:px-7"
                >
                  <strong className="text-[0.88rem] font-semibold text-white sm:text-[0.95rem]">
                    {item.question}
                  </strong>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-brand/40 bg-brand/15 text-white"
                        : "border-white/10 bg-white/[0.03] text-fog-400"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="size-3.5" />
                    ) : (
                      <Plus className="size-3.5" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`${id}-panel-${index}`}
                      role="region"
                      aria-labelledby={`${id}-button-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 text-[0.82rem] leading-8 text-fog-400 sm:px-7">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
