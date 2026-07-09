import { forwardRef, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/shared/icons";

/* ── Variants ───────────────────────────────────────────────────────────── */

const selectVariants = cva(
  [
    "w-full appearance-none bg-elevated text-white",
    "border rounded-xl font-medium cursor-pointer",
    "transition-all duration-200 pr-10",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      state: {
        default: "border-neutral-700 hover:border-neutral-500 focus:border-aether-500 focus:ring-aether-500/30",
        error:   "border-red-500/70 focus:border-red-500 focus:ring-red-500/30",
        success: "border-green-500/70 focus:border-green-500 focus:ring-green-500/30",
      },
      size: {
        sm: "h-8  pl-3 text-xs",
        md: "h-10 pl-4 text-sm",
        lg: "h-12 pl-4 text-base",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  }
);

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      state,
      size,
      label,
      hint,
      error,
      options,
      placeholder,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const hintId  = `${id}-hint`;
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
          <select
            ref={ref}
            id={id}
            className={cn(selectVariants({ state: resolvedState, size }), className)}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              [error ? errorId : null, hint ? hintId : null]
                .filter(Boolean)
                .join(" ") || undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDownIcon
            className="absolute right-3 h-4 w-4 text-neutral-500 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-400">
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

Select.displayName = "Select";
