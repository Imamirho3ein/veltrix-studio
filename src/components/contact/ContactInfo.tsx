import {
  ArrowUpLeft,
  Bot,
  Clock,
  Mail,
  Send,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/Social";
import { siteConfig } from "@/lib/constants";

const items = [
  {
    title: "ایمیل",
    value: siteConfig.emailDisplay,
    href: `mailto:${siteConfig.email}`,
    Icon: Mail,
    note: "برای بریف، فایل یا سؤال فنی",
    ltr: true,
  },
  {
    title: "تلگرام",
    value: siteConfig.telegram.channelHandle,
    href: siteConfig.telegram.channel,
    Icon: Send,
    note: "سریع‌ترین راه گفتگو",
    ltr: true,
  },
  {
    title: "اینستاگرام",
    value: siteConfig.instagramHandle,
    href: siteConfig.instagram,
    Icon: InstagramIcon,
    note: "پشت صحنه و نمونه‌کارهای تازه",
    ltr: true,
  },
  {
    title: "ساعات پاسخ‌گویی",
    value: siteConfig.workHours,
    href: null,
    Icon: Clock,
    note: "بیرون از این بازه، پیام بگذارید",
    ltr: false,
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-white/[0.08] bg-card/50 p-6">
        <h2 className="text-base font-bold text-white">راه‌های ارتباطی</h2>
        <p className="mt-2 text-xs leading-6 text-fog-400">
          هر کدام راحت‌ترید؛ همه‌شان به یک تیم می‌رسند.
        </p>

        <ul className="mt-6 space-y-2">
          {items.map(({ title, value, href, Icon, note, ltr }) => {
            const content = (
              <>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-brand-300">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.65rem] text-fog-500">
                    {title}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.82rem] text-fog-200">
                    {value}
                  </span>
                  <span className="mt-0.5 block text-[0.6rem] text-fog-500">
                    {note}
                  </span>
                </span>
                {href ? (
                  <ArrowUpLeft className="size-3.5 shrink-0 text-fog-600 transition group-hover:text-white" />
                ) : null}
              </>
            );

            return (
              <li key={title}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                    }
                    className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.03]"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    className="flex items-center gap-3 rounded-xl p-2"
                    dir={ltr ? "ltr" : undefined}
                  >
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.09] bg-[linear-gradient(135deg,rgba(240, 162, 76,0.16),rgba(233, 199, 155,0.07))] p-6">
        <div
          aria-hidden="true"
          className="absolute -right-10 -top-10 size-36 rounded-full bg-brand/25 blur-3xl"
        />
        <div className="relative">
          <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-accent-300">
            <Bot className="size-5" />
          </span>
          <h3 className="mt-4 text-sm font-bold text-white">
            ترجیح می‌دهید سریع‌تر پیش برود؟
          </h3>
          <p className="mt-2 text-xs leading-6 text-fog-400">
            ربات تلگرام ولتریکس سؤال‌های اولیه را می‌پرسد و درخواست شما را مستقیم
            به تیم می‌رساند.
          </p>
          <a
            href={siteConfig.telegram.bot}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-accent-300 transition hover:text-white"
          >
            گفتگو با ربات
            <ArrowUpLeft className="size-3.5" />
          </a>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-5">
        <p className="text-[0.68rem] leading-6 text-fog-500">
          <span className="font-semibold text-fog-300">نکته:</span> برای
          شروع، نیازی به بریف کامل نیست. یک توضیح کوتاه از کسب‌وکار و هدفتان
          کافی است تا مسیر را با هم روشن کنیم.
        </p>
      </div>
    </div>
  );
}
