export const dynamic = "force-static";

const SITE = "https://veltrixstudio.ir";

const html = `<!doctype html>
<html ⚡ lang="fa" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
    <title>ولتریکس استودیو | طراحی سایت اختصاصی و تجربه‌های دیجیتال</title>
    <meta name="description" content="ولتریکس استودیو؛ استودیو طراحی و توسعه وب‌سایت‌های مدرن، سریع و حرفه‌ای. طراحی اختصاصی، توسعه‌ی مقیاس‌پذیر، سئو و پشتیبانی واقعی." />
    <link rel="canonical" href="${SITE}/" />
    <link rel="amphtml" href="${SITE}/amp" />
    <meta name="robots" content="index, follow" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      :root{color-scheme:dark}
      body{margin:0;background:#121110;color:#f4ece2;font-family:Tahoma,Arial,sans-serif;line-height:1.9}
      .wrap{max-width:720px;margin:0 auto;padding:32px 20px 56px}
      header{border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:18px;margin-bottom:26px}
      .brand{font-size:18px;letter-spacing:.18em;color:#d4b996}
      h1{font-size:30px;line-height:1.4;margin:18px 0 14px}
      h2{font-size:20px;margin:30px 0 10px;color:#e8d7c0}
      p{font-size:15px;color:#c9c0b6;margin:0 0 14px}
      ul{padding:0 18px 0 0;margin:0 0 18px;color:#c9c0b6;font-size:15px}
      li{margin-bottom:8px}
      .cta{display:block;margin:26px 0 8px;background:#b08968;color:#211810;text-align:center;padding:14px 18px;border-radius:12px;text-decoration:none;font-weight:700}
      footer{border-top:1px solid rgba(255,255,255,.08);margin-top:36px;padding-top:18px;font-size:13px;color:#8f877e}
      a{color:#d4b996}
    </style>
  </head>
  <body>
    <div class="wrap">
      <header>
        <div class="brand">VELTRIX STUDIO</div>
        <div>استودیو طراحی و توسعه تجربه‌های دیجیتال</div>
      </header>
      <main>
        <h1>ایده‌ات را به یک تجربه دیجیتال تبدیل می‌کنیم.</h1>
        <p>برای برندهایی که می‌خواهند متفاوت دیده شوند، وب‌سایت‌های سریع و هدفمند می‌سازیم. طراحی خوب را با کدی تمیز و جزئیاتی که حس می‌شود همراه می‌کنیم.</p>
        <a class="cta" href="${SITE}/contact">شروع پروژه</a>

        <h2>خدمات ولتریکس استودیو</h2>
        <ul>
          <li>طراحی سایت اختصاصی بر اساس هویت برند</li>
          <li>توسعه‌ی سریع، امن و مقیاس‌پذیر</li>
          <li>طراحی فروشگاه اینترنتی و تجربه‌ی خرید</li>
          <li>سئوی تکنیکال، سرعت و پشتیبانی واقعی</li>
        </ul>

        <h2>چرا ولتریکس؟</h2>
        <p>یک فرایند روشن، تیم کوچک و وسواس واقعی داریم. نتیجه‌اش سایت‌هایی است که کار می‌کنند. کد، دامنه و هاست به نام شماست و مسیر همکاری از ابتدا شفاف است.</p>

        <h2>ارتباط با ما</h2>
        <p>برای شروع پروژه، فرم تماس سایت را پر کنید یا در تلگرام پیام بدهید. پاسخ‌گویی کمتر از ۲۴ ساعت کاری است.</p>
        <p><a href="${SITE}/portfolio">نمونه‌کارها</a> · <a href="${SITE}/pricing">تعرفه‌ها</a> · <a href="${SITE}/contact">تماس با ما</a></p>
      </main>
      <footer>
        <p>ولتریکس استودیو — تهران، ایران</p>
        <p><a href="${SITE}/">نسخه‌ی کامل سایت</a></p>
      </footer>
    </div>
  </body>
</html>`;

export function GET() {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
