import { getDepartureDateTime } from "@/features/check-in/utils/eligibility.utils";
import type { StoredBooking } from "@/features/trips/types";
import type { CheckInResult } from "@/features/check-in/types";
import type { ManageBookingEligibility } from "@/features/manage-booking/types";

/**
 * Evaluates whether a booking can be modified.
 *
 * Rules:
 * 1. Booking must be "confirmed" (not cancelled)
 * 2. Flight must not have departed
 * 3. If checked in: only contact editing is allowed (seats/extras locked)
 * 4. Otherwise: all sections are editable
 *
 * NOTE: The DEMO_BYPASS_CHECKIN_WINDOW flag from the check-in domain
 * does NOT affect manage-booking eligibility rules.
 */
export function evaluateManageBookingEligibility(
  booking:  StoredBooking,
  checkIn?: CheckInResult | null
): ManageBookingEligibility {
  const BLOCKED: ManageBookingEligibility = {
    status:          "blocked",
    canModify:       false,
    canEditContact:  false,
    canChangeSeats:  false,
    canChangeExtras: false,
    reason:          "",
  };

  if (booking.status === "cancelled") {
    return { ...BLOCKED, reason: "This booking has been cancelled and cannot be modified." };
  }

  const departure = getDepartureDateTime(booking);
  const now       = new Date();

  if (departure <= now) {
    return {
      ...BLOCKED,
      reason: "Modifications are not available after the flight has departed.",
    };
  }

  if (checkIn) {
    return {
      status:          "partial",
      canModify:       true,
      canEditContact:  true,
      canChangeSeats:  false,
      canChangeExtras: false,
      reason:          "Check-in is complete. Only contact information can be updated.",
    };
  }

  return {
    status:          "eligible",
    canModify:       true,
    canEditContact:  true,
    canChangeSeats:  true,
    canChangeExtras: true,
    reason:          "This booking is eligible for modifications.",
  };
}
