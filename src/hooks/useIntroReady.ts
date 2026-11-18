"use client";

/**
 * The intro overlay was removed to keep the page light for crawlers.
 * Hero animations now start as soon as React hydrates.
 */
export function useIntroReady(): boolean {
  return true;
}
