import localFont from "next/font/local";

/**
 * وزیرمتن کامل (variable، وزن ۱۰۰ تا ۹۰۰).
 * این فایل کل مجموعه‌ی فونت است — همه‌ی نویسه‌های فارسی، عربی و لاتین
 * با یک فایل پوشش داده می‌شوند و هیچ متنی به فونت سیستمی برنمی‌گردد.
 */
export const vazirmatn = localFont({
  src: "../fonts/vazirmatn-variable-full.woff2",
  variable: "--font-vazirmatn",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["Tahoma", "system-ui", "sans-serif"],
});

/** فونت لاتین نمایشی برای وردمارک‌ها و اعداد لاتین. */
export const manrope = localFont({
  src: [
    {
      path: "../fonts/manrope-latin-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  weight: "200 800",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
