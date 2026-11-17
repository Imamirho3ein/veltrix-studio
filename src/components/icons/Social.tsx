import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function PhoneIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6.6 3h2.9l1.4 4.3-2.1 1.6a12.5 12.5 0 0 0 6.3 6.3l1.6-2.1 4.3 1.4v2.9a2 2 0 0 1-2.2 2A17.9 17.9 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 22v-3.4a3.2 3.2 0 0 0-.9-2.5c3-.3 6.1-1.5 6.1-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.4 0C6.2 2.2 5.1 2.5 5.1 2.5a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 3.6 9.8c0 5 3 6.2 6 6.6a3.2 3.2 0 0 0-.9 2.4V22" />
      <path d="M9 19c-2.5.8-3.5-.4-4.2-1.6" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
      <path d="M7 10v7.5" />
      <circle cx="7" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11 17.5V10M11 13.2c0-2 1.3-3.2 3.1-3.2 1.8 0 2.9 1.1 2.9 3.3v4.2" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21.3 4.4 2.9 11.2c-.9.3-.9 1.5 0 1.8l4.6 1.5 1.7 5.2c.3.8 1.3.9 1.8.3l2.5-2.9 4.7 3.4c.7.5 1.6.1 1.8-.7l3-14.1c.2-.9-.7-1.7-1.7-1.3Z" />
      <path d="m7.5 14.5 9.9-6.6-7.2 7.6" />
    </svg>
  );
}
