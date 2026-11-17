import { getSessionUser } from "@/lib/auth";
import { jsonOk } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return jsonOk({ authenticated: false });
  return jsonOk({
    authenticated: true,
    email: user.email,
    verified: user.verified,
  });
}
