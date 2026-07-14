import { cn } from "@/lib/utils";
import { Typography } from "@/shared/ui/typography";
import { CheckIcon } from "@/shared/icons";
import { QuantitySelector } from "./quantity-selector";
import type { BookingExtra, PassengerListItem } from "@/features/booking/types";

interface PassengerExtraRowProps {
  passenger:        PassengerListItem;
  extra:            BookingExtra;
  qty:              number;
  isSelected:       boolean;
  isMeal:           boolean;
  onQuantityChange: (qty: number) => void;
  onMealToggle:     () => void;
}

/**
 * One passenger row inside an ExtraOptionCard.
 * Renders a toggle button for meals and single-quantity extras,
 * or a QuantitySelector for multi-quantity extras.
 */
export function PassengerExtraRow({
  passenger,
  extra,
  qty,
  isSelected,
  isMeal,
  onQuantityChange,
  onMealToggle,
}: PassengerExtraRowProps) {
  const isToggleMode = isMeal || (extra.maxQuantity ?? 1) <= 1;
  const ariaLabel = `${isSelected ? "Remove" : "Add"} ${extra.name} for ${passenger.label} — ${passenger.name}`;

  return (
    <div className="flex items-center justify-between gap-3 py-2">
      {/* Passenger info */}
      <div className="min-w-0">
        <Typography
          variant="label-sm"
          className={cn("font-medium leading-tight", isSelected ? "text-white" : "text-neutral-400")}
        >
          {passenger.label}
        </Typography>
        <Typography variant="caption" color="muted" className="leading-tight truncate">
          {passenger.name}
        </Typography>
      </div>

      {/* Control */}
      {isToggleMode ? (
        <button
          type="button"
          onClick={isMeal ? onMealToggle : () => onQuantityChange(isSelected ? 0 : 1)}
          aria-pressed={isSelected}
          aria-label={ariaLabel}
          className={cn(
            "shrink-0 flex items-center gap-1.5 h-8 px-3 rounded-lg border text-sm font-medium",
            "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
            isSelected
              ? "bg-aether-500/20 border-aether-500/50 text-aether-300"
              : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200"
          )}
        >
          {isSelected && <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          <span>{isSelected ? "Selected" : "Select"}</span>
        </button>
      ) : (
        <QuantitySelector
          value={qty}
          min={0}
          max={extra.maxQuantity ?? 99}
          label={`${extra.name} for ${passenger.label}`}
          onChange={onQuantityChange}
        />
      )}
    </div>
  );
}
