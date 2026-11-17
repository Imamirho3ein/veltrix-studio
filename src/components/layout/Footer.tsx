import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { LocalTime } from "@/components/LocalTime";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
} from "@/components/icons/Social";
import { footerLinks, siteConfig } from "@/lib/constants";

const socials = [
  { title: "اینستاگرام", href: siteConfig.instagram, Icon: InstagramIcon },
  { title: "تلگرام", href: siteConfig.telegram.channel, Icon: TelegramIcon },
  { title: "لینکدین", href: siteConfig.linkedin, Icon: LinkedinIcon },
  { title: "گیت‌هاب", href: siteConfig.github, Icon: GithubIcon },
];

type FooterLink = { title: string; href: string; external?: boolean };

function LinkColumn({
  title,
  items,
}: {
  title: string;
  items: readonly FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-[0.76rem] font-medium text-fog-500">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[0.82rem] text-fog-400 transition duration-300 hover:-translate-x-0.5 hover:text-white"
              >
                {item.title}
              </a>
            ) : (
              <Link
                href={item.href}
                className="inline-block text-[0.82rem] text-fog-400 transition duration-300 hover:-translate-x-0.5 hover:text-white"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="close-band relative overflow-hidden border-t border-white/[0.06]">
      <div className="container-x relative pt-14 md:pt-20">
        <div className="grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-12">
          <FadeUp className="sm:col-span-2 lg:col-span-4" y={18}>
            <Link
              href="/"
              aria-label="ولتریکس استودیو — صفحه اصلی"
              className="inline-flex items-center gap-2.5 rounded-xl"
            >
              <Logo size={40} />
              <span className="text-lg font-semibold tracking-tight text-white">
                ولتریکس <span className="font-normal text-fog-400">استودیو</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-[0.84rem] leading-7 text-fog-500">
              ولتریکس استودیو؛ از ایده تا اجرا، وب‌سایت‌هایی می‌سازیم که برند شما
              را جدی می‌گیرند.
            </p>

            <ul className="mt-5 flex items-center gap-1.5">
              {socials.map(({ title, href, Icon }) => (
                <li key={title}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={title}
                    className="inline-flex size-9 items-center justify-center rounded-full text-[#e0a165] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/10 hover:text-brand-200"
                  >
                    <Icon className="size-[1.05rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp className="sm:col-span-2 lg:col-span-5" delay={0.08} y={18}>
            <nav
              aria-label="پیوندهای پاورقی"
              className="grid grid-cols-3 gap-x-4 gap-y-8"
            >
              <LinkColumn title="استودیو" items={footerLinks.studio} />
              <LinkColumn title="منابع" items={footerLinks.resources} />
              <LinkColumn title="ارتباط" items={footerLinks.contact} />
            </nav>
          </FadeUp>

          <FadeUp
            className="sm:col-span-2 lg:col-span-3"
            delay={0.16}
            y={18}
          >
            <div id="newsletter" className="scroll-mt-28">
              <h3 className="text-[0.82rem] font-medium text-fog-300">
                عضویت در خبرنامه
              </h3>
              <NewsletterForm />
            </div>
          </FadeUp>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] py-5 text-[0.72rem] text-fog-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Mail className="size-3.5 text-brand" />
              <span dir="ltr">{siteConfig.emailDisplay}</span>
            </a>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand" />
              <LocalTime />
              <span>به وقت تهران</span>
            </span>
          </div>

          <a
            href="#top"
            className="inline-flex items-center gap-1.5 transition hover:text-white"
          >
            بازگشت به بالا
            <ArrowUpLeft className="size-3.5" />
          </a>
        </div>

        <div className="relative mt-8 h-[clamp(15rem,30vw,27rem)] sm:mt-10">
          <Image
            src="/images/hands/hand-left.png"
            alt=""
            aria-hidden="true"
            width={582}
            height={290}
            sizes="(max-width: 640px) 34vw, 30rem"
            className="foot-hands foot-hands-left"
          />
          <Image
            src="/images/hands/hand-right.png"
            alt=""
            aria-hidden="true"
            width={558}
            height={328}
            sizes="(max-width: 640px) 34vw, 30rem"
            className="foot-hands foot-hands-right"
          />

          <p className="absolute inset-x-0 bottom-[clamp(7.5rem,14.5vw,13rem)] z-[3] mx-auto flex w-max max-w-[88%] flex-wrap items-center justify-center gap-x-[0.5em] gap-y-1 text-center text-[clamp(0.62rem,1.05vw,0.8rem)] leading-6 text-fog-400">
            <span>©۲۰۲۶</span>
            <span aria-hidden="true" className="text-brand/55">
              /
            </span>
            <span className="font-medium text-white">ولتریکس استودیو</span>
            <span aria-hidden="true" className="text-brand/55">
              /
            </span>
            <span>از ایده تا اجرا.</span>
          </p>

          <span
            aria-hidden="true"
            className="foot-wordmark absolute inset-x-[calc(-1*clamp(1.25rem,4vw,2rem))] bottom-[calc(-1*clamp(1.2rem,7.8vw,7.5rem))] z-[1] select-none whitespace-nowrap text-center font-latin text-[clamp(3.4rem,21vw,19rem)] font-extralight leading-none tracking-[-0.035em]"
          >
            VELTRIX
          </span>
        </div>
      </div>
    </footer>
  );
}
