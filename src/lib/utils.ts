import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toFa(value: string | number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

export function normalizePhone(value: string): string {
  return normalizeDigits(value).replace(/[\s\-()]/g, "").replace(/^\+?98/, "0");
}

export function isValidIranPhone(value: string): boolean {
  const phone = normalizePhone(value);
  return /^09\d{9}$/.test(phone) || /^0\d{10}$/.test(phone);
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
