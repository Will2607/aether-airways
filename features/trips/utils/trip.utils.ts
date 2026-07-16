import type { StoredBooking, BookingLookupInput, TripDisplayStatus } from "@/features/trips/types";

/* ── Status derivation ───────────────────────────────────────────────────── */

/**
 * Derives a display status from the stored booking.
 *
 * Rules:
 *  - status === "cancelled"         → "cancelled"
 *  - departure date < today         → "completed"
 *  - departure date >= today        → "upcoming"
 */
export function deriveTripDisplayStatus(booking: StoredBooking): TripDisplayStatus {
  if (booking.status === "cancelled") return "cancelled";

  const departureDate = new Date(booking.selection.searchContext.departureDate);
  const today         = new Date();
  // Compare by date only (ignore time)
  today.setHours(0, 0, 0, 0);

  return departureDate >= today ? "upcoming" : "completed";
}

/* ── Booking lookup ─────────────────────────────────────────────────────── */

/**
 * Locates a booking by reference + last name validation.
 *
 * Security: Always returns the same error message whether the ref or name is wrong.
 * This prevents enumeration attacks.
 */
export function lookupBooking(
  input: BookingLookupInput,
  bookings: StoredBooking[]
): StoredBooking | null {
  const ref      = input.bookingRef.trim().toUpperCase();
  const lastName = input.lastName.trim().toLowerCase().replace(/\s+/g, " ");

  const booking = bookings.find((b) => b.bookingRef === ref);
  if (!booking) return null;

  const hasMatch = booking.passengers.passengers.some(
    (p) => p.lastName.trim().toLowerCase() === lastName
  );

  return hasMatch ? booking : null;
}

/* ── Grouping ────────────────────────────────────────────────────────────── */

export interface GroupedTrips {
  upcoming:  StoredBooking[];
  completed: StoredBooking[];
  cancelled: StoredBooking[];
}

export function groupTripsByStatus(bookings: StoredBooking[]): GroupedTrips {
  const groups: GroupedTrips = { upcoming: [], completed: [], cancelled: [] };
  for (const booking of bookings) {
    groups[deriveTripDisplayStatus(booking)].push(booking);
  }
  return groups;
}

/* ── Formatters ─────────────────────────────────────────────────────────── */

/** Format a date string as "Aug 15, 2026" */
export function formatTripDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year:  "numeric",
    month: "short",
    day:   "numeric",
  });
}

/** Format a datetime string as "Wed, Aug 15, 2026 · 06:30" */
export function formatTripDateTime(iso: string): string {
  const date = new Date(iso);
  const datePart = date.toLocaleDateString("en-US", {
    weekday: "short",
    month:   "short",
    day:     "numeric",
    year:    "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour:   "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${datePart} · ${timePart}`;
}

/** Total passenger count from search context */
export function totalPassengers(booking: StoredBooking): number {
  const ctx = booking.selection.searchContext;
  return (ctx.passengers.adults ?? 0) + (ctx.passengers.children ?? 0) + (ctx.passengers.infants ?? 0);
}
