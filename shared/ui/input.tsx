import { forwardRef, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ───────────────────────────────────────────────────────────── */

const inputVariants = cva(
  [
    "w-full bg-elevated text-white placeholder:text-neutral-600",
    "border rounded-xl font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed read-only:cursor-default",
  ].join(" "),
  {
    variants: {
      state: {
        default: "border-neutral-700 hover:border-neutral-500 focus:border-aether-500 focus:ring-aether-500/30",
        error:   "border-red-500/70 focus:border-red-500 focus:ring-red-500/30",
        success: "border-green-500/70 focus:border-green-500 focus:ring-green-500/30",
      },
      size: {
        sm: "h-8  px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  }
);

/* ── Props ──────────────────────────────────────────────────────────────── */

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      state,
      size,
      label,
      hint,
      error,
      leadingIcon,
      trailingIcon,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;

    const resolvedState = error ? "error" : state;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-semibold text-neutral-400 uppercase tracking-wider"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leadingIcon && (
            <span
              className="absolute left-3 text-neutral-500 pointer-events-none"
              aria-hidden="true"
            >
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              inputVariants({ state: resolvedState, size }),
              leadingIcon  && "pl-9",
              trailingIcon && "pr-9",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              [error ? errorId : null, hint ? hintId : null]
                .filter(Boolean)
                .join(" ") || undefined
            }
            {...props}
          />
          {trailingIcon && (
            <span
              className="absolute right-3 text-neutral-500 pointer-events-none"
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-400 flex items-center gap-1">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-xs text-neutral-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
