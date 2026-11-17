export const INTRO_KEY = "veltrix:intro-seen";
export const INTRO_EVENT = "veltrix:intro-done";

export function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroDone(): void {
  try {
    window.sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // Storage can be unavailable in private mode; the site still works.
  }
  window.dispatchEvent(new Event(INTRO_EVENT));
}
