"use client";
import { PlaneIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { useBookings } from "@/features/trips/hooks/use-bookings";
import { groupTripsByStatus } from "@/features/trips/utils/trip.utils";
import { BookingLookupForm } from "@/features/trips/components/booking-lookup-form";
import { TripsSection } from "@/features/trips/components/trips-section";
import { TripsEmptyState } from "@/features/trips/components/trips-empty-state";

export function MyTripsPage() {
  const { bookings } = useBookings();
  const { upcoming, completed, cancelled } = groupTripsByStatus(bookings);
  const hasTrips = bookings.length > 0;

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-aether-900/40"
            aria-hidden="true"
          >
            <PlaneIcon className="h-5 w-5 text-aether-400" />
          </div>
          <div>
            <Typography as="h1" variant="heading-xl" className="text-white">
              My Trips
            </Typography>
            <Typography variant="body-sm" color="muted">
              View and manage your AetherAirways reservations.
            </Typography>
          </div>
        </div>

        {/* Booking lookup */}
        <div className="mb-10">
          <BookingLookupForm bookings={bookings} />
        </div>

        {/* Trip sections */}
        <section aria-label="Your bookings">
          <Typography variant="heading-sm" className="mb-5 text-white">
            Your trips
          </Typography>

          {!hasTrips ? (
            <TripsEmptyState />
          ) : (
            <div className="space-y-10">
              <TripsSection
                title="Upcoming trips"
                trips={upcoming}
                headingId="upcoming-trips-heading"
              />
              <TripsSection
                title="Past trips"
                trips={completed}
                headingId="past-trips-heading"
              />
              <TripsSection
                title="Cancelled trips"
                trips={cancelled}
                headingId="cancelled-trips-heading"
              />
            </div>
          )}
        </section>

        {/* Limitation note */}
        <p className="mt-12 text-center text-xs text-neutral-700">
          Bookings are stored locally in this browser session.{" "}
          No account required — data is not synced between devices or browsers.
        </p>
      </div>
    </div>
  );
}
