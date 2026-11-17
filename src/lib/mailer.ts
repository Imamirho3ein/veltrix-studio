import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/constants";
import { sendTelegramMessage } from "@/lib/telegram";
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
 * کد تأیید ۶ رقمی (+ لینک پشتیبان) را می‌فرستد. اگر SMTP تنظیم نشده باشد،
 * کد و لینک در لاگ سرور و در صورت تنظیم، تلگرام استودیو ثبت می‌شود.
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
    `[auth] SMTP not configured. Verification code for ${to}: ${code} | link: ${verifyUrl}`,
  );
  await sendTelegramMessage(
    `🔐 <b>کد تأیید حساب</b>\n<b>ایمیل:</b> ${to}\n<b>کد:</b> <code>${code}</code>\n<a href="${verifyUrl}">تأیید با لینک</a>\n\n<i>SMTP تنظیم نشده؛ از مسیر جایگزین ارسال شد.</i>`,
  );
  return { sent: false, channel: "fallback" };
}
