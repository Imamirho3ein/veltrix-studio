export type ProcessStep = {
  number: string;
  latin: string;
  title: string;
  description: string;
  details: string[];
};

export const processSteps: ProcessStep[] = [
  {
    number: "۰۱",
    latin: "Discovery",
    title: "کشف و شناخت",
    description: "شناخت کسب‌وکار، مخاطب و هدف واقعی پروژه.",
    details: ["جلسه‌ی بریف", "تحلیل مخاطب و رقبا", "تعیین محدوده و اولویت‌ها"],
  },
  {
    number: "۰۲",
    latin: "Design",
    title: "طراحی تجربه",
    description: "ساخت مسیر کاربری و طراحی رابط اختصاصی.",
    details: ["وایرفریم و معماری", "طراحی UI و سیستم طراحی", "بازبینی و تأیید شما"],
  },
  {
    number: "۰۳",
    latin: "Development",
    title: "توسعه و پیاده‌سازی",
    description: "کدنویسی تمیز، تست و بهینه‌سازی کامل.",
    details: ["پیاده‌سازی فرانت‌اند", "اتصال به CMS و API", "تست دستگاه‌ها و مرورگرها"],
  },
  {
    number: "۰۴",
    latin: "Launch",
    title: "انتشار و رشد",
    description: "تحویل، آموزش و پشتیبانی بعد از انتشار.",
    details: ["استقرار و سئوی فنی", "آموزش تیم شما", "پشتیبانی و بهبود مستمر"],
  },
];
