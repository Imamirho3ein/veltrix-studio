"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  arrow?: boolean;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
  magnetic?: boolean;
  fullWidth?: boolean;
};

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type ActionButtonProps = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonProps = LinkButtonProps | ActionButtonProps;

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    arrow = false,
    icon,
    trailingIcon,
    magnetic = variant === "primary",
    fullWidth = false,
  } = props;

  const classes = cn(
    "btn group",
    variantClass[variant],
    size === "sm" && "btn-sm",
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {trailingIcon}
      {arrow ? (
        props.href !== undefined && props.external ? (
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : (
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
        )
      ) : null}
    </>
  );

  const element =
    props.href !== undefined ? (
      props.external ? (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={props.onClick}
        >
          {content}
        </a>
      ) : (
        <Link href={props.href} className={classes} onClick={props.onClick}>
          {content}
        </Link>
      )
    ) : (
      <button
        type={props.type ?? "button"}
        className={classes}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {content}
      </button>
    );

  if (!magnetic) return element;

  return (
    <MagneticButton className={fullWidth ? "w-full" : undefined}>
      {element}
    </MagneticButton>
  );
}
