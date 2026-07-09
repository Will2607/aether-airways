"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { XIcon } from "@/shared/icons";

/* ── Variants ───────────────────────────────────────────────────────────── */

const chipVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full font-medium",
    "border transition-all duration-150 cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
    "disabled:opacity-40 disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      selected: {
        true:  "bg-aether-500 text-white border-transparent shadow-[0_0_12px_rgba(26,75,245,0.35)]",
        false: "bg-elevated text-neutral-400 border-neutral-700 hover:text-white hover:border-neutral-500 hover:bg-neutral-700/50",
      },
      size: {
        sm: "h-7  px-3   text-xs",
        md: "h-8  px-3.5 text-sm",
        lg: "h-10 px-4   text-sm",
      },
    },
    defaultVariants: {
      selected: false,
      size: "md",
    },
  }
);

/* ── Props ──────────────────────────────────────────────────────────────── */

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "onToggle">,
    Omit<VariantProps<typeof chipVariants>, "selected"> {
  selected?: boolean;
  onToggle?: (next: boolean) => void;
  removable?: boolean;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function Chip({
  className,
  selected = false,
  size,
  onToggle,
  removable = false,
  onRemove,
  children,
  disabled,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onToggle?.(!selected)}
      className={cn(chipVariants({ selected, size }), className)}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(e);
          }}
          className={cn(
            "rounded-full p-0.5 -mr-0.5 transition-colors",
            selected
              ? "hover:bg-white/20"
              : "hover:bg-neutral-600 text-neutral-500 hover:text-white"
          )}
        >
          <XIcon className="h-3 w-3" aria-hidden="true" />
        </button>
      )}
    </button>
  );
}

Chip.displayName = "Chip";
