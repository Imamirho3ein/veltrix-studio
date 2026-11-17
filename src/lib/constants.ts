export const siteConfig = {
  name: "Veltrix Studio",
  nameFa: "ولتریکس استودیو",
  wordmark: "VELTRIX",
  tagline: "طراحی تجربه‌های دیجیتال برای برندهای آینده.",
  description:
    "ولتریکس استودیو؛ استودیو طراحی و توسعه وب‌سایت‌های مدرن، سریع و حرفه‌ای. طراحی اختصاصی، توسعه‌ی مقیاس‌پذیر، سئو و پشتیبانی واقعی.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://veltrixstudio.ir",
  email: "amirhosseinjadidiy@gmail.com",
  emailDisplay: "amirhosseinjadidiy@gmail.com",
  phone: "+989009199575",
  phoneDisplay: "۰۹۰۰۹۱۹۹۵۷۵",
  telegram: {
    channel: "https://t.me/VeeltrixStudio",
    channelHandle: "@VeeltrixStudio",
    bot: "https://t.me/VeeltrixStudi_bot",
    botHandle: "@VeeltrixStudi_bot",
  },
  instagram: "",
  instagramHandle: "",
  linkedin: "",
  github: "",
  workHours: "شنبه تا پنجشنبه، ۱۰:۰۰ تا ۲۰:۰۰",
  location: "تهران، ایران",
  founded: "۱۴۰۲",
  responseTime: "کمتر از ۲۴ ساعت کاری",
} as const;

export const navItems = [
  { title: "خانه", href: "/" },
  { title: "خدمات", href: "/services" },
  { title: "نمونه‌کارها", href: "/portfolio" },
  { title: "تعرفه‌ها", href: "/pricing" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس با ما", href: "/contact" },
] as const;

export const footerLinks = {
  studio: [
    { title: "درباره ما", href: "/about" },
    { title: "نمونه‌کارها", href: "/portfolio" },
    { title: "خدمات", href: "/services" },
    { title: "تعرفه‌ها", href: "/pricing" },
  ],
  resources: [
    { title: "فرایند همکاری", href: "/#process" },
    { title: "سؤالات متداول", href: "/#faq" },
    { title: "کانال تلگرام", href: siteConfig.telegram.channel, external: true },
    { title: "ربات تلگرام", href: siteConfig.telegram.bot, external: true },
  ],
  contact: [
    { title: "تماس با ما", href: "/contact" },
    { title: "ایمیل استودیو", href: `mailto:${siteConfig.email}`, external: true },
    { title: "تماس تلفنی", href: `tel:${siteConfig.phone}`, external: true },
    {
      title: "کانال تلگرام",
      href: siteConfig.telegram.channel,
      external: true,
    },
  ],
} as const;

export const projectTypes = [
  "طراحی سایت شرکتی",
  "فروشگاه اینترنتی",
  "سایت رستوران",
  "سایت پزشکی و کلینیک",
  "سایت مدرسه و آموزش",
  "Landing Page",
  "سایت شخصی",
  "سایت سازمانی",
  "سایر",
] as const;

export const budgetOptions = [
  "زیر ۵۰ میلیون تومان",
  "۵۰ تا ۸۰ میلیون تومان",
  "۸۰ تا ۱۲۰ میلیون تومان",
  "۱۲۰ تا ۲۰۰ میلیون تومان",
  "بالای ۲۰۰ میلیون تومان",
  "هنوز مشخص نیست",
] as const;

export const socialLinks = [
  { title: "تماس تلفنی", href: `tel:${siteConfig.phone}`, icon: "phone" },
  { title: "کانال تلگرام", href: siteConfig.telegram.channel, icon: "telegram" },
  { title: "ربات تلگرام", href: siteConfig.telegram.bot, icon: "bot" },
] as const;

export const siteKeywords = [
  "طراحی سایت",
  "طراحی وب سایت",
  "استودیو طراحی",
  "طراحی سایت اختصاصی",
  "توسعه وب",
  "طراحی فروشگاه اینترنتی",
  "طراحی UI UX",
  "موشن گرافیک وب",
  "سئو سایت",
  "ولتریکس استودیو",
  "Veltrix Studio",
];
