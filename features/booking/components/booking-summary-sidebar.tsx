import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { PlaneIcon } from "@/shared/icons";
import {
  formatShortDate,
  formatDuration,
} from "@/features/flights/utils/flight.utils";
import { computePriceSummary, formatCurrency } from "@/features/booking/utils/booking.utils";
import type { BookingSelection } from "@/features/booking/types";

interface BookingSummarySidebarProps {
  selection: BookingSelection;
}

const CABIN_LABELS: Record<string, string> = {
  economy:         "Economy",
  premium_economy: "Premium Economy",
  business:        "Business",
  first:           "First Class",
};

export function BookingSummarySidebar({ selection }: BookingSummarySidebarProps) {
  const { flight, fare, searchContext } = selection;
  const firstLeg = flight.legs[0]!;
  const lastLeg  = flight.legs[flight.legs.length - 1]!;
  const summary  = computePriceSummary(selection);

  return (
    <aside className="space-y-3" aria-label="Booking summary">
      <div className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-4">
        {/* Route */}
        <div>
          <Typography variant="label-lg" className="font-semibold text-white block mb-2">
            Your flight
          </Typography>

          <div className="flex items-center gap-2">
            <Typography variant="heading-md" className="tabular-nums">
              {firstLeg.origin.code}
            </Typography>
            <PlaneIcon className="h-3.5 w-3.5 text-aether-400 shrink-0" aria-hidden="true" />
            <Typography variant="heading-md" className="tabular-nums">
              {lastLeg.destination.code}
            </Typography>
          </div>

          <Typography variant="caption" color="muted" className="mt-1">
            {firstLeg.origin.city} → {lastLeg.destination.city}
          </Typography>
        </div>

        {/* Meta */}
        <div className="space-y-2 border-t border-neutral-800 pt-3">
          <div className="flex justify-between">
            <Typography variant="caption" color="muted">Date</Typography>
            <Typography variant="caption" color="secondary">
              {formatShortDate(searchContext.departureDate)}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="caption" color="muted">Duration</Typography>
            <Typography variant="caption" color="secondary">
              {formatDuration(flight.totalDurationMinutes)}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="caption" color="muted">Cabin</Typography>
            <Badge variant="secondary" size="sm">
              {CABIN_LABELS[searchContext.cabin] ?? searchContext.cabin}
            </Badge>
          </div>
          <div className="flex justify-between">
            <Typography variant="caption" color="muted">Fare</Typography>
            <Typography variant="caption" color="secondary">{fare.brand.name}</Typography>
          </div>
        </div>

        {/* Price */}
        <div className="border-t border-neutral-800 pt-3">
          <div className="flex justify-between items-baseline">
            <Typography variant="label-sm" className="text-white">Total</Typography>
            <Typography variant="heading-lg" color="accent-gold" className="tabular-nums">
              {formatCurrency(summary.grandTotal, summary.currency)}
            </Typography>
          </div>
          <Typography variant="caption" color="muted">
            {summary.totalPassengers} passenger{summary.totalPassengers > 1 ? "s" : ""} · taxes incl.
          </Typography>
        </div>
      </div>
    </aside>
  );
}
