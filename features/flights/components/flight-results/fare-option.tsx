import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { CheckIcon, AlertCircleIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import type { Fare } from "@/features/flights/types";

interface FareOptionProps {
  fare: Fare;
  recommended?: boolean;
  className?: string;
}

export function FareOption({ fare, recommended = false, className }: FareOptionProps) {
  const { brand, price, seatsAvailable } = fare;
  const lowSeat = seatsAvailable <= 4;

  return (
    <article
      className={cn(
        "flex flex-col gap-3 p-4 rounded-xl border transition-colors duration-200",
        recommended
          ? "border-aether-500 bg-aether-500/5"
          : "border-neutral-800 bg-card hover:border-neutral-700",
        className
      )}
      aria-label={`${brand.name} fare — $${price.amount}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <Typography variant="label-lg" className="font-semibold text-white block">
            {brand.name}
          </Typography>
          {recommended && (
            <Badge variant="primary" size="sm" className="mt-1">
              Recommended
            </Badge>
          )}
        </div>
        {lowSeat && (
          <Badge variant="warning" size="sm" className="shrink-0">
            {seatsAvailable} left
          </Badge>
        )}
      </div>

      {/* Highlights */}
      <ul className="space-y-1" aria-label="Fare features">
        {brand.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <CheckIcon className="h-3.5 w-3.5 text-aether-400 mt-0.5 shrink-0" aria-hidden="true" />
            <Typography variant="caption" color="secondary">{h}</Typography>
          </li>
        ))}
      </ul>

      {/* Refund / change info */}
      <div className="flex gap-3 text-xs">
        <span
          className={cn(
            "flex items-center gap-1",
            brand.isChangeable ? "text-green-400" : "text-neutral-600"
          )}
        >
          {brand.isChangeable ? (
            <CheckIcon className="h-3 w-3" aria-hidden="true" />
          ) : (
            <AlertCircleIcon className="h-3 w-3" aria-hidden="true" />
          )}
          {brand.isChangeable ? "Free changes" : "No changes"}
        </span>
        <span
          className={cn(
            "flex items-center gap-1",
            brand.isRefundable ? "text-green-400" : "text-neutral-600"
          )}
        >
          {brand.isRefundable ? (
            <CheckIcon className="h-3 w-3" aria-hidden="true" />
          ) : (
            <AlertCircleIcon className="h-3 w-3" aria-hidden="true" />
          )}
          {brand.isRefundable ? "Refundable" : "No refund"}
        </span>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-neutral-800">
        <div>
          <Typography variant="mono-lg" color="accent-gold" className="block leading-none">
            ${price.amount.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="muted">per person</Typography>
        </div>
        <Button variant="outline" size="sm" aria-label={`Select ${brand.name} for $${price.amount}`}>
          Select
        </Button>
      </div>
    </article>
  );
}
