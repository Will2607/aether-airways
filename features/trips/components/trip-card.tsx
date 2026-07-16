import Link from "next/link";
import { PlaneIcon, UsersIcon, ArrowRightIcon } from "@/shared/icons";
import { formatCurrency } from "@/features/booking/utils/booking.utils";
import { TripStatusBadge } from "@/features/trips/components/trip-status-badge";
import { deriveTripDisplayStatus, formatTripDate, totalPassengers } from "@/features/trips/utils/trip.utils";
import type { StoredBooking } from "@/features/trips/types";

interface TripCardProps {
  booking: StoredBooking;
}

export function TripCard({ booking }: TripCardProps) {
  const legs        = booking.selection.flight.legs;
  const firstLeg    = legs[0]!;
  const lastLeg     = legs[legs.length - 1]!;
  const status      = deriveTripDisplayStatus(booking);
  const paxCount    = totalPassengers(booking);
  const fareLabel   = booking.selection.fare.brand.name;
  const cabinLabel  = booking.selection.searchContext.cabin.replace(/_/g, " ");
  const depDate     = formatTripDate(booking.selection.searchContext.departureDate);
  const stops       = legs.length - 1;
  const stopsLabel  = stops === 0 ? "Direct" : stops === 1 ? "1 stop" : `${stops} stops`;

  return (
    <article
      className="rounded-2xl border border-neutral-800 bg-card p-5 transition-colors
                 hover:border-neutral-700 focus-within:ring-2 focus-within:ring-aether-500"
    >
      {/* Header row: route + status */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl font-bold tabular-nums text-white">
            {firstLeg.origin.code}
          </span>
          <PlaneIcon className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
          <span className="text-xl font-bold tabular-nums text-white">
            {lastLeg.destination.code}
          </span>
        </div>
        <TripStatusBadge status={status} className="shrink-0" />
      </div>

      {/* Details */}
      <dl className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-neutral-500">Date</dt>
          <dd className="text-neutral-300">{depDate}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-500">Route</dt>
          <dd className="text-neutral-300">{stopsLabel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-500">Cabin</dt>
          <dd className="capitalize text-neutral-300">{cabinLabel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-500">Fare</dt>
          <dd className="text-neutral-300">{fareLabel}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-1 text-neutral-500">
            <UsersIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Passengers
          </dt>
          <dd className="text-neutral-300">{paxCount}</dd>
        </div>
        <div className="flex justify-between border-t border-neutral-800 pt-2">
          <dt className="font-medium text-neutral-400">Total</dt>
          <dd className="font-semibold text-white">
            {formatCurrency(booking.grandTotal, booking.currency)}
          </dd>
        </div>
      </dl>

      {/* Footer: ref + CTA */}
      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-xs text-neutral-500">{booking.bookingRef}</span>
        <Link
          href={`/my-trips/${booking.bookingRef}`}
          className="flex items-center gap-1 rounded-lg border border-aether-700/50 bg-aether-900/20
                     px-3 py-1.5 text-xs font-medium text-aether-300 transition-colors
                     hover:border-aether-600 hover:text-aether-200 focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-aether-500"
        >
          View trip
          <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
