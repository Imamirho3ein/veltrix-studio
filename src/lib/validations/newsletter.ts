import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "ایمیل را وارد کنید.")
    .max(160, "ایمیل وارد شده بیش از حد طولانی است.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "ایمیل معتبر نیست."),
  website: z.string().max(0).optional(),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
