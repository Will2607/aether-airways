import { cn } from "@/lib/utils";
import { Typography } from "@/shared/ui/typography";
import type { Testimonial } from "@/features/marketing/types";

/* ── Star rating (accessible, no external dependency) ───────────────────── */

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      role="img"
      aria-label={`Rating: ${rating} out of ${max} stars`}
      className="flex gap-0.5"
    >
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-gold-400 stroke-gold-400" : "fill-transparent stroke-neutral-700"
          )}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

/* ── Card ───────────────────────────────────────────────────────────────── */

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { name, location, tripType, rating, quote, avatarInitials, avatarBg } = testimonial;

  return (
    <figure
      className={cn(
        "flex flex-col gap-5 p-6 rounded-2xl bg-elevated border border-neutral-800",
        className
      )}
    >
      {/* Stars */}
      <StarRating rating={rating} />

      {/* Quote */}
      <blockquote className="flex-1">
        <Typography variant="body-sm" color="secondary" className="leading-relaxed">
          &ldquo;{quote}&rdquo;
        </Typography>
      </blockquote>

      {/* Author */}
      <figcaption className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
            avatarBg
          )}
          aria-hidden="true"
        >
          {avatarInitials}
        </div>
        <div className="min-w-0">
          <Typography variant="label-lg" className="font-semibold text-white block truncate">
            {name}
          </Typography>
          <Typography variant="caption" color="muted" className="block truncate">
            {location} · {tripType}
          </Typography>
        </div>
      </figcaption>
    </figure>
  );
}
