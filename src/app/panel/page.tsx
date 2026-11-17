import Link from "next/link";
import { redirect } from "next/navigation";
import { BadgeCheck, CalendarDays, Inbox } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getSessionUser } from "@/lib/auth";
import { readDb } from "@/lib/db";
import { PanelClient } from "@/components/auth/PanelClient";
import type { PanelLead } from "@/components/auth/panel-types";
import { pageMetadata } from "@/lib/seo";
import { initials } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "پنل کاربری",
  description: "پنل اختصاصی کاربران ولتریکس استودیو.",
  path: "/panel",
  noIndex: true,
});

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "long",
  timeZone: "Asia/Tehran",
});

const leadDateFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Tehran",
});

export default async function PanelPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const db = await readDb();
  const leads = db.leads
    .filter(
      (lead) =>
        lead.email === user.email || (lead.userId && lead.userId === user.id),
    )
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 20)
    .map<PanelLead>((lead) => ({
      id: lead.id,
      projectType: lead.projectType,
      brand: lead.brand,
      budget: lead.budget,
      message: lead.message,
      status: lead.status,
      createdAtFa: leadDateFormatter.format(new Date(lead.createdAt)),
    }));

  return (
    <section className="relative overflow-hidden pb-20 pt-[calc(var(--header-height)+3.5rem)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="orb -top-44 left-[22%] size-[26rem] bg-brand/12" />
      </div>

      <Container>
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.07] pb-8">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-brand/25 to-brand-2/5 text-lg font-bold text-white">
              {initials(user.email.split("@")[0] ?? "کاربر") || "کاربر"}
            </span>
            <div>
              <h1 className="flex flex-wrap items-center gap-2 text-xl font-bold text-white">
                پنل کاربری
                {user.verified ? (
                  <BadgeCheck
                    className="size-5 text-emerald-700"
                    aria-label="ایمیل تأیید شده"
                  />
                ) : null}
              </h1>
              <p dir="ltr" className="mt-1 text-[0.76rem] text-fog-400">
                {user.email}
              </p>
            </div>
          </div>

          <dl className="flex gap-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-center">
              <dt className="flex items-center gap-1.5 text-[0.6rem] text-fog-500">
                <Inbox className="size-3" /> درخواست‌ها
              </dt>
              <dd className="mt-1 text-lg font-extrabold text-white">
                {leads.length.toLocaleString("fa-IR")}
              </dd>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-center">
              <dt className="flex items-center gap-1.5 text-[0.6rem] text-fog-500">
                <CalendarDays className="size-3" /> عضویت
              </dt>
              <dd className="mt-1 text-[0.7rem] text-fog-600">
                {dateFormatter.format(new Date(user.createdAt))}
              </dd>
            </div>
          </dl>
        </header>

        <div className="mt-9">
          <PanelClient
            email={user.email}
            verified={user.verified}
            leads={leads}
          />
        </div>

        <p className="mt-10 text-center text-[0.66rem] text-fog-600">
          این پنل مخصوص پیگیری درخواست‌های شماست.{" "}
          <Link href="/contact" className="text-fog-400 underline decoration-dotted underline-offset-4 hover:text-white">
            فرم درخواست پروژه
          </Link>
        </p>
      </Container>
    </section>
  );
}
