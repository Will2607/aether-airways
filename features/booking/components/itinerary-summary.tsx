import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import {
  CheckIcon, AlertCircleIcon, PlaneIcon,
  ClockIcon, ChevronLeftIcon,
} from "@/shared/icons";
import {
  formatTime,
  formatDuration,
  formatShortDate,
} from "@/features/flights/utils/flight.utils";
import type { BookingSelection } from "@/features/booking/types";
import { cn } from "@/lib/utils";

const CABIN_LABELS: Record<string, string> = {
  economy:         "Economy",
  premium_economy: "Premium Economy",
  business:        "Business",
  first:           "First Class",
};

/* ── Sub-components ─────────────────────────────────────────────────────── */

function BaggageRow({ icon, label, detail }: { icon: string; label: string; detail: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-base leading-none mt-0.5" aria-hidden="true">{icon}</span>
      <div>
        <Typography variant="label-sm" className="text-white block">{label}</Typography>
        <Typography variant="caption" color="muted">{detail}</Typography>
      </div>
    </div>
  );
}

function PolicyBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={cn("flex items-center gap-1.5 text-sm", ok ? "text-green-400" : "text-neutral-600")}>
      {ok
        ? <CheckIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        : <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      {label}
    </span>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */

interface ItinerarySummaryProps {
  selection: BookingSelection;
}

export function ItinerarySummary({ selection }: ItinerarySummaryProps) {
  const { flight, fare, searchContext } = selection;
  const firstLeg = flight.legs[0]!;
  const lastLeg  = flight.legs[flight.legs.length - 1]!;
  const { brand } = fare;

  // Layover durations between consecutive legs
  const layoverMinutes = flight.legs.slice(1).map((leg, i) => {
    const depMs = new Date(leg.departureAt).getTime();
    const arrMs = new Date(flight.legs[i]!.arrivalAt).getTime();
    return Math.round((depMs - arrMs) / 60_000);
  });

  return (
    <article className="space-y-4" aria-label="Flight itinerary details">

      {/* ── Route overview ─────────────────────────────────────────── */}
      <div className="bg-card border border-neutral-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <PlaneIcon className="h-4 w-4 text-aether-400 shrink-0" aria-hidden="true" />
          <Typography variant="caption" color="secondary">Outbound Flight</Typography>
        </div>

        <div className="flex items-end gap-4">
          <div>
            <Typography variant="heading-xl" as="h2" className="tabular-nums leading-none">
              {firstLeg.origin.code}
            </Typography>
            <Typography variant="caption" color="muted">{firstLeg.origin.city}</Typography>
          </div>

          <div className="flex-1 flex items-center gap-2 mb-2">
            <div className="flex-1 h-px bg-neutral-700" />
            <PlaneIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
            <div className="flex-1 h-px bg-neutral-700" />
          </div>

          <div className="text-right">
            <Typography variant="heading-xl" as="h2" className="tabular-nums leading-none">
              {lastLeg.destination.code}
            </Typography>
            <Typography variant="caption" color="muted">{lastLeg.destination.city}</Typography>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Typography variant="body-sm" color="secondary">
            {formatShortDate(searchContext.departureDate)}
          </Typography>
          <Badge variant="secondary" size="sm">
            {flight.stopCount === 0 ? "Direct" : `${flight.stopCount} stop${flight.stopCount > 1 ? "s" : ""}`}
          </Badge>
          <Typography variant="caption" color="muted">
            {formatDuration(flight.totalDurationMinutes)} total
          </Typography>
        </div>
      </div>

      {/* ── Leg timeline ───────────────────────────────────────────── */}
      <div className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-5">
        <Typography variant="label-lg" color="secondary">Flight details</Typography>

        {flight.legs.map((leg, i) => (
          <div key={leg.id}>
            {/* Layover connector */}
            {i > 0 && (
              <div className="flex items-center gap-2 my-4 py-2.5 px-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <ClockIcon className="h-3.5 w-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                <Typography variant="caption" className="text-amber-300">
                  Layover: {formatDuration(layoverMinutes[i - 1]!)} in {leg.origin.city} ({leg.origin.code})
                </Typography>
              </div>
            )}

            {/* Leg detail */}
            <div className="grid grid-cols-[1fr_52px_1fr] gap-2 items-center">
              <div>
                <Typography variant="heading-lg" as="p" className="tabular-nums leading-none">
                  {formatTime(leg.departureAt)}
                </Typography>
                <Typography variant="label-sm" className="text-white mt-0.5">{leg.origin.code}</Typography>
                <Typography variant="caption" color="muted" className="line-clamp-2">{leg.origin.name}</Typography>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Typography variant="caption" color="muted" className="text-center text-[10px]">
                  {formatDuration(leg.durationMinutes)}
                </Typography>
                <div className="flex items-center w-full justify-center">
                  <div className="h-px flex-1 bg-neutral-700" />
                  <PlaneIcon className="h-3 w-3 text-neutral-500 mx-0.5" aria-hidden="true" />
                  <div className="h-px flex-1 bg-neutral-700" />
                </div>
                <Typography variant="caption" color="muted" className="text-center text-[10px]">
                  {leg.flightNumber}
                </Typography>
              </div>

              <div className="text-right">
                <Typography variant="heading-lg" as="p" className="tabular-nums leading-none">
                  {formatTime(leg.arrivalAt)}
                </Typography>
                <Typography variant="label-sm" className="text-white mt-0.5">{leg.destination.code}</Typography>
                <Typography variant="caption" color="muted" className="line-clamp-2">{leg.destination.name}</Typography>
              </div>
            </div>

            <Typography variant="caption" color="muted" className="mt-2">
              {leg.aircraft.name}
              {leg.isCodeshare && leg.operatingCarrier
                ? ` · Operated by ${leg.operatingCarrier}`
                : ""}
            </Typography>
          </div>
        ))}
      </div>

      {/* ── Fare brand ─────────────────────────────────────────────── */}
      <div className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Typography variant="label-lg" className="text-white font-semibold">{brand.name}</Typography>
            <Typography variant="caption" color="muted">{CABIN_LABELS[brand.cabinClass] ?? brand.cabinClass}</Typography>
          </div>
          <Badge variant="primary" size="sm">{CABIN_LABELS[brand.cabinClass] ?? brand.cabinClass}</Badge>
        </div>

        <ul className="space-y-1.5" aria-label="Fare inclusions">
          {brand.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <CheckIcon className="h-3.5 w-3.5 text-aether-400 mt-0.5 shrink-0" aria-hidden="true" />
              <Typography variant="body-sm" color="secondary">{h}</Typography>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800">
          <BaggageRow
            icon="🎒" label="Carry-on"
            detail={brand.baggage.carryOn
              ? `${brand.baggage.carryOn.count} × ${brand.baggage.carryOn.weightKg} kg`
              : "Not included"}
          />
          <BaggageRow
            icon="🧳" label="Checked bag"
            detail={brand.baggage.checked
              ? `${brand.baggage.checked.count} × ${brand.baggage.checked.weightKg} kg`
              : "Not included"}
          />
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-800">
          <PolicyBadge ok={brand.isChangeable} label={brand.isChangeable ? "Changes allowed" : "No changes"} />
          <PolicyBadge ok={brand.isRefundable} label={brand.isRefundable ? "Refundable" : "Non-refundable"} />
        </div>
      </div>

      {/* Back link */}
      <Link
        href="/flights/search"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500 rounded"
      >
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        Back to results
      </Link>
    </article>
  );
}
