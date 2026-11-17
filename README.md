# ولتریکس استودیو — VELTRIX STUDIO

سایت رسمی استودیو: طراحی و توسعه‌ی وب‌سایت‌های سریع، دقیق و فارسی/RTL.

## استک

- **Next.js 16** (App Router، Turbopack) + **React 19**
- **TypeScript** + **Tailwind CSS 4**
- **Motion** برای انیمیشن‌ها
- **React Hook Form + Zod** برای فرم تماس
- تلگرام برای دریافت لید و ربات پاسخ‌گو

## اجرا

نیازمندی: Node.js 20 یا بالاتر.

```bash
npm install
cp .env.example .env.local   # مقادیر را پر کنید
npm run dev                  # http://localhost:3000
```

اسکریپت‌ها:

| دستور | کار |
| --- | --- |
| `npm run dev` | سرور توسعه |
| `npm run build` | بیلد پروডاکشن |
| `npm run start` | اجرای بیلد |
| `npm run lint` | بررسی ESLint |
| `npm run typecheck` | بررسی TypeScript |

## متغیرهای محیطی

| متغیر | توضیح |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | آدرس نهایی سایت (بدون اسلش انتهایی) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | کد تأیید Google Search Console |
| `TELEGRAM_BOT_TOKEN` | توکن ربات از `@BotFather` |
| `TELEGRAM_CHAT_ID` | آیدی چت/کانال مقصد پیام‌های فرم تماس |
| `TELEGRAM_WEBHOOK_SECRET` | رشته‌ی تصادفی برای امنیت Webhook |

اگر تلگرام تنظیم نشده باشد، فرم تماس همچنان پیام موفقیت نشان می‌دهد و لید را در لاگ سرور ثبت می‌کند (`delivered: false`).

### راه‌اندازی Webhook ربات

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -d "url=https://<domain>/api/telegram/webhook" \
  -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
```

## برند و تم

لوگو از فایل منبع (`public/brand/logo-source.jpg`) با پس‌زمینه‌ی شفاف استخراج شده است.

- نشان و سایزها: `public/brand/logo-{64,128,192,256,512}.png`
- فاوآیکون (file convention): `src/app/icon.png`، `src/app/apple-icon.png`
- اوپن‌گراف: `src/app/api/og/route.tsx` (لوگو و فونت‌های TTF داخل تصویر جاسازی می‌شوند)

پالت اصلی (در `src/app/globals.css`):

| توکن | مقدار | کاربرد |
| --- | --- | --- |
| `ink` | `#0d0d0d` | پس‌زمینه‌ی مشکی |
| `brand` | `#f0a24c` | کهربایی اصلی |
| `brand-2` | `#f7c98a` | کهربایی روشن |
| `accent` | `#e9c79b` | شنی امضا |
| `muted` / `fog-400` | `#adadad` | متن کم‌رنگ |

دکمه‌های اصلی «شیشه‌ی کهربایی»اند: گرادیان فلزی گرم (`#2c241d → #7a5832`) با لبه‌ی روشن بالا و هاله‌ی کهربایی (`#f0a24c`). متن‌های کم‌رنگ از مقیاس گرم `fog` می‌آیند تا هیچ خاکستری به سبز نزند. `rose` فقط برای خطاهای فرم و `brand-2` برای وضعیت موفقیت استفاده می‌شود.

بخش پایانی سایت (`close-band`) هم روی همین پالت است: پنل ادیتور فارسی، دست‌های مرمری پاورقی (`public/images/hands/`) و وردمارک بزرگ `VELTRIX` با رنگ `#5a3418`.

## صفحات

`/`، `/services`، `/portfolio`، `/portfolio/[slug]`، `/pricing`، `/about`، `/contact` و مسیرهای API:

- `POST /api/contact` — دریافت فرم پروژه
- `POST /api/newsletter` — ثبت ایمیل خبرنامه (در صورت تنظیم تلگرام، به همان چت ارسال می‌شود)
- `GET /api/og` — تولید تصویر Open Graph
- `POST /api/telegram/webhook` — ربات تلگرام

SEO: `sitemap.xml`، `robots.txt`، `manifest.webmanifest`، JSON-LD سازمان/وب‌سایت/FAQ و متادیتای Open Graph.

## دیپلوی

```bash
npm ci
npm run build
npm run start
```

روی Vercel یا هر هاست Node.js قابل اجراست. مسیر `/api/og` به فونت‌های `src/fonts/og/*.ttf` و `public/brand/logo-192.png` نیاز دارد که در `outputFileTracingIncludes` فایل `next.config.ts` لحاظ شده است.

## نکات محتوا (پیش از انتشار نهایی)

این موارد نمونه/جایگزین هستند و باید با اطلاعات واقعی جایگزین شوند:

- دامنه، ایمیل (`hello@veltrixstudio.com`)، هندل‌های شبکه‌های اجتماعی و کانال/ربات تلگرام
- نام اعضای تیم، نظرات مشتریان و اعداد/متریک‌های پروژه‌ها
- قیمت‌ها تقریبی‌اند و باید با تعرفه‌ی نهایی هم‌راستا شوند
