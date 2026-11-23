"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Mail, Phone, Send, UserRound, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { EmailLink } from "@/components/ui/EmailLink";
import { campaign } from "@/data/campaign";
import { navItems, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  authenticated?: boolean;
};

export function MobileMenu({ open, onClose, authenticated = false }: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="بستن منو"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink/80 backdrop-blur-md"
          />
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="منوی ناوبری"
            className="absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col border-l border-white/10 bg-ink-2 px-6 pb-6 pt-5 shadow-[-30px_0_80px_-30px_rgba(0,0,0,0.9)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
          >
            <div className="flex items-center justify-between">
              <Logo size={48} loading="eager" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="بستن منو"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white transition hover:bg-white/[0.07]"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="ناوبری موبایل" className="mt-10 flex-1 overflow-y-auto">
              <ul className="flex flex-col">
                {navItems
                  .filter((item) => item.href !== "/campaign" || campaign.enabled)
                  .map((item, index) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 22 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.08 + index * 0.055,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex items-center justify-between border-b border-white/[0.06] py-4 text-xl font-semibold transition-colors",
                            active
                              ? "text-white"
                              : item.href === "/campaign"
                                ? "text-brand-700 hover:text-brand-800"
                                : "text-fog-300 hover:text-white",
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            {item.title}
                            {item.href === "/campaign" ? (
                              <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[0.55rem] font-medium tracking-wide text-brand-700">
                                {campaign.priceShort}
                              </span>
                            ) : null}
                          </span>
                          <span className="flex items-center gap-3">
                            <span className="font-latin text-[0.62rem] tracking-widest text-fog-600">
                              0{index + 1}
                            </span>
                            <ArrowLeft className="size-4 text-fog-500 transition-transform group-hover:-translate-x-1 group-hover:text-accent-400" />
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
              </ul>
            </nav>

            <div className="mt-8 space-y-4">
              <Link
                href={authenticated ? "/panel" : "/login"}
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-fog-500 transition hover:bg-white/[0.06] hover:text-white"
              >
                <UserRound className="size-4 text-brand" />
                {authenticated ? "پنل کاربری" : "ورود / ثبت‌نام"}
              </Link>
              <div className="flex flex-col gap-2 text-sm text-fog-400">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Phone className="size-4 text-brand" />
                  <span dir="ltr">{siteConfig.phoneDisplay}</span>
                </a>
                <EmailLink
                  ariaLabel="ارسال ایمیل به ولتریکس استودیو"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Mail className="size-4 text-brand" />
                  <span>ایمیل استودیو</span>
                </EmailLink>
                <a
                  href={siteConfig.telegram.channel}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Send className="size-4 text-accent-400" />
                  <span dir="ltr">{siteConfig.telegram.channelHandle}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
