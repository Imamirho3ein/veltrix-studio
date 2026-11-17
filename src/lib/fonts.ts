import localFont from "next/font/local";

export const vazirmatnArabic = localFont({
  src: "../fonts/vazirmatn-arabic-wght-normal.woff2",
  variable: "--font-vazirmatn-arabic",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["Tahoma", "system-ui", "sans-serif"],
});

export const vazirmatnLatin = localFont({
  src: "../fonts/vazirmatn-latin-wght-normal.woff2",
  variable: "--font-vazirmatn-latin",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const manrope = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  style: "normal",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
