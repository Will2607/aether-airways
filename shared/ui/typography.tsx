import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ───────────────────────────────────────────────────────────── */

const typographyVariants = cva("", {
  variants: {
    variant: {
      "display-2xl": "text-[4.5rem] font-extrabold leading-[1.05] tracking-tight",
      "display-xl":  "text-[3.5rem] font-bold   leading-[1.1]  tracking-tight",
      "display-lg":  "text-[2.5rem] font-bold   leading-[1.15] tracking-tight",
      "heading-xl":  "text-[2rem]   font-semibold leading-[1.2]",
      "heading-lg":  "text-2xl      font-semibold leading-[1.3]",
      "heading-md":  "text-xl       font-semibold leading-[1.35]",
      "heading-sm":  "text-lg       font-semibold leading-[1.4]",
      "body-lg":     "text-lg  font-normal leading-relaxed",
      "body":        "text-base font-normal leading-relaxed",
      "body-sm":     "text-sm  font-normal leading-[1.5]",
      "label-lg":    "text-sm  font-medium leading-[1.2]",
      "label-sm":    "text-xs  font-semibold uppercase tracking-wider",
      "caption":     "text-xs  font-normal leading-[1.4]",
      "mono-lg":     "text-lg  font-semibold font-mono tabular-nums",
      "mono-md":     "text-sm  font-normal  font-mono tabular-nums",
    },
    color: {
      primary:      "text-neutral-50",
      secondary:    "text-neutral-400",
      muted:        "text-neutral-600",
      "accent-blue":"text-aether-400",
      "accent-gold":"text-gold-500",
      success:      "text-green-400",
      error:        "text-red-400",
      warning:      "text-amber-400",
      inherit:      "text-inherit",
    },
  },
  defaultVariants: {
    variant: "body",
    color:   "primary",
  },
});

/* ── Default tag map ────────────────────────────────────────────────────── */

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;

const DEFAULT_TAG: Record<TypographyVariant, React.ElementType> = {
  "display-2xl": "h1",
  "display-xl":  "h1",
  "display-lg":  "h2",
  "heading-xl":  "h2",
  "heading-lg":  "h3",
  "heading-md":  "h4",
  "heading-sm":  "h5",
  "body-lg":     "p",
  "body":        "p",
  "body-sm":     "p",
  "label-lg":    "span",
  "label-sm":    "span",
  "caption":     "span",
  "mono-lg":     "span",
  "mono-md":     "span",
};

/* ── Props ──────────────────────────────────────────────────────────────── */

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  /** Override the rendered HTML element. Defaults to semantic element per variant. */
  as?: React.ElementType;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function Typography({
  as,
  variant = "body",
  color,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component: React.ElementType = as ?? DEFAULT_TAG[variant as TypographyVariant] ?? "p";
  const resolvedColor = color ?? "primary";

  return (
    <Component
      className={cn(typographyVariants({ variant, color: resolvedColor }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

Typography.displayName = "Typography";
