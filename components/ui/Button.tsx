import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-background shadow-[0_0_24px_-4px_var(--color-gold-glow)] hover:bg-gold-light hover:shadow-[0_0_36px_-4px_var(--color-gold-glow)]",
  secondary:
    "border border-border bg-surface/40 text-foreground backdrop-blur-sm hover:border-gold/30 hover:bg-surface-elevated/60 hover:text-gold-light",
  ghost:
    "text-muted hover:bg-surface/80 hover:text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    if (isExternalHref(href)) {
      return (
        <a href={href} className={styles} {...linkProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
