import type { BookingConfirmation } from "@/features/booking/types";

/* ── Status types ────────────────────────────────────────────────────────── */

/**
 * Raw storage status.
 * "confirmed" is set by the payment flow.
 * "cancelled" can be set manually for demo purposes (no real cancellation logic).
 */
export type TripStoredStatus = "confirmed" | "cancelled";

/**
 * Derived display status based on stored status + departure date.
 * Upcoming  = confirmed + future departure
 * Completed = confirmed + past departure
 * Cancelled = stored as cancelled
 */
export type TripDisplayStatus = "upcoming" | "completed" | "cancelled";

/* ── StoredBooking ────────────────────────────────────────────────────────── */

/**
 * A confirmed booking persisted in localStorage.
 * Extends BookingConfirmation with a broader status type to support cancellation.
 * Never includes full card number or CVC — only SafePaymentSummary.
 *
 * LIMITATION: Stored in localStorage (client-only). Not synced across devices.
 * In production, bookings would be server-side under authenticated sessions.
 */
export interface StoredBooking extends Omit<BookingConfirmation, "status"> {
  status: TripStoredStatus;
}

/* ── Lookup ──────────────────────────────────────────────────────────────── */

export interface BookingLookupInput {
  /** Raw input — normalized to uppercase before comparison. */
  bookingRef: string;
  /** Compared (case-insensitive) against at least one passenger's last name. */
  lastName:   string;
}
