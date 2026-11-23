import { z } from "zod";
import { campaign, campaignBudget } from "@/data/campaign";
import { budgetOptions, projectTypes } from "@/lib/constants";
import { isValidIranPhone } from "@/lib/utils";

const phoneSchema = z
  .string()
  .trim()
  .min(1, "شماره تماس را وارد کنید.")
  .refine((value) => isValidIranPhone(value), {
    message: "شماره تماس معتبر نیست. نمونه: ۰۹۱۲۳۴۵۶۷۸۹",
  });

const emailSchema = z
  .string()
  .trim()
  .min(1, "ایمیل را وارد کنید.")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "ایمیل معتبر نیست.");

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "نام و نام خانوادگی را کامل وارد کنید.")
    .max(80, "نام وارد شده بیش از حد طولانی است."),
  phone: phoneSchema,
  email: emailSchema,
  brand: z
    .string()
    .trim()
    .min(2, "نام برند یا کسب‌وکار را وارد کنید.")
    .max(100, "نام برند بیش از حد طولانی است."),
  projectType: z
    .string()
    .trim()
    .min(1, "نوع پروژه را انتخاب کنید.")
    .refine((value) => projectTypes.some((item) => item === value), {
      message: "نوع پروژه را انتخاب کنید.",
    }),
  budget: z
    .string()
    .trim()
    .min(1, "بازه‌ی بودجه را انتخاب کنید.")
    .refine(
      (value) =>
        (campaign.enabled && value === campaignBudget) ||
        budgetOptions.some((item) => item === value),
      {
        message: "بازه‌ی بودجه را انتخاب کنید.",
      },
    ),
  message: z
    .string()
    .trim()
    .min(10, "کمی بیشتر درباره‌ی پروژه بنویسید (حداقل ۱۰ کاراکتر).")
    .max(2000, "توضیحات بیش از حد طولانی است."),
  website: z.string().max(0).optional(),
  campaign: z.boolean().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function sanitizeText(input: string): string {
  return input.replace(/<[^>]*>/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
}
