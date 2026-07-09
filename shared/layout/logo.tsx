import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PlaneIcon } from "@/shared/icons";

/* ── Variants ───────────────────────────────────────────────────────────── */

const logoVariants = cva("flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500 rounded-lg", {
  variants: {
    size: {
      sm: "gap-1.5",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const iconSizes: Record<string, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

const textSizes: Record<string, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

/* ── Props ──────────────────────────────────────────────────────────────── */

export interface LogoProps extends VariantProps<typeof logoVariants> {
  href?: string;
  className?: string;
  /** Show only icon, no wordmark */
  iconOnly?: boolean;
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function Logo({ href = "/", size = "md", iconOnly = false, className }: LogoProps) {
  const content = (
    <>
      <PlaneIcon
        className={cn(iconSizes[size ?? "md"], "text-aether-500 shrink-0")}
        aria-hidden="true"
      />
      {!iconOnly && (
        <span className={cn("font-extrabold tracking-tight text-white", textSizes[size ?? "md"])}>
          Aether<span className="text-aether-400">Airways</span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(logoVariants({ size }), className)}
        aria-label="AetherAirways — back to home"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn(logoVariants({ size }), className)} aria-label="AetherAirways">
      {content}
    </div>
  );
}

Logo.displayName = "Logo";
