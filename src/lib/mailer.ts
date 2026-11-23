import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/constants";
import { escapeHtml } from "@/lib/telegram";
import { absoluteUrl } from "@/lib/utils";

type TransportEnv = {
  host?: string;
  port?: string;
  user?: string;
  pass?: string;
  from?: string;
  secure?: string;
};

function transportEnv(): TransportEnv {
  return {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM,
    secure: process.env.SMTP_SECURE,
  };
}

export function isMailerConfigured(): boolean {
  const env = transportEnv();
  return Boolean(env.host && env.user && env.pass);
}

function transporter() {
  const env = transportEnv();
  const port = Number(env.port ?? 587);
  const secure = env.secure === undefined ? port === 465 : env.secure === "true";
  return nodemailer.createTransport({
    host: env.host,
    port,
    secure,
    auth: { user: env.user, pass: env.pass },
  });
}

const EMAIL_BODY = (code: string, url: string) => `
<div style="font-family:Tahoma,Arial,sans-serif;direction:rtl;text-align:right;background:#f4eada;padding:28px;color:#3b2a1f">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0cbb0;border-radius:18px;padding:30px">
    <p style="font-size:15px;color:#6f4e37;font-weight:bold;margin:0 0 18px">ولتریکس استودیو</p>
    <h2 style="font-size:18px;color:#3b2a1f;margin:0 0 12px">تأیید حساب کاربری</h2>
    <p style="font-size:13px;line-height:2;color:#75634f;margin:0 0 16px">
      کد تأیید ۶ رقمی شما (۱۵ دقیقه اعتبار دارد):
    </p>
    <p dir="ltr" style="font-size:32px;font-weight:bold;letter-spacing:10px;color:#3b2a1f;background:#f4eada;border-radius:12px;padding:14px 0;margin:0 0 20px;text-align:center">${code}</p>
    <p style="font-size:12px;line-height:2;color:#8a7663;margin:0 0 20px">
      یا از لینک زیر استفاده کنید (۲۴ ساعت اعتبار دارد):
    </p>
    <p style="margin:0 0 26px;text-align:center">
      <a href="${url}" style="display:inline-block;background:#6f4e37;color:#fff6ec;font-size:14px;font-weight:bold;padding:12px 34px;border-radius:12px;text-decoration:none">
        تأیید با لینک
      </a>
    </p>
    <p style="font-size:11px;line-height:2;color:#8a7663;margin:0;border-top:1px solid #ede3d4;padding-top:16px">
      اگر شما این حساب را نساخته‌اید، این ایمیل را نادیده بگیرید.<br>
      ولتریکس استودیو — <span dir="ltr">${siteConfig.url.replace("https://", "")}</span>
    </p>
  </div>
</div>`;

export type SendResult = { sent: boolean; channel: "email" | "fallback" };

/**
 * کد تأیید ۶ رقمی (+ لینک پشتیبان) را فقط به ایمیل خود کاربر می‌فرستد.
 * اگر SMTP تنظیم نشده باشد، کد در لاگ سرور ثبت می‌شود و به هیچ مقصد دیگری
 * (از جمله تلگرام مدیر) ارسال نمی‌شود.
 */
export async function sendVerificationEmail(
  to: string,
  rawToken: string,
  code: string,
): Promise<SendResult> {
  const verifyUrl = absoluteUrl(`/api/auth/verify?token=${rawToken}`);

  if (isMailerConfigured()) {
    try {
      const env = transportEnv();
      await transporter().sendMail({
        from: env.from ?? env.user,
        to,
        subject: "کد تأیید حساب — ولتریکس استودیو",
        html: EMAIL_BODY(code, verifyUrl),
      });
      return { sent: true, channel: "email" };
    } catch (error) {
      console.error("[auth] SMTP send failed:", error);
    }
  }

  console.warn(
    `[auth] SMTP unavailable. Verification code for ${to}: ${code} | link: ${verifyUrl}`,
  );
  return { sent: false, channel: "fallback" };
}

export type LeadEmailData = {
  name: string;
  phone: string;
  email: string;
  brand: string;
  projectType: string;
  budget: string;
  message: string;
  submittedAt: string;
  campaign: boolean;
};

function leadRow(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #ede3d4;font-size:12px;color:#8a7663;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:10px 0 10px 14px;border-bottom:1px solid #ede3d4;font-size:13px;color:#3b2a1f;line-height:1.9">${value}</td>
  </tr>`;
}

const LEAD_EMAIL_BODY = (lead: LeadEmailData) => {
  const name = escapeHtml(lead.name);
  const email = `<span dir="ltr" style="unicode-bidi:embed">${escapeHtml(lead.email)}</span>`;
  const phone = `<span dir="ltr" style="unicode-bidi:embed">${escapeHtml(lead.phone)}</span>`;
  const message = escapeHtml(lead.message).replace(/\r?\n/g, "<br />");

  return `
<div style="font-family:Tahoma,Arial,sans-serif;direction:rtl;text-align:right;background:#f4eada;padding:28px;color:#3b2a1f">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e0cbb0;border-radius:18px;padding:30px">
    <p style="font-size:15px;color:#6f4e37;font-weight:bold;margin:0 0 18px">ولتریکس استودیو</p>
    <h2 style="font-size:18px;color:#3b2a1f;margin:0 0 8px">${
      lead.campaign ? "درخواست جشنواره ۱۵ میلیونی" : "درخواست پروژه‌ی جدید"
    }</h2>
    <p style="font-size:12px;color:#8a7663;margin:0 0 18px">${escapeHtml(
      lead.submittedAt,
    )}</p>

    <table style="width:100%;border-collapse:collapse">
      ${leadRow("نام", name)}
      ${leadRow("ایمیل", email)}
      ${leadRow("تلفن", phone)}
      ${leadRow("برند", escapeHtml(lead.brand) || "—")}
      ${leadRow("نوع پروژه", escapeHtml(lead.projectType))}
      ${leadRow("بودجه", escapeHtml(lead.budget))}
    </table>

    <h3 style="font-size:13px;color:#3b2a1f;margin:22px 0 8px">توضیحات</h3>
    <p style="font-size:13px;line-height:2;color:#75634f;margin:0;background:#f9f3ea;border:1px solid #ede3d4;border-radius:12px;padding:14px">${message}</p>

    <p style="font-size:11px;line-height:2;color:#8a7663;margin:22px 0 0;border-top:1px solid #ede3d4;padding-top:16px">
      این ایمیل از فرم ${
        lead.campaign ? "سفارش جشنواره" : "درخواست پروژه"
      } ولتریکس استودیو ارسال شده است. پاسخ مستقیم به همین ایمیل، به آدرس مشتری می‌رود.
    </p>
  </div>
</div>`;
};

export async function sendLeadEmail(lead: LeadEmailData): Promise<boolean> {
  if (!isMailerConfigured()) return false;

  try {
    const env = transportEnv();
    const subjectName = lead.name.replace(/[\r\n]+/g, " ").slice(0, 80);
    await transporter().sendMail({
      from: env.from ?? env.user,
      to: siteConfig.email,
      replyTo: lead.email,
      subject: `${
        lead.campaign ? "درخواست جشنواره ۱۵ میلیونی" : "درخواست پروژه‌ی جدید"
      } — ${subjectName}`,
      html: LEAD_EMAIL_BODY(lead),
      text: [
        lead.campaign ? "درخواست جشنواره ۱۵ میلیونی" : "درخواست پروژه‌ی جدید",
        `تاریخ: ${lead.submittedAt}`,
        `نام: ${lead.name}`,
        `ایمیل: ${lead.email}`,
        `تلفن: ${lead.phone}`,
        `برند: ${lead.brand || "—"}`,
        `نوع پروژه: ${lead.projectType}`,
        `بودجه: ${lead.budget}`,
        "",
        "توضیحات:",
        lead.message,
      ].join("\n"),
    });
    return true;
  } catch (error) {
    console.error("[contact] SMTP send failed:", error);
    return false;
  }
}
