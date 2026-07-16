import type {
  BookingConfirmation,
  BookingSelection,
  PassengerFormData,
  SeatSelectionData,
  ExtrasSelectionData,
  BookingPriceSummary,
  ExtrasBreakdown,
  SafePaymentSummary,
} from "@/features/booking/types";

/* ── Booking reference ───────────────────────────────────────────────────── */

/**
 * Generate a 6-character booking reference.
 * Uses timestamp as seed — deterministic for a given millisecond.
 * In production, the reference would be server-generated and guaranteed unique.
 */
export function generateBookingRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // excludes I, O, 0, 1 for readability
  let seed    = Date.now();
  let ref     = "AE";
  for (let i = 0; i < 4; i++) {
    ref  += chars[seed % chars.length]!;
    seed  = Math.floor(seed / chars.length);
  }
  return ref; // e.g., "AE7K2P"
}

/* ── Confirmation builder ────────────────────────────────────────────────── */

export interface BuildConfirmationInput {
  selection:       BookingSelection;
  passengers:      PassengerFormData;
  seats:           SeatSelectionData;
  extras:          ExtrasSelectionData | null;
  priceSummary:    BookingPriceSummary;
  seatFees:        number;
  extrasBreakdown: ExtrasBreakdown;
  grandTotal:      number;
  currency:        string;
  /** Safe payment metadata — must NOT include full card number or CVC. */
  payment:         SafePaymentSummary;
}

/**
 * Build a BookingConfirmation from all booking flow data.
 * The resulting object is safe to persist: it contains no sensitive card data.
 */
export function buildBookingConfirmation(input: BuildConfirmationInput): BookingConfirmation {
  return {
    bookingRef:      generateBookingRef(),
    confirmedAt:     new Date().toISOString(),
    status:          "confirmed",
    selection:       input.selection,
    passengers:      input.passengers,
    seats:           input.seats,
    extras:          input.extras,
    priceSummary:    input.priceSummary,
    seatFees:        input.seatFees,
    extrasBreakdown: input.extrasBreakdown,
    grandTotal:      input.grandTotal,
    currency:        input.currency,
    payment:         input.payment,
  };
}
