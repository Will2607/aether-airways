import { cn } from "@/lib/utils";
import { CheckIcon } from "@/shared/icons";
import { getSeatClasses, buildSeatAriaLabel } from "@/features/booking/utils/seat.utils";
import type { Seat, SeatStatus } from "@/features/booking/types";

interface SeatButtonProps {
  seat:              Seat;
  effectiveStatus:   SeatStatus;
  assignedPassenger?: string;
  onClick:           () => void;
  onHover:           (seat: Seat | null) => void;
}

/** Visual indicator shown inside the seat button (non-color communication). */
function SeatIndicator({ status, column }: { status: SeatStatus; column: string }) {
  if (status === "selected") {
    return <CheckIcon className="h-3 w-3 text-white" aria-hidden="true" />;
  }
  if (status === "occupied") {
    return <span className="text-[9px] leading-none text-neutral-500" aria-hidden="true">✕</span>;
  }
  if (status === "blocked") {
    return <span className="text-[9px] leading-none text-red-700" aria-hidden="true">—</span>;
  }
  return (
    <span className="text-[9px] leading-none font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors" aria-hidden="true">
      {column}
    </span>
  );
}

export function SeatButton({
  seat,
  effectiveStatus,
  assignedPassenger,
  onClick,
  onHover,
}: SeatButtonProps) {
  const isDisabled = effectiveStatus === "occupied" || effectiveStatus === "blocked";
  const ariaLabel  = buildSeatAriaLabel(seat, effectiveStatus, assignedPassenger);

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-pressed={effectiveStatus === "selected"}
      onClick={onClick}
      onMouseEnter={() => onHover(seat)}
      onFocus={() => onHover(seat)}
      onMouseLeave={() => onHover(null)}
      onBlur={() => onHover(null)}
      className={cn(
        "group relative h-8 w-8 rounded-t-lg border flex items-center justify-center",
        "transition-all duration-150 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-aether-400 focus-visible:ring-offset-1 focus-visible:ring-offset-surface",
        "active:scale-95",
        getSeatClasses(seat.type, effectiveStatus)
      )}
    >
      <SeatIndicator status={effectiveStatus} column={seat.column} />
    </button>
  );
}
