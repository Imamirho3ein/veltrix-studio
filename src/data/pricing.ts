import {
  Building2,
  GraduationCap,
  Landmark,
  PlayCircle,
  ShoppingBag,
  Stethoscope,
  UserRound,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PricingPlan = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  templateRange: string | null;
  customPrice: string;
  customLabel: string;
  popular?: boolean;
  note?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    slug: "ecommerce",
    title: "طراحی سایت فروشگاهی",
    description: "کاتالوگ، سبد خرید، درگاه پرداخت و پنل مدیریت سفارش‌ها.",
    icon: ShoppingBag,
    templateRange: "۴۲ تا ۵۵ میلیون تومان",
    customPrice: "۹۰ میلیون تومان به بالا",
    customLabel: "طرح اختصاصی",
    popular: true,
  },
  {
    slug: "corporate",
    title: "طراحی سایت شرکتی",
    description: "معرفی شرکت، خدمات، پروژه‌ها و فرم ارتباط با مخاطب.",
    icon: Building2,
    templateRange: "۳۰ تا ۴۰ میلیون تومان",
    customPrice: "۷۵ میلیون تومان به بالا",
    customLabel: "طرح اختصاصی",
  },
  {
    slug: "restaurant",
    title: "طراحی سایت رستوران",
    description: "منو، سفارش آنلاین، رزرو میز و معرفی فضای رستوران.",
    icon: UtensilsCrossed,
    templateRange: "۴۸ تا ۶۰ میلیون تومان",
    customPrice: "۹۵ میلیون تومان به بالا",
    customLabel: "طرح اختصاصی",
  },
  {
    slug: "medical",
    title: "طراحی سایت پزشکی و کلینیک",
    description: "معرفی پزشکان، خدمات درمانی، نوبت‌دهی و مقالات سلامت.",
    icon: Stethoscope,
    templateRange: "۵۵ تا ۷۰ میلیون تومان",
    customPrice: "۱۱۵ میلیون تومان به بالا",
    customLabel: "طرح اختصاصی",
  },
  {
    slug: "school",
    title: "طراحی سایت مدرسه‌ای",
    description: "معرفی مدرسه، اخبار، اساتید، ثبت‌نام و پنل آموزشی.",
    icon: GraduationCap,
    templateRange: "۴۰ تا ۵۵ میلیون تومان",
    customPrice: "۸۵ میلیون تومان به بالا",
    customLabel: "طرح اختصاصی",
  },
  {
    slug: "service",
    title: "طراحی سایت خدماتی",
    description: "معرفی خدمات، نمونه‌کار، تعرفه و دریافت درخواست آنلاین.",
    icon: Wrench,
    templateRange: "۳۸ تا ۵۰ میلیون تومان",
    customPrice: "۷۵ میلیون تومان به بالا",
    customLabel: "طرح اختصاصی",
  },
  {
    slug: "online-course",
    title: "سایت اختصاصی فروش دوره",
    description: "فروش دوره‌ی آموزشی، پخش ویدیو، پرداخت و پنل دانشجو.",
    icon: PlayCircle,
    templateRange: null,
    customPrice: "۷۵ میلیون تومان",
    customLabel: "شروع از",
    note: "طراحی اختصاصی پلتفرم آموزشی",
  },
  {
    slug: "personal",
    title: "سایت شخصی اختصاصی",
    description: "پورتفولیو، رزومه، وبلاگ و هویت شخصی برای متخصص‌ها.",
    icon: UserRound,
    templateRange: null,
    customPrice: "۴۷ میلیون تومان",
    customLabel: "شروع از",
    note: "طراحی اختصاصی، بدون قالب آماده",
  },
  {
    slug: "enterprise",
    title: "سایت سازمانی / پیشرفته",
    description: "چندزبانه، سیستم عضویت، داشبورد اختصاصی و یکپارچه‌سازی.",
    icon: Landmark,
    templateRange: null,
    customPrice: "۱۶۵ میلیون تومان",
    customLabel: "شروع از",
    note: "پروژه‌های بزرگ و سازمانی",
  },
];
