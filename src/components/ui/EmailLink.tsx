"use client";

import type { ReactNode } from "react";

/**
 * Email link without exposing a plain-text address in the HTML source.
 * The address is assembled only when the visitor actually clicks.
 */
export function EmailLink({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const user = "amirhosseinjadidiy";
    const domain = "gmail.com";
    window.location.href = `mailto:${user}@${domain}`;
  }

  return (
    <a
      href="/contact"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
