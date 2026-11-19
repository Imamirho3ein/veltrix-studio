# ولتریکس استودیو — VELTRIX STUDIO

سایت رسمی استودیو: طراحی و توسعه‌ی وب‌سایت‌های سریع، دقیق و فارسی/RTL.

## استک

- **Next.js 16** (App Router، Turbopack) + **React 19**
- **TypeScript** + **Tailwind CSS 4**
- **Motion** برای انیمیشن‌ها
- **React Hook Form + Zod** برای فرم تماس و فرم‌های حساب کاربری
- **bcryptjs + nodemailer** برای ثبت‌نام، تأیید ایمیل و ورود
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
| `NEXT_PUBLIC_SITE_URL` | آدرس نهایی سایت (بدون اسلش انتهایی) — `https://veltrixstudio.ir` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | کد تأیید Google Search Console |
| `TELEGRAM_BOT_TOKEN` | توکن ربات از `@BotFather` |
| `TELEGRAM_CHAT_ID` | آیدی چت/کانال مقصد پیام‌های فرم تماس |
| `TELEGRAM_WEBHOOK_SECRET` | رشته‌ی تصادفی برای امنیت Webhook |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | سرور ایمیل برای تأیید حساب کاربری (نمونه‌ی Gmail در `.env.example`) |
| `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_FROM` | حساب فرستنده‌ی ایمیل |
| `DATA_DIR` | مسیر ذخیره‌ی فایل داده‌ها (کاربران/درخواست‌ها). روی Runflare مسیر دیسک متصل را بدهید |

اگر تلگرام تنظیم نشده باشد، فرم تماس همچنان پیام موفقیت نشان می‌دهد؛ درخواست در فایل داده‌ها ثبت و در پنل کاربر دیده می‌شود.

اگر SMTP تنظیم نشده باشد، لینک تأیید ثبت‌نام در لاگ سرور چاپ و در صورت تنظیم بودن تلگرام به آن هم ارسال می‌شود.

## حساب کاربری و پنل

- `/register` — ثبت‌نام با ایمیل + رمز عبور (bcrypt)، ارسال لینک تأیید به ایمیل
- `/login` — ورود؛ حساب تأییدنشده به‌طور خودکار لینک تازه می‌گیرد
- `/panel` — پنل اختصاصی کاربر: وضعیت تأیید ایمیل، فهرست درخواست‌های پروژه با وضعیت و تاریخ
- نشست با کوکی `vx_session` (httpOnly، ۳۰ روزه) نگه‌داری می‌شود
- داده‌ها در فایل JSON (`DATA_DIR`) نگه‌داری می‌شوند؛ برای هاست واقعی حتماً دیسک پایدار وصل کنید
- صفحات `/panel`، `/login`، `/register` از ایندکس گوگل و سایت‌مپ خارج‌اند (`noindex` + `robots.txt`)

### راه‌اندازی Webhook ربات

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -d "url=https://<domain>/api/telegram/webhook" \
  -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
```

## برند و تماس

- **دامنه:** `veltrixstudio.ir`
- **ایمیل:** `amirhosseinjadidiy@gmail.com`
- **تلفن:** `۰۹۰۰۹۱۹۹۵۷۵`
- **تلگرام:** کانال `@VeeltrixStudio` · ربات `@VeltrixStudio_bot`

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

### Runflare (پیشنهادی)

رانفلر به‌صورت بومی Next.js را اجرا می‌کند (پلتفرم Docker/Kubernetes):

1. در پنل رانفلر یک **پروژه** بسازید و داخل آن یک آیتم **NextJS** اضافه کنید.
2. اتصال به این ریپو (استقرار با GitHub) یا آپلود Drag & Drop.
3. متغیرهای محیطی را در بخش تنظیمات سرویس وارد کنید (`NEXT_PUBLIC_SITE_URL`، تلگرام، SMTP و…).
4. پورت سرویس روی `3000` است (توسط `next start` خوانده می‌شود)؛ نسخه Node را 20 یا بالاتر بگذارید.
5. برای ماندگاری حساب‌های کاربری، یک **دیسک** به سرویس وصل کنید و مسیر آن را در متغیر `DATA_DIR` بگذارید (مثلاً `/app/.data`).
6. دامنه‌ی `veltrixstudio.ir` را در بخش دامنه‌های سرویس متصل کنید و رکورد DNS را طبق راهنمای رانفلر تنظیم کنید.

راه دیگر: به‌جای آیتم NextJS، پروژه‌ی **Docker** بسازید — `Dockerfile` آماده است و برنامه روی پورت `3000` بالا می‌آید.

### بیلد و اجرای دستی

```bash
npm ci
npm run build
npm run start
```

مسیر `/api/og` به فونت‌های `src/fonts/og/*.ttf` و `public/brand/logo-192.png` نیاز دارد که در `outputFileTracingIncludes` فایل `next.config.ts` لحاظ شده است.

## سئو — چک‌لیست رتبه‌گیری

- دامنه‌ی نهایی را در `NEXT_PUBLIC_SITE_URL` ست کنید تا `sitemap.xml`، `robots.txt`، canonical و OG همه درست ساخته شوند.
- کد تأیید Google Search Console را در متغیر `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` بگذارید و `sitemap.xml` را در سرچ‌کانسول ثبت کنید.
- محتوای صفحات (تیترها، توضیحات، FAQ) را با کلیدواژه‌های واقعی کسب‌وکار گرم نگه دارید و نمونه‌کارها را به‌تدریج با پروژه‌های واقعی جایگزین کنید.
- بعد از انتشار، در `Google Business Profile` و دایرکتوری‌های ایرانی (نماتک و…) ثبت‌نام کنید؛ لینک‌های موثق سئوی محلی را قوی می‌کند.
- سرعت: بیلد پروژکت تمام صفحات استاتیک است + تصاویر بهینه Next Image.

## نکات محتوا (پیش از انتشار نهایی)

این موارد نمونه/جایگزین هستند و باید با اطلاعات واقعی جایگزین شوند:

- پروژه‌های نمونه‌کار (`src/data/portfolio.ts`) و نظرات مشتریان (`src/data/testimonials.ts`) فعلاً نمونه‌ی نمایشی‌اند
- اعداد آمار صفحه‌ی اصلی (`src/data/site.ts`) و قیمت‌ها (`src/data/pricing.ts`) باید با واقعیت هم‌راستا شوند
