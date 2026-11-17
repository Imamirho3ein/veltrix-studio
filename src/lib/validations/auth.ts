import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "ایمیل را وارد کنید.")
  .max(254, "ایمیل بیش از حد طولانی است.")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "ایمیل معتبر نیست.");

export const registerSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, "رمز عبور حداقل ۸ کاراکتر باشد.")
    .max(72, "رمز عبور بیش از حد طولانی است.")
    .regex(/[a-zA-Zآ-ی]/, "رمز عبور باید حداقل یک حرف داشته باشد.")
    .regex(/\d/, "رمز عبور باید حداقل یک عدد داشته باشد."),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "رمز عبور را وارد کنید.").max(72),
});

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
