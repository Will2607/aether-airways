import Link from "next/link";
import { ArrowLeftIcon, PlaneIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { TripStatusBadge } from "@/features/trips/components/trip-status-badge";
import { deriveTripDisplayStatus, formatTripDate } from "@/features/trips/utils/trip.utils";
import type { StoredBooking } from "@/features/trips/types";

interface TripDetailsHeaderProps {
  trip: StoredBooking;
}

export function TripDetailsHeader({ trip }: TripDetailsHeaderProps) {
  const status   = deriveTripDisplayStatus(trip);
  const legs     = trip.selection.flight.legs;
  const first    = legs[0]!;
  const last     = legs[legs.length - 1]!;
  const depDate  = formatTripDate(trip.selection.searchContext.departureDate);
  const confirmedDate = new Date(trip.confirmedAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <div className="border-b border-neutral-800 bg-surface/80 px-4 py-6 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/my-trips"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          My Trips
        </Link>

        {/* Route + status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Typography as="h1" variant="heading-xl" className="tabular-nums text-white">
              {first.origin.code}
            </Typography>
            <PlaneIcon className="h-5 w-5 text-neutral-500" aria-hidden="true" />
            <Typography as="span" variant="heading-xl" className="tabular-nums text-white">
              {last.destination.code}
            </Typography>
          </div>
          <TripStatusBadge status={status} />
        </div>

        {/* Meta */}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500">
          <span>{depDate}</span>
          <span>·</span>
          <span className="font-mono font-medium text-neutral-400">{trip.bookingRef}</span>
          <span>·</span>
          <span>Confirmed {confirmedDate}</span>
        </div>
      </div>
    </div>
  );
}
