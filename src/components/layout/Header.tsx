"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, UserRound } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active && data) setAuthenticated(Boolean(data.authenticated));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80]">
        <div className="container-x">
          <div
            className={cn(
              "mt-3 flex items-center justify-between gap-4 rounded-2xl px-3.5 transition-all duration-500 sm:px-5",
              scrolled
                ? "h-16 border border-white/10 bg-ink-2/80 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                : "h-[4.6rem] border border-transparent bg-transparent",
            )}
          >
            <Link
              href="/"
              aria-label="ولتریکس استودیو — صفحه اصلی"
              className="rounded-xl"
            >
              <Logo size={50} loading="eager" />
            </Link>

            <nav aria-label="ناوبری اصلی" className="hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "inline-flex rounded-lg px-3.5 py-2 text-[0.84rem] transition-colors duration-300",
                        isActive(item.href)
                          ? "bg-white/[0.06] text-white"
                          : "text-fog-400 hover:bg-white/[0.035] hover:text-white",
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-2 xl:flex">
              {authenticated ? (
                <Link
                  href="/panel"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[0.8rem] text-fog-300 transition hover:bg-white/[0.05] hover:text-white"
                >
                  <UserRound className="size-4" />
                  پنل کاربری
                </Link>
              ) : null}
              <Button href="/contact" size="sm" arrow>
                شروع پروژه
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white transition hover:bg-white/[0.07] xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        authenticated={authenticated}
      />
    </>
  );
}
