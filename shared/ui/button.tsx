import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-aether-500 text-white",
    "hover:bg-aether-600",
    "shadow-[0_0_0_0_rgba(26,75,245,0)] hover:shadow-[0_0_20px_rgba(26,75,245,0.4)]",
    "transition-all duration-200",
  ].join(" "),
  secondary: [
    "bg-elevated text-neutral-100 border border-neutral-700",
    "hover:bg-neutral-700 hover:border-neutral-500",
    "transition-all duration-200",
  ].join(" "),
  ghost: [
    "text-neutral-300",
    "hover:text-white hover:bg-white/10",
    "transition-all duration-200",
  ].join(" "),
  destructive: [
    "bg-red-600 text-white",
    "hover:bg-red-700",
    "transition-all duration-200",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-base rounded-xl gap-2.5",
};

const baseClasses = [
  "inline-flex items-center justify-center",
  "font-medium whitespace-nowrap",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  "disabled:opacity-50 disabled:pointer-events-none",
  "select-none",
].join(" ");

/**
 * Generates button class names without rendering an element.
 * Use this to style <Link> components that look like buttons.
 */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
              aria-hidden="true"
            />
            <span>Loading…</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
