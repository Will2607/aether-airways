import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ───────────────────────────────────────────────────────────── */

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium rounded-full shrink-0",
  {
    variants: {
      variant: {
        default:   "bg-neutral-800 text-neutral-300",
        primary:   "bg-aether-500/20 text-aether-300 ring-1 ring-inset ring-aether-500/30",
        secondary: "bg-neutral-700/60 text-neutral-300 ring-1 ring-inset ring-neutral-600/50",
        success:   "bg-green-500/20  text-green-300  ring-1 ring-inset ring-green-500/30",
        warning:   "bg-amber-500/20  text-amber-300  ring-1 ring-inset ring-amber-500/30",
        error:     "bg-red-500/20    text-red-300    ring-1 ring-inset ring-red-500/30",
        gold:      "bg-gold-500/20   text-gold-400   ring-1 ring-inset ring-gold-500/30",
      },
      size: {
        sm: "px-2    py-0.5 text-[10px] leading-4",
        md: "px-2.5  py-1   text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/* ── Props ──────────────────────────────────────────────────────────────── */

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

Badge.displayName = "Badge";
