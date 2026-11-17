import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ثبت‌نام در ولتریکس استودیو",
  description:
    "حساب کاربری بسازید تا درخواست‌های پروژه‌ی خود را در پنل اختصاصی دنبال کنید.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <AuthShell
      title="ساخت حساب کاربری"
      subtitle="بعد از ثبت‌نام، کد تأیید ۶ رقمی به ایمیل شما ارسال می‌شود."
    >
      <RegisterForm />
    </AuthShell>
  );
}
