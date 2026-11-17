import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { VerifyNotice } from "@/components/auth/VerifyNotice";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ورود به حساب کاربری",
  description: "ورود به پنل کاربری ولتریکس استودیو.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <AuthShell
      title="ورود به پنل کاربری"
      subtitle="با ایمیل و رمز عبور خود وارد شوید تا وضعیت درخواست‌هایتان را ببینید."
    >
      <Suspense fallback={null}>
        <VerifyNotice />
      </Suspense>
      <LoginForm />
    </AuthShell>
  );
}
