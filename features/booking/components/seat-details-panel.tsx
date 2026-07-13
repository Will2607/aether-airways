import { cn } from "@/lib/utils";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { InfoIcon } from "@/shared/icons";
import type { Seat, SeatType } from "@/features/booking/types";
import { formatCurrency } from "@/features/booking/utils/booking.utils";

interface SeatDetailsPanelProps {
  seat: Seat | null;
}

const TYPE_LABELS: Record<SeatType, string>       = {
  standard:        "Standard",
  preferred:       "Preferred",
  "extra-legroom": "Extra Legroom",
  "exit-row":      "Exit Row",
};

const TYPE_DESCRIPTIONS: Record<SeatType, string> = {
  standard:        "Regular economy seat.",
  preferred:       "Located closer to the front for quicker boarding and deplaning.",
  "extra-legroom": "More legroom for added comfort on longer flights.",
  "exit-row":      "Extra legroom — requires able-bodied adult. Emergency duties may apply.",
};

const TYPE_BADGE: Record<SeatType, "default" | "primary" | "secondary" | "success" | "warning" | "error"> = {
  standard:        "secondary",
  preferred:       "primary",
  "extra-legroom": "success",
  "exit-row":      "warning",
};

export function SeatDetailsPanel({ seat }: SeatDetailsPanelProps) {
  if (!seat) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 bg-card border border-neutral-800 rounded-xl">
        <InfoIcon className="h-4 w-4 text-neutral-600 shrink-0" aria-hidden="true" />
        <Typography variant="caption" color="muted">
          Hover or focus a seat to see details.
        </Typography>
      </div>
    );
  }

  const positionParts: string[] = [];
  if (seat.isWindow) positionParts.push("Window");
  if (seat.isAisle)  positionParts.push("Aisle");
  if (!seat.isWindow && !seat.isAisle) positionParts.push("Middle");

  return (
    <div
      className={cn(
        "flex flex-col gap-2 px-4 py-3 bg-card border rounded-xl transition-all duration-150",
        seat.type === "exit-row" ? "border-amber-800/40" : "border-neutral-800"
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Typography variant="heading-md" className="tabular-nums font-bold">
            {seat.label}
          </Typography>
          <Badge variant={TYPE_BADGE[seat.type]} size="sm">
            {TYPE_LABELS[seat.type]}
          </Badge>
        </div>

        <Typography variant="label-lg" color="accent-gold" className="tabular-nums font-semibold">
          {seat.price.amount === 0 ? "Free" : `+${formatCurrency(seat.price.amount, seat.price.currency)}`}
        </Typography>
      </div>

      <div className="flex items-center gap-3">
        <Typography variant="caption" color="secondary">
          {positionParts.join(" · ")} seat
        </Typography>
        {seat.type === "exit-row" && (
          <Typography variant="caption" color="muted">· Exit row seat</Typography>
        )}
      </div>

      <Typography variant="caption" color="muted">
        {TYPE_DESCRIPTIONS[seat.type]}
      </Typography>
    </div>
  );
}
