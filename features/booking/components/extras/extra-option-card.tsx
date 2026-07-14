import { cn } from "@/lib/utils";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { CheckIcon, InfoIcon } from "@/shared/icons";
import { formatCurrency } from "@/features/booking/utils/booking.utils";
import { getSelectionQty, isExtraSelected } from "@/features/booking/utils/extras.utils";
import { PassengerExtraRow } from "./passenger-extra-row";
import type { BookingExtra, ExtraSelection, PassengerListItem } from "@/features/booking/types";

interface ExtraOptionCardProps {
  extra:            BookingExtra;
  passengers:       PassengerListItem[];
  selections:       ExtraSelection[];
  /** Called for quantity-based per-passenger extras. */
  onQuantityChange: (passengerId: string, qty: number) => void;
  /** Called for meal-type per-passenger extras (exclusive per passenger). */
  onMealSelect:     (passengerId: string) => void;
  /** Called for per-booking extras (insurance). Toggles on/off. */
  onBookingToggle:  () => void;
}

export function ExtraOptionCard({
  extra,
  passengers,
  selections,
  onQuantityChange,
  onMealSelect,
  onBookingToggle,
}: ExtraOptionCardProps) {
  const isInsurance      = !extra.selectablePerPassenger;
  const isMeal           = extra.category === "meal";
  const isBookingSelected = selections.some(
    (s) => s.extraId === extra.id && s.passengerId === "booking"
  );
  const isUnavailable    = extra.availability !== "available";

  return (
    <div
      className={cn(
        "bg-card border rounded-2xl p-4 transition-all duration-150",
        isUnavailable ? "border-neutral-800 opacity-60" : "border-neutral-800 hover:border-neutral-700"
      )}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Typography variant="label-lg" className="font-semibold text-white leading-tight">
            {extra.name}
          </Typography>
          <Typography variant="caption" color="secondary" className="mt-0.5 leading-snug">
            {extra.description}
          </Typography>
        </div>

        <div className="shrink-0 text-right">
          {extra.price === 0 ? (
            <Badge variant="success" size="sm">Free</Badge>
          ) : (
            <Typography variant="label-lg" color="accent-gold" className="tabular-nums font-semibold">
              +{formatCurrency(extra.price, extra.currency)}
            </Typography>
          )}
          {extra.maxQuantity && extra.maxQuantity > 1 && !isMeal && (
            <Typography variant="caption" color="muted" className="block">
              per unit
            </Typography>
          )}
        </div>
      </div>

      {/* ── Unavailable notice ───────────────────────────────────────── */}
      {isUnavailable && (
        <div className="flex items-center gap-1.5 mt-3 text-neutral-500">
          <InfoIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <Typography variant="caption" color="muted">Not available for this flight.</Typography>
        </div>
      )}

      {/* ── Per-booking toggle (insurance) ───────────────────────────── */}
      {isInsurance && !isUnavailable && (
        <div className="mt-3 pt-3 border-t border-neutral-800">
          <button
            type="button"
            onClick={onBookingToggle}
            aria-pressed={isBookingSelected}
            aria-label={`${isBookingSelected ? "Remove" : "Add"} ${extra.name} to booking`}
            className={cn(
              "w-full flex items-center justify-center gap-2 h-10 rounded-xl border text-sm font-medium",
              "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
              isBookingSelected
                ? "bg-aether-500/20 border-aether-500/50 text-aether-300"
                : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-aether-700 hover:text-aether-300"
            )}
          >
            {isBookingSelected && <CheckIcon className="h-4 w-4" aria-hidden="true" />}
            {isBookingSelected ? "Added to booking" : `Add to booking · +${formatCurrency(extra.price, extra.currency)}`}
          </button>
        </div>
      )}

      {/* ── Per-passenger controls ───────────────────────────────────── */}
      {!isInsurance && !isUnavailable && passengers.length > 0 && (
        <div className="mt-3 pt-3 border-t border-neutral-800 divide-y divide-neutral-800/60">
          {passengers.map((p) => (
            <PassengerExtraRow
              key={p.id}
              passenger={p}
              extra={extra}
              qty={getSelectionQty(selections, extra.id, p.id)}
              isSelected={isExtraSelected(selections, extra.id, p.id)}
              isMeal={isMeal}
              onQuantityChange={(qty) => onQuantityChange(p.id, qty)}
              onMealToggle={() => onMealSelect(p.id)}
            />
          ))}
        </div>
      )}

      {/* ── Terms ────────────────────────────────────────────────────── */}
      {extra.terms && (
        <Typography variant="caption" color="muted" className="block mt-3 text-xs italic leading-snug">
          * {extra.terms}
        </Typography>
      )}
    </div>
  );
}
