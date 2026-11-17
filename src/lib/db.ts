import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * ذخیره‌گاه ساده‌ی فایل‌محور برای کاربران و درخواست‌ها.
 *
 * روی هاست‌هایی مثل Runflare فایل‌سیستم کانتینر بین ری‌استارت‌ها پایدار است،
 * اما برای پایداری کامل بهتر است یک «دیسک» به سرویس وصل شود و مسیرش
 * با متغیر DATA_DIR به این ماژول معرفی شود.
 */

export type VerifyToken = {
  hash: string;
  expiresAt: number;
};

export type UserSession = {
  tokenHash: string;
  createdAt: number;
  expiresAt: number;
};

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  verified: boolean;
  verifyToken?: VerifyToken;
  verifyCode?: VerifyToken;
  sessions: UserSession[];
  createdAt: number;
};

export type LeadStatus = "new" | "in-review" | "done";

export type LeadRecord = {
  id: string;
  email: string;
  name: string;
  phone: string;
  brand: string;
  projectType: string;
  budget: string;
  message: string;
  userId?: string;
  status: LeadStatus;
  createdAt: number;
};

type Database = {
  users: UserRecord[];
  leads: LeadRecord[];
};

const EMPTY_DB: Database = { users: [], leads: [] };

let writeQueue: Promise<void> = Promise.resolve();

function dataDir(): string {
  return process.env.DATA_DIR ?? path.join(process.cwd(), ".data");
}

function dataFile(): string {
  return path.join(dataDir(), "store.json");
}

async function loadDb(): Promise<Database> {
  try {
    const raw = await fs.readFile(dataFile(), "utf8");
    const parsed = JSON.parse(raw) as Partial<Database>;
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      leads: Array.isArray(parsed.leads) ? parsed.leads : [],
    };
  } catch {
    return { ...EMPTY_DB };
  }
}

async function persist(db: Database): Promise<void> {
  await fs.mkdir(dataDir(), { recursive: true });
  const file = dataFile();
  const tmp = `${file}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, file);
}

/**
 * خواندن همیشه مستقیم از فایل انجام می‌شود — بدون کش درون‌حافظه‌ای.
 * Next.js صفحات و مسیرهای API را در ورکرهای جدا اجرا می‌کند؛ کش
 * درون‌حافظه‌ای بین آن‌ها همگام نمی‌ماند و باعث داده‌ی کهنه می‌شود.
 */
export async function readDb(): Promise<Database> {
  return loadDb();
}

/**
 * هر تغییر را در صف اجرا می‌کند تا نوشتن‌های همزمان روی هم سوار نشوند.
 * قبل از هر نوشتن، آخرین نسخه‌ی فایل خوانده می‌شود.
 */
function enqueueWrite(mutate: (db: Database) => void): Promise<Database> {
  const task = writeQueue.then(async () => {
    const db = await loadDb();
    mutate(db);
    await persist(db);
    return db;
  });
  writeQueue = task.then(
    () => undefined,
    () => undefined,
  );
  return task;
}

export async function mutateDb(
  mutate: (db: Database) => void,
): Promise<Database> {
  return enqueueWrite(mutate);
}

export function newUserRecord(
  email: string,
  passwordHash: string,
): UserRecord {
  return {
    id: randomUUID(),
    email,
    passwordHash,
    verified: false,
    sessions: [],
    createdAt: Date.now(),
  };
}

export function newLeadRecord(
  lead: Omit<LeadRecord, "id" | "status" | "createdAt">,
): LeadRecord {
  return {
    ...lead,
    id: randomUUID(),
    status: "new",
    createdAt: Date.now(),
  };
}
