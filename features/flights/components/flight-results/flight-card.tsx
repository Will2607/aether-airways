import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/lib/utils";
import { formatTime, formatDuration, getCheapestFare } from "@/features/flights/utils/flight.utils";
import type { CabinClass, FlightResult } from "@/features/flights/types";
import { FareOption } from "./fare-option";

/* ── Tag badge helper ───────────────────────────────────────────────────── */

const TAG_STYLES: Record<string, { label: string; variant: "primary" | "gold" | "success" }> = {
  cheapest:   { label: "Cheapest",   variant: "success" },
  fastest:    { label: "Fastest",    variant: "primary" },
  best_value: { label: "Best value", variant: "gold"    },
};

/* ── Stop indicator ─────────────────────────────────────────────────────── */

function StopPip({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="h-px w-16 md:w-28 bg-neutral-700" aria-hidden="true" />
      <Typography variant="caption" color="muted">
        {count === 0 ? "Direct" : count === 1 ? "1 stop" : `${count} stops`}
      </Typography>
    </div>
  );
}

/* ── Segment row ────────────────────────────────────────────────────────── */

function SegmentRow({ flight }: { flight: FlightResult }) {
  const first = flight.legs[0];
  const last  = flight.legs[flight.legs.length - 1];

  return (
    <div className="flex items-center gap-4">
      {/* Departure */}
      <div className="text-right shrink-0">
        <Typography variant="heading-md" as="p" className="tabular-nums leading-none">
          {formatTime(first.departureAt)}
        </Typography>
        <Typography variant="caption" color="muted">{first.origin.code}</Typography>
      </div>

      {/* Duration + stops */}
      <div className="flex flex-col items-center flex-1 min-w-0">
        <Typography variant="caption" color="muted" className="mb-1">
          {formatDuration(flight.totalDurationMinutes)}
        </Typography>
        <StopPip count={flight.stopCount} />
      </div>

      {/* Arrival */}
      <div className="shrink-0">
        <Typography variant="heading-md" as="p" className="tabular-nums leading-none">
          {formatTime(last.arrivalAt)}
        </Typography>
        <Typography variant="caption" color="muted">{last.destination.code}</Typography>
      </div>
    </div>
  );
}

/* ── FlightCard ─────────────────────────────────────────────────────────── */

interface FlightCardProps {
  flight: FlightResult;
  cabinClass: CabinClass;
}

export function FlightCard({ flight, cabinClass }: FlightCardProps) {
  const first   = flight.legs[0];
  const fares   = flight.fares.filter(
    (f) => f.isAvailable && f.brand.cabinClass === cabinClass
  );
  const cheapest = getCheapestFare(flight.fares, cabinClass);

  if (fares.length === 0) return null;

  return (
    <article
      className="bg-card border border-neutral-800 rounded-2xl overflow-hidden"
      aria-label={`Flight ${first.flightNumber} — from $${cheapest?.price.amount ?? "—"}`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-neutral-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {flight.tags.map((tag) => {
              const s = TAG_STYLES[tag];
              return s ? (
                <Badge key={tag} variant={s.variant} size="sm">{s.label}</Badge>
              ) : null;
            })}
            {flight.tags.length === 0 && (
              <Typography variant="caption" color="muted">
                {first.flightNumber} · {first.aircraft.name}
              </Typography>
            )}
          </div>

          {/* Flight meta */}
          <div className="flex items-center gap-3">
            {flight.tags.length > 0 && (
              <Typography variant="caption" color="muted">
                {first.flightNumber} · {first.aircraft.name}
              </Typography>
            )}
            {flight.stopCount > 0 && (
              <Typography variant="caption" color="muted">
                via {flight.legs
                  .slice(0, -1)
                  .map((l) => l.destination.code)
                  .join(", ")}
              </Typography>
            )}
          </div>
        </div>

        {/* Segment timeline */}
        <div className="mt-3">
          <SegmentRow flight={flight} />
        </div>
      </div>

      {/* Fares */}
      <div
        className={cn(
          "p-4 grid gap-3",
          fares.length === 1 ? "grid-cols-1" :
          fares.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {fares.map((fare, i) => (
          <FareOption
            key={fare.id}
            fare={fare}
            recommended={i === 1 && fares.length >= 2}
          />
        ))}
      </div>
    </article>
  );
}
