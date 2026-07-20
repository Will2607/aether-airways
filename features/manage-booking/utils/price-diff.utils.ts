import type { StoredBooking } from "@/features/trips/types";
import type { SeatDraftEntry, ExtraDraftEntry, PriceDiff } from "@/features/manage-booking/types";
import type { ExtrasBreakdown, BookingExtra } from "@/features/booking/types";
import { ALL_EXTRAS } from "@/features/booking/mocks/extras.mock";

/* ── Seat fees ────────────────────────────────────────────────────────────── */

/** Total seat fee from a draft seat list. */
export function draftSeatTotal(seats: SeatDraftEntry[]): number {
  return seats.reduce((sum, s) => sum + s.price.amount, 0);
}

/* ── Extras ─────────────────────────────────────────────────────────────── */

/** Total extras cost from a draft extras list. */
export function draftExtrasTotal(extras: ExtraDraftEntry[]): number {
  return extras.reduce((sum, e) => sum + e.quantity * e.priceAtTime, 0);
}

/** Recomputes the ExtrasBreakdown from a flat selection list. */
export function computeExtrasBreakdown(selections: ExtraDraftEntry[]): ExtrasBreakdown {
  const all = new Map<string, BookingExtra>(ALL_EXTRAS.map((e) => [e.id, e]));
  const bd: ExtrasBreakdown = {
    baggageFees:  0,
    mealFees:     0,
    priorityFees: 0,
    loungeFees:   0,
    insuranceFees: 0,
    extrasTotal:  0,
  };

  for (const sel of selections) {
    const extra = all.get(sel.extraId);
    if (!extra) continue;
    const amount = sel.quantity * sel.priceAtTime;
    switch (extra.category) {
      case "baggage":           bd.baggageFees  += amount; break;
      case "meal":              bd.mealFees     += amount; break;
      case "priority-boarding": bd.priorityFees += amount; break;
      case "lounge":            bd.loungeFees   += amount; break;
      case "insurance":         bd.insuranceFees += amount; break;
    }
    bd.extrasTotal += amount;
  }

  return bd;
}

/* ── Net price difference ────────────────────────────────────────────────── */

/**
 * Computes the price impact of all pending changes.
 * newTotal is floored at 0 to avoid negative totals.
 */
export function computePriceDiff(
  original: StoredBooking,
  seats:    SeatDraftEntry[],
  extras:   ExtraDraftEntry[]
): PriceDiff {
  const origSeatFee    = original.seatFees;
  const origExtrasTotal = original.extras?.extrasTotal ?? 0;

  const newSeatFee    = draftSeatTotal(seats);
  const newExtrasTotal = draftExtrasTotal(extras);

  const seatDiff   = newSeatFee - origSeatFee;
  const extrasDiff = newExtrasTotal - origExtrasTotal;
  const net        = seatDiff + extrasDiff;

  const added   = Math.max(0,  net);
  const removed = Math.max(0, -net);

  const newTotal = Math.max(0, original.grandTotal + net);

  return {
    previousTotal:  original.grandTotal,
    addedCharges:   added,
    removedCredits: removed,
    netDifference:  net,
    newTotal,
  };
}
