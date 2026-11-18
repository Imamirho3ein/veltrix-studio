/**
 * Pure-CSS reading progress bar. The animation is driven by the scroll
 * timeline (no JavaScript, no client component, no hydration cost).
 * In browsers without scroll-driven animation support it simply stays hidden.
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress fixed inset-x-0 top-0 z-[65] h-[3px] origin-right bg-[linear-gradient(90deg,#b08968,#d4b996,#ede3d4)] shadow-[0_0_14px_rgba(176,137,104,0.55)]"
    />
  );
}
