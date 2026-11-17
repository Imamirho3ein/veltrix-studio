import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
import { siteConfig } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TelegramUser = {
  id: number;
  first_name?: string;
  username?: string;
};

type TelegramMessage = {
  message_id: number;
  chat: { id: number; type: string };
  from?: TelegramUser;
  text?: string;
};

type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
};

const helpText = [
  "<b>سلام 👋</b>",
  "من ربات ولتریکس استودیو هستم.",
  "",
  "می‌توانید از این دستورها استفاده کنید:",
  "/start — شروع",
  "/services — خدمات",
  "/pricing — تعرفه‌ها",
  "/portfolio — نمونه‌کارها",
  "/contact — راه‌های تماس",
  "",
  `اگر سؤال دیگری دارید، به ${siteConfig.telegram.channelHandle} پیام بدهید.`,
].join("\n");

function keyboard() {
  return {
    inline_keyboard: [
      [
        { text: "وب‌سایت", url: siteConfig.url },
        { text: "کانال تلگرام", url: siteConfig.telegram.channel },
      ],
      [{ text: "شروع پروژه", url: `${siteConfig.url}/contact` }],
    ],
  };
}

function replyFor(text: string): string {
  const command = text.trim().split(/\s+/)[0]?.toLowerCase();

  switch (command) {
    case "/start":
      return [
        "<b>به ولتریکس استودیو خوش آمدید.</b>",
        "",
        "اینجا می‌توانید سریع‌تر به تعرفه‌ها، نمونه‌کارها و راه‌های تماس برسید.",
        "",
        "/services — خدمات",
        "/pricing — تعرفه‌ها",
        "/portfolio — نمونه‌کارها",
        "/contact — تماس",
      ].join("\n");
    case "/services":
      return [
        "<b>خدمات ولتریکس:</b>",
        "• طراحی سایت و رابط کاربری",
        "• توسعه‌ی وب با Next.js",
        "• فروشگاه اینترنتی",
        "• طراحی محصول و UX",
        "",
        `${siteConfig.url}/services`,
      ].join("\n");
    case "/pricing":
      return [
        "<b>تعرفه‌های پایه:</b>",
        "• سایت شرکتی: از ۳۰ میلیون (قالب) / ۷۵ میلیون (اختصاصی)",
        "• فروشگاهی: ۴۲ تا ۵۵ میلیون (قالب) / ۹۰ میلیون به بالا",
        "• شخصی: از ۴۷ میلیون",
        "• سازمانی: از ۱۶۵ میلیون",
        "",
        `جدول کامل: ${siteConfig.url}/pricing`,
      ].join("\n");
    case "/portfolio":
      return [
        "<b>نمونه‌کارها:</b>",
        "پروژه‌های فروشگاهی، فین‌تک، شرکتی، SaaS و آموزشی.",
        "",
        `${siteConfig.url}/portfolio`,
      ].join("\n");
    case "/contact":
      return [
        "<b>راه‌های تماس:</b>",
        `ایمیل: ${siteConfig.email}`,
        `ساعات کاری: ${siteConfig.workHours}`,
        "",
        `فرم پروژه: ${siteConfig.url}/contact`,
      ].join("\n");
    case "/help":
      return helpText;
    default:
      return [
        "پیام شما دریافت شد ✅",
        "",
        "برای بررسی سریع‌تر، فرم پروژه را پر کنید یا از دستورهای زیر استفاده کنید:",
        "",
        "/services — خدمات",
        "/pricing — تعرفه‌ها",
        "/portfolio — نمونه‌کارها",
        "/contact — تماس",
      ].join("\n");
  }
}

export async function POST(request: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret) {
    const header = request.headers.get("x-telegram-bot-api-secret-token");
    if (header !== secret) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
  }

  let update: TelegramUpdate;
  try {
    update = (await request.json()) as TelegramUpdate;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const message = update.message;
  if (!message?.text) {
    return NextResponse.json({ ok: true });
  }

  const text = message.text.slice(0, 1000);
  const reply = replyFor(text);

  const sent = await sendTelegramMessage(reply, {
    chatId: String(message.chat.id),
    replyMarkup: keyboard(),
  });

  if (!sent) {
    console.error("[telegram] failed to reply to chat", message.chat.id);
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({
    ok: true,
    bot: siteConfig.telegram.botHandle,
    message: "Webhook endpoint. Configure with setWebhook.",
  });
}
