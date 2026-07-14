import type { ExtraSelection, ExtrasBreakdown, BookingExtra } from "@/features/booking/types";

/* ── Selection helpers ───────────────────────────────────────────────────── */

/** Current quantity of a specific extra for a specific passenger (or "booking"). */
export function getSelectionQty(
  selections: ExtraSelection[],
  extraId:    string,
  pid:        string
): number {
  return (
    selections.find((s) => s.extraId === extraId && s.passengerId === pid)?.quantity ?? 0
  );
}

/** Whether a specific extra is selected for a specific passenger (qty > 0). */
export function isExtraSelected(
  selections: ExtraSelection[],
  extraId:    string,
  pid:        string
): boolean {
  return selections.some((s) => s.extraId === extraId && s.passengerId === pid && s.quantity > 0);
}

/* ── Mutation helpers ────────────────────────────────────────────────────── */

/**
 * Set the quantity of an extra for a passenger.
 * Removes the entry if qty <= 0.
 */
export function setExtraQty(
  selections: ExtraSelection[],
  extra:      BookingExtra,
  pid:        string,
  qty:        number
): ExtraSelection[] {
  const filtered = selections.filter(
    (s) => !(s.extraId === extra.id && s.passengerId === pid)
  );
  if (qty <= 0) return filtered;
  return [
    ...filtered,
    { extraId: extra.id, passengerId: pid, quantity: qty, priceAtTime: extra.price, currency: extra.currency },
  ];
}

/**
 * Select a meal for a passenger (exclusive within the meal category).
 * Toggles off if the same meal is already selected.
 */
export function selectMealForPassenger(
  selections:   ExtraSelection[],
  extra:        BookingExtra,
  pid:          string,
  mealIds:      Set<string>
): ExtraSelection[] {
  // Remove any existing meal for this passenger
  const filtered     = selections.filter((s) => !(mealIds.has(s.extraId) && s.passengerId === pid));
  const wasSelected  = selections.some((s) => s.extraId === extra.id && s.passengerId === pid);
  if (wasSelected) return filtered; // toggle off
  return [
    ...filtered,
    { extraId: extra.id, passengerId: pid, quantity: 1, priceAtTime: extra.price, currency: extra.currency },
  ];
}

/**
 * Toggle a booking-level extra (e.g., insurance).
 * Only one option per category can be active.
 */
export function toggleBookingExtra(
  selections:    ExtraSelection[],
  extra:         BookingExtra,
  categoryIds:   Set<string>
): ExtraSelection[] {
  const filtered     = selections.filter((s) => !categoryIds.has(s.extraId));
  const wasSelected  = selections.some((s) => s.extraId === extra.id && s.passengerId === "booking");
  if (wasSelected) return filtered;
  return [
    ...filtered,
    { extraId: extra.id, passengerId: "booking", quantity: 1, priceAtTime: extra.price, currency: extra.currency },
  ];
}

/* ── Price breakdown ─────────────────────────────────────────────────────── */

/**
 * Compute a full breakdown of extras fees grouped by category.
 * The result is derived — original prices are never mutated.
 */
export function computeExtrasBreakdown(
  selections: ExtraSelection[],
  allExtras:  BookingExtra[]
): ExtrasBreakdown {
  const extrasMap = new Map(allExtras.map((e) => [e.id, e]));
  const b: ExtrasBreakdown = {
    baggageFees:   0,
    mealFees:      0,
    priorityFees:  0,
    loungeFees:    0,
    insuranceFees: 0,
    extrasTotal:   0,
  };

  for (const sel of selections) {
    const extra = extrasMap.get(sel.extraId);
    if (!extra) continue;
    const fee = sel.priceAtTime * sel.quantity;
    b.extrasTotal += fee;
    switch (extra.category) {
      case "baggage":           b.baggageFees   += fee; break;
      case "meal":              b.mealFees       += fee; break;
      case "priority-boarding": b.priorityFees   += fee; break;
      case "lounge":            b.loungeFees     += fee; break;
      case "insurance":         b.insuranceFees  += fee; break;
    }
  }

  return b;
}
