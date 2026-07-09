import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ───────────────────────────────────────────────────────────── */

const cardVariants = cva(
  "rounded-2xl overflow-hidden",
  {
    variants: {
      variant: {
        default:     "bg-card",
        elevated:    "bg-card shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
        bordered:    "bg-card border border-neutral-800",
        interactive: [
          "bg-card border border-neutral-800",
          "hover:border-neutral-600 hover:-translate-y-0.5",
          "transition-all duration-200 cursor-pointer",
        ].join(" "),
        ghost:       "bg-transparent",
      },
      padding: {
        none: "",
        sm:   "p-4",
        md:   "p-6",
        lg:   "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "none",
    },
  }
);

/* ── Root ───────────────────────────────────────────────────────────────── */

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
);
CardRoot.displayName = "Card";

/* ── Sub-components ─────────────────────────────────────────────────────── */

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pt-6 pb-0 flex flex-col gap-1.5", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-6", className)} {...props} />
  )
);
CardBody.displayName = "CardBody";

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 pb-6 pt-0 flex items-center gap-3 border-t border-neutral-800 mt-0 pt-5",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-base font-semibold text-white leading-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-neutral-400 leading-relaxed", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

/* ── Compound export ────────────────────────────────────────────────────── */

export const Card = Object.assign(CardRoot, {
  Header:      CardHeader,
  Body:        CardBody,
  Footer:      CardFooter,
  Title:       CardTitle,
  Description: CardDescription,
});
