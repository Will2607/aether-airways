import type { Seat, SeatStatus, SeatType, PassengerSeatSelection } from "@/features/booking/types";

/* ── Styling helpers ─────────────────────────────────────────────────────── */

const TYPE_AVAILABLE_CLASSES: Record<SeatType, string> = {
  standard:        "bg-neutral-700 border-neutral-600 hover:bg-neutral-500 cursor-pointer",
  preferred:       "bg-aether-900 border-aether-700/60 hover:bg-aether-800 cursor-pointer",
  "extra-legroom": "bg-emerald-950 border-emerald-800/50 hover:bg-emerald-900 cursor-pointer",
  "exit-row":      "bg-amber-950/80 border-amber-800/40 hover:bg-amber-900/60 cursor-pointer",
};

/**
 * Returns the Tailwind class string for a seat button based on
 * its effective status and type. Status takes precedence over type.
 */
export function getSeatClasses(type: SeatType, status: SeatStatus): string {
  if (status === "occupied") {
    return "bg-neutral-800 border-neutral-700/40 cursor-not-allowed opacity-40";
  }
  if (status === "blocked") {
    return "bg-red-950/70 border-red-900/30 cursor-not-allowed opacity-50";
  }
  if (status === "selected") {
    return "bg-aether-500 border-aether-400 shadow-[0_0_8px_rgba(26,75,245,0.5)] hover:bg-aether-600 cursor-pointer";
  }
  return TYPE_AVAILABLE_CLASSES[type] ?? TYPE_AVAILABLE_CLASSES.standard;
}

/* ── Aria helpers ─────────────────────────────────────────────────────────── */

const TYPE_LABELS: Record<SeatType, string> = {
  standard:        "Standard",
  preferred:       "Preferred",
  "extra-legroom": "Extra legroom",
  "exit-row":      "Exit row",
};

/**
 * Builds a descriptive aria-label for a seat button that communicates
 * status, type, position, and price without relying solely on color.
 */
export function buildSeatAriaLabel(
  seat: Seat,
  effectiveStatus: SeatStatus,
  assignedPassenger?: string
): string {
  const typeLabel = TYPE_LABELS[seat.type];
  const priceText = seat.price.amount > 0 ? `$${seat.price.amount}` : "free";
  const posLabel  = seat.isWindow ? "window" : seat.isAisle ? "aisle" : "middle";

  if (effectiveStatus === "occupied") {
    return `Seat ${seat.label}, ${typeLabel}, occupied, unavailable`;
  }
  if (effectiveStatus === "blocked") {
    return `Seat ${seat.label}, blocked, unavailable`;
  }
  if (effectiveStatus === "selected") {
    const whoText = assignedPassenger ? ` for ${assignedPassenger}` : "";
    return `Seat ${seat.label}, ${typeLabel}, ${priceText}, selected${whoText}. Press to deselect.`;
  }
  return `Seat ${seat.label}, ${typeLabel}, ${priceText}, ${posLabel}, available. Press to select.`;
}

/* ── Price helpers ───────────────────────────────────────────────────────── */

/** Sum of all seat upgrade fees (excludes free seats). */
export function computeSeatFees(selections: PassengerSeatSelection[]): number {
  return selections.reduce((sum, s) => sum + s.price.amount, 0);
}
