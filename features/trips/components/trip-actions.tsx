import Link from "next/link";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { CheckCircleIcon, PrinterIcon, PlaneIcon, PlaneIcon as FlightStatusIcon } from "@/shared/icons";
import { evaluateEligibility } from "@/features/check-in/utils/eligibility.utils";
import { urlSafeFlightNumber } from "@/features/flight-status/utils/flight-status.utils";
import type { StoredBooking } from "@/features/trips/types";
import type { CheckInResult } from "@/features/check-in/types";

interface TripActionsProps {
  trip?:    StoredBooking;
  checkIn?: CheckInResult | null;
}

export function TripActions({ trip, checkIn }: TripActionsProps) {
  const eligibility = trip ? evaluateEligibility(trip, checkIn ?? undefined) : null;
  const isEligible    = eligibility?.status === "eligible";
  const isCheckedIn   = eligibility?.status === "checked_in";

  // Flight number from first leg for Flight Status link
  const firstLegFlightNumber = trip?.selection.flight.legs[0]?.flightNumber;
  const flightStatusHref     = firstLegFlightNumber
    ? `/flight-status/${urlSafeFlightNumber(firstLegFlightNumber)}`
    : "/flight-status";

  return (
    <section aria-labelledby="trip-actions-heading" className="space-y-4">
      <Typography
        as="h2"
        id="trip-actions-heading"
        variant="label-lg"
        className="font-semibold text-white"
      >
        Manage your trip
      </Typography>

      <div className="flex flex-wrap gap-3">
        {/* Check-in CTA — dynamic based on eligibility */}
        {isCheckedIn ? (
          <Link href={`/check-in/${trip!.bookingRef}`}>
            <Button variant="primary">
              <PlaneIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              View boarding passes
            </Button>
          </Link>
        ) : isEligible ? (
          <Link href={`/check-in?ref=${trip!.bookingRef}`}>
            <Button variant="primary">
              <CheckCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Check in online
            </Button>
          </Link>
        ) : (
          <div className="flex flex-col gap-1">
            <Button
              variant="primary"
              disabled
              aria-disabled="true"
              title={eligibility?.reason ?? "Check-in is not available for this booking"}
            >
              <CheckCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Online check-in
            </Button>
            {eligibility?.reason && (
              <p className="text-xs text-neutral-600">{eligibility.reason}</p>
            )}
          </div>
        )}

        <Button
          variant="outline"
          disabled
          aria-disabled="true"
          title="Booking management is not available yet"
        >
          Manage booking
          <span className="ml-2 rounded-full bg-white/5 px-1.5 py-0.5 text-xs text-neutral-500">
            Coming soon
          </span>
        </Button>

        {/* Flight status */}
        <Link href={flightStatusHref}>
          <Button variant="outline">
            <FlightStatusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Flight status
          </Button>
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-xl border border-neutral-700 px-4 py-2 text-sm
                     font-medium text-neutral-400 transition-colors hover:border-neutral-600
                     hover:text-white focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-aether-500"
        >
          <PrinterIcon className="h-4 w-4" aria-hidden="true" />
          Print itinerary
        </button>
      </div>
    </section>
  );
}
