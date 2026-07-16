import { Typography } from "@/shared/ui/typography";
import { TripCard } from "@/features/trips/components/trip-card";
import type { StoredBooking } from "@/features/trips/types";

interface TripsSectionProps {
  title:  string;
  trips:  StoredBooking[];
  headingId?: string;
}

export function TripsSection({ title, trips, headingId }: TripsSectionProps) {
  if (trips.length === 0) return null;

  return (
    <section aria-labelledby={headingId}>
      <Typography
        as="h2"
        id={headingId}
        variant="heading-sm"
        className="mb-4 text-white"
      >
        {title}
      </Typography>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {trips.map((booking) => (
          <TripCard key={booking.bookingRef} booking={booking} />
        ))}
      </div>
    </section>
  );
}
