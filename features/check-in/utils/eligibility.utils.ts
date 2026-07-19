import {
  CHECKIN_OPENS_HOURS_BEFORE,
  CHECKIN_CLOSES_MINUTES_BEFORE,
  DEMO_BYPASS_CHECKIN_WINDOW,
} from "@/features/check-in/constants";
import type { CheckInEligibility } from "@/features/check-in/types";
import type { CheckInResult } from "@/features/check-in/types";
import type { StoredBooking } from "@/features/trips/types";

/* ── Helpers ─────────────────────────────────────────────────────────────── */

/**
 * Derives the departure datetime from the booking.
 * Uses `departureAt` (ISO) if available, otherwise falls back to searchContext date.
 */
export function getDepartureDateTime(booking: StoredBooking): Date {
  const departureAt = booking.selection.flight.legs[0]?.departureAt;
  if (departureAt) {
    const d = new Date(departureAt);
    if (!isNaN(d.getTime())) return d;
  }
  // Fallback: use search date at midnight UTC
  return new Date(`${booking.selection.searchContext.departureDate}T00:00:00Z`);
}

/* ── Eligibility evaluation ──────────────────────────────────────────────── */

/**
 * Evaluates whether a booking is eligible for online check-in.
 *
 * Rules:
 *  1. Booking must be confirmed (not cancelled)
 *  2. No existing check-in for this booking
 *  3. Flight must be in the future
 *  4. Check-in must be open (within 48h window) — bypassed in DEMO mode
 *  5. All passengers must have seats assigned
 *
 * DEMO MODE: When DEMO_BYPASS_CHECKIN_WINDOW is true, step 4 is skipped.
 */
export function evaluateEligibility(
  booking:           StoredBooking,
  existingCheckIn?:  CheckInResult
): CheckInEligibility {
  // Rule 1: booking status
  if (booking.status === "cancelled") {
    return {
      eligible: false,
      status:   "not_eligible",
      reason:   "This booking has been cancelled and is not eligible for check-in.",
    };
  }

  // Rule 2: already checked in
  if (existingCheckIn) {
    return {
      eligible: false,
      status:   "checked_in",
      reason:   "Check-in has already been completed for this booking.",
    };
  }

  const departure = getDepartureDateTime(booking);
  const now       = new Date();

  // Rule 3: flight must not have departed
  if (departure <= now) {
    return {
      eligible: false,
      status:   "not_eligible",
      reason:   "The flight has already departed or is no longer available for check-in.",
    };
  }

  const opensAt   = new Date(departure.getTime() - CHECKIN_OPENS_HOURS_BEFORE * 60 * 60 * 1000);
  const closesAt  = new Date(departure.getTime() - CHECKIN_CLOSES_MINUTES_BEFORE * 60 * 1000);

  // Rule 4: check-in window
  if (!DEMO_BYPASS_CHECKIN_WINDOW && now < opensAt) {
    return {
      eligible: false,
      status:   "not_eligible",
      reason:   `Online check-in opens 48 hours before departure on ${opensAt.toLocaleString()}.`,
      opensAt:  opensAt.toISOString(),
    };
  }

  if (now >= closesAt) {
    return {
      eligible:  false,
      status:    "closed",
      reason:    "Online check-in is now closed. Please check in at the airport.",
      closesAt:  closesAt.toISOString(),
    };
  }

  // Rule 5: all passengers must have seats
  const passengerCount = booking.passengers.passengers.length;
  const seatCount      = booking.seats.selections.length;
  if (seatCount < passengerCount) {
    return {
      eligible: false,
      status:   "not_eligible",
      reason:   "All passengers must have a seat assigned before check-in.",
    };
  }

  return {
    eligible: true,
    status:   "eligible",
    reason:   "This booking is ready for online check-in.",
  };
}
