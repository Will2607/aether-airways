import { cn } from "@/lib/utils";
import type { ContainerSize } from "@/shared/types/ui";

/* ── Size map ───────────────────────────────────────────────────────────── */

const sizeClasses: Record<ContainerSize, string> = {
  sm:   "max-w-2xl",
  md:   "max-w-4xl",
  lg:   "max-w-6xl",
  xl:   "max-w-7xl",
  "2xl":"max-w-screen-2xl",
  full: "max-w-none",
};

/* ── Props ──────────────────────────────────────────────────────────────── */

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function Container({
  size = "xl",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-6 md:px-12 lg:px-20",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Container.displayName = "Container";
