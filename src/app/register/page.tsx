import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ثبت‌نام در ولتریکس استودیو",
  description:
    "پنل کاربری اختیاری است. اگر حساب بسازید، کد تأیید به ایمیل خودتان ارسال می‌شود و می‌توانید درخواست‌های پروژه را در پنل دنبال کنید.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <AuthShell
      title="ساخت حساب کاربری"
      subtitle="بعد از ثبت‌نام، کد تأیید ۶ رقمی فقط به ایمیل خودتان ارسال می‌شود."
    >
      <RegisterForm />
    </AuthShell>
  );
}
