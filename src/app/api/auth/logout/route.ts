import { cookies } from "next/headers";
import { SESSION_COOKIE, destroySession, getSessionUser } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const user = await getSessionUser();
  if (!user) return jsonError("نشست فعالی وجود ندارد.", 401);

  await destroySession();
  const store = await cookies();
  store.set(SESSION_COOKIE, "", {
    ...{ path: "/", httpOnly: true, sameSite: "lax" },
    maxAge: 0,
  });

  return jsonOk({ message: "خارج شدید." });
}

export function GET() {
  return jsonError("روش درخواست پشتیبانی نمی‌شود.", 405);
}
