import { cn } from "@/lib/utils";
import type { SectionPadding, SurfaceVariant } from "@/shared/types/ui";

/* ── Maps ───────────────────────────────────────────────────────────────── */

const backgroundClasses: Record<SurfaceVariant, string> = {
  surface:     "bg-surface",
  card:        "bg-card",
  elevated:    "bg-elevated",
  transparent: "bg-transparent",
};

const paddingClasses: Record<SectionPadding, string> = {
  none: "",
  sm:   "py-12 md:py-16",
  md:   "py-16 md:py-24",
  lg:   "py-24 md:py-32",
  xl:   "py-32 md:py-40",
};

/* ── Props ──────────────────────────────────────────────────────────────── */

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: SurfaceVariant;
  padding?: SectionPadding;
  as?: React.ElementType;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function Section({
  background = "surface",
  padding = "lg",
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

Section.displayName = "Section";
