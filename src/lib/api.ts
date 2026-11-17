import { NextResponse } from "next/server";
import type { z } from "zod";

export function jsonOk<T extends Record<string, unknown>>(data: T, status = 200) {
  return NextResponse.json({ ok: true, ...data }, { status });
}

export function jsonError(
  message: string,
  status = 400,
  extra: Record<string, unknown> = {},
) {
  return NextResponse.json({ ok: false, message, ...extra }, { status });
}

export function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "اطلاعات ارسال‌شده معتبر نیست.";
}

export function fieldErrors(error: z.ZodError) {
  return error.flatten().fieldErrors;
}

export async function readJson(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
