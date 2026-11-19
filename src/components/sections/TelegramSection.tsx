"use client";

import { motion } from "motion/react";
import { ArrowUpLeft, Bot, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";

const messages = [
  {
    from: "bot" as const,
    text: "سلام! به ولتریکس خوش آمدی. برای شروع پروژه یا مشاوره، همین‌جا بنویس.",
    delay: 0.2,
  },
  {
    from: "user" as const,
    text: "برای طراحی یک فروشگاه اینترنتی مشاوره می‌خوام.",
    delay: 0.55,
  },
  {
    from: "bot" as const,
    text: "عالیه. سه سؤال کوتاه می‌پرسم تا برآورد دقیق و زمان‌بندی بدیم.",
    delay: 0.9,
  },
];

export function TelegramSection() {
  return (
    <section
      aria-labelledby="telegram-title"
      className="section-y border-t border-white/[0.06]"
    >
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-2 p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-80 rounded-full bg-brand/20 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-20 size-96 rounded-full bg-accent-500/10 blur-[110px]"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <FadeUp>
              <Badge>
                <span className="font-latin tracking-[0.16em]">TELEGRAM</span>
                <span className="text-fog-600">/</span>
                <span>جامعه‌ی ولتریکس</span>
              </Badge>
              <h2 id="telegram-title" className="section-title mt-5">
                یک قدم <span className="text-gradient">جلوتر</span> باش.
              </h2>
              <p className="lead mt-5 max-w-lg text-[0.95rem]">
                پشت صحنه‌ی پروژه‌ها، نکته‌های طراحی و توسعه را در کانال تلگرام
                منتشر می‌کنیم. از تصمیم‌های کوچک رابط کاربری تا ترفندهای سرعت و
                سئوی تکنیکال. اگر می‌خواهید پیش از شروع همکاری با روش کار ما
                آشنا شوید، کانال جای خوبی برای شروع است. ربات تلگرام هم برای
                شروع سریع بریف پروژه آماده است. چند سؤال کوتاه می‌پرسد و درخواست
                شما را مستقیم به تیم می‌رساند. این‌طور بدون رفت‌وآمد اضافه، مسیر
                پروژه روشن می‌شود.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href={siteConfig.telegram.channel}
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/35 hover:bg-brand/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-brand/15 text-brand-300">
                      <MessageCircle className="size-4" />
                    </span>
                    <ArrowUpLeft className="size-4 text-fog-600 transition group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">کانال تلگرام</p>
                  <p
                    dir="ltr"
                    className="mt-1 text-start font-latin text-[0.68rem] text-fog-500"
                  >
                    {siteConfig.telegram.channelHandle}
                  </p>
                </a>

                <a
                  href={siteConfig.telegram.bot}
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/35 hover:bg-accent-400/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-accent-400/15 text-accent-600">
                      <Bot className="size-4" />
                    </span>
                    <ArrowUpLeft className="size-4 text-fog-600 transition group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">ربات پروژه</p>
                  <p
                    dir="ltr"
                    className="mt-1 text-start font-latin text-[0.68rem] text-fog-500"
                  >
                    {siteConfig.telegram.botHandle}
                  </p>
                </a>
              </div>

              <p className="mt-4 text-[0.68rem] text-fog-500">
                بدون پیام تبلیغاتی؛ فقط چیزهایی که به کارتان می‌آید.
              </p>
            </FadeUp>

            <div className="relative mx-auto w-full max-w-[320px]">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[70px]"
              />

              <motion.div
                initial={{ opacity: 0, y: 26, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="dark-scope relative overflow-hidden rounded-[2rem] border-[5px] border-[#26201a] bg-[#100f0e] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-[#2c241d]">
                    <Bot className="size-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-[0.72rem] font-semibold text-white">
                      Veltrix Bot
                    </p>
                    <p className="flex items-center gap-1.5 text-[0.58rem] text-fog-300">
                      <span className="size-1 rounded-full bg-brand-400" />
                      آنلاین · پاسخ سریع
                    </p>
                  </div>
                  <Send className="size-3.5 text-fog-400" />
                </div>

                <div className="space-y-2.5 px-3 pb-4 pt-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: message.delay,
                        ease: "easeOut",
                      }}
                      className={
                        message.from === "user"
                          ? "flex justify-start"
                          : "flex justify-end"
                      }
                    >
                      <p
                        dir="rtl"
                        className={
                          message.from === "user"
                            ? "max-w-[85%] rounded-2xl rounded-bl-md bg-[linear-gradient(135deg,#b08968,#d4b996)] px-3 py-2 text-[0.62rem] leading-6 text-[#2c241d]"
                            : "max-w-[85%] rounded-2xl rounded-br-md border border-white/[0.07] bg-white/[0.05] px-3 py-2 text-[0.62rem] leading-6 text-fog-300"
                        }
                      >
                        {message.text}
                      </p>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.25, duration: 0.4 }}
                    className="flex justify-start gap-1.5 pl-1"
                  >
                    <span className="size-1.5 animate-bounce rounded-full bg-fog-500 [animation-delay:-0.2s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-fog-500 [animation-delay:-0.1s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-fog-500" />
                  </motion.div>
                </div>

                <div className="flex items-center gap-2 border-t border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
                  <span className="flex-1 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[0.58rem] text-fog-500">
                    پیام خود را بنویسید…
                  </span>
                  <span className="flex size-7 items-center justify-center rounded-full bg-brand text-[#2c241d]">
                    <Send className="size-3" />
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
