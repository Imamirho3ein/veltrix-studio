const TELEGRAM_API = "https://api.telegram.org";

export function isTelegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type SendOptions = {
  chatId?: string;
  parseMode?: "HTML" | "MarkdownV2";
  replyMarkup?: Record<string, unknown>;
};

type TelegramResponse = {
  ok: boolean;
  description?: string;
};

export async function sendTelegramMessage(
  text: string,
  { chatId = process.env.TELEGRAM_CHAT_ID, parseMode = "HTML", replyMarkup }: SendOptions = {},
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token || !chatId) return false;

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
        ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) return false;
    const data = (await response.json()) as TelegramResponse;
    return data.ok === true;
  } catch {
    return false;
  }
}

export async function telegramApi(
  method: string,
  payload: Record<string, unknown>,
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return false;

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  }
}
