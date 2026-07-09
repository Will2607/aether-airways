import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ───────────────────────────────────────────────────────────── */

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap",
    "transition-all duration-200 select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-aether-500 text-white",
          "hover:bg-aether-600",
          "shadow-[0_0_0_0_rgba(26,75,245,0)] hover:shadow-[0_0_20px_rgba(26,75,245,0.4)]",
        ].join(" "),
        secondary: [
          "bg-elevated text-neutral-100 border border-neutral-700",
          "hover:bg-neutral-700 hover:border-neutral-500",
        ].join(" "),
        outline: [
          "border border-aether-500 text-aether-400 bg-transparent",
          "hover:bg-aether-500/10 hover:text-aether-300",
        ].join(" "),
        ghost: [
          "text-neutral-300 bg-transparent",
          "hover:text-white hover:bg-white/10",
        ].join(" "),
        destructive: [
          "bg-red-600 text-white",
          "hover:bg-red-700",
        ].join(" "),
      },
      size: {
        sm:   "h-8 px-3 text-xs rounded-lg",
        md:   "h-10 px-4 text-sm rounded-xl",
        lg:   "h-12 px-6 text-base rounded-xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

/* ── Props ──────────────────────────────────────────────────────────────── */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ variant, size }), className)}
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
        <>
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  )
);

Button.displayName = "Button";
