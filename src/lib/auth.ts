import { cookies } from "next/headers";
import { createHash, randomBytes, randomInt } from "node:crypto";
import bcrypt from "bcryptjs";
import {
  mutateDb,
  readDb,
  newUserRecord,
  type UserRecord,
} from "@/lib/db";

export const SESSION_COOKIE = "vx_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // ۳۰ روز
const VERIFY_TTL_MS = 24 * 60 * 60 * 1000; // ۲۴ ساعت
const CODE_TTL_MS = 15 * 60 * 1000; // ۱۵ دقیقه
const MAX_SESSIONS_PER_USER = 5;

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function findUserByEmail(email: string): Promise<UserRecord | undefined> {
  return readDb().then((db) =>
    db.users.find((user) => user.email === normalizeEmail(email)),
  );
}

/* ------------------------- تایید ایمیل ------------------------- */

export async function issueVerifyToken(user: UserRecord): Promise<string> {
  const raw = randomBytes(24).toString("hex");
  const expiresAt = Date.now() + VERIFY_TTL_MS;
  await mutateDb((db) => {
    const record = db.users.find((item) => item.id === user.id);
    if (record) {
      record.verifyToken = { hash: sha256(raw), expiresAt };
    }
  });
  return raw;
}

export async function consumeVerifyToken(rawToken: string): Promise<boolean> {
  const hash = sha256(rawToken);
  let ok = false;
  await mutateDb((db) => {
    const user = db.users.find(
      (item) => item.verifyToken?.hash === hash && !item.verified,
    );
    if (!user) return;
    if ((user.verifyToken?.expiresAt ?? 0) < Date.now()) {
      user.verifyToken = undefined;
      return;
    }
    user.verified = true;
    user.verifyToken = undefined;
    ok = true;
  });
  return ok;
}

/* ------------------------- کد تأیید ۶ رقمی ------------------------- */

export async function issueVerifyCode(user: UserRecord): Promise<string> {
  const raw = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const expiresAt = Date.now() + CODE_TTL_MS;
  await mutateDb((db) => {
    const record = db.users.find((item) => item.id === user.id);
    if (record) {
      record.verifyCode = { hash: sha256(raw), expiresAt };
    }
  });
  return raw;
}

export async function consumeVerifyCode(
  email: string,
  rawCode: string,
): Promise<boolean> {
  const normalized = normalizeEmail(email);
  const hash = sha256(rawCode.trim());
  let ok = false;
  await mutateDb((db) => {
    const user = db.users.find((item) => item.email === normalized);
    if (!user || user.verified) return;
    if (!user.verifyCode || user.verifyCode.hash !== hash) return;
    if (user.verifyCode.expiresAt < Date.now()) {
      user.verifyCode = undefined;
      return;
    }
    user.verified = true;
    user.verifyCode = undefined;
    user.verifyToken = undefined;
    ok = true;
  });
  return ok;
}

/* ------------------------- جلسه‌ها ------------------------- */

export async function createSession(user: UserRecord): Promise<string> {
  const raw = randomBytes(24).toString("hex");
  const now = Date.now();
  await mutateDb((db) => {
    const record = db.users.find((item) => item.id === user.id);
    if (!record) return;
    record.sessions = [
      ...record.sessions.filter(
        (session) => session.expiresAt > now,
      ),
      { tokenHash: sha256(raw), createdAt: now, expiresAt: now + SESSION_TTL_MS },
    ].slice(-MAX_SESSIONS_PER_USER);
  });
  return raw;
}

export type SessionUser = {
  id: string;
  email: string;
  verified: boolean;
  createdAt: number;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  const hash = sha256(raw);
  const now = Date.now();
  const db = await readDb();
  for (const user of db.users) {
    const session = user.sessions.find((item) => item.tokenHash === hash);
    if (!session) continue;
    if (session.expiresAt <= now) return null;
    return {
      id: user.id,
      email: user.email,
      verified: user.verified,
      createdAt: user.createdAt,
    };
  }
  return null;
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return;
  const hash = sha256(raw);
  await mutateDb((db) => {
    for (const user of db.users) {
      user.sessions = user.sessions.filter(
        (session) => session.tokenHash !== hash,
      );
    }
  });
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  };
}

/* ------------------------- درخواست‌های کاربر ------------------------- */

export async function createUser(
  email: string,
  password: string,
): Promise<UserRecord> {
  const passwordHash = await hashPassword(password);
  const record = newUserRecord(normalizeEmail(email), passwordHash);
  await mutateDb((db) => {
    db.users.push(record);
  });
  return record;
}
