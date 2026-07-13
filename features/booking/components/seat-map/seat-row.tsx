import { cn } from "@/lib/utils";
import { Typography } from "@/shared/ui/typography";
import { SeatButton } from "./seat-button";
import type { SeatRow as SeatRowType, SeatStatus, Seat, PassengerSeatSelection } from "@/features/booking/types";

interface SeatRowProps {
  row:             SeatRowType;
  selections:      PassengerSeatSelection[];
  onSelectSeat:    (seat: Seat) => void;
  onHoverSeat:     (seat: Seat | null) => void;
  getPassengerLabel: (seatId: string) => string | undefined;
}

function getEffectiveStatus(seat: Seat, selections: PassengerSeatSelection[]): SeatStatus {
  if (seat.status === "occupied" || seat.status === "blocked") return seat.status;
  const isSelected = selections.some((s) => s.seatId === seat.id);
  return isSelected ? "selected" : "available";
}

export function SeatRow({
  row,
  selections,
  onSelectSeat,
  onHoverSeat,
  getPassengerLabel,
}: SeatRowProps) {
  const leftSeats  = row.seats.filter((s) => ["A", "B", "C"].includes(s.column));
  const rightSeats = row.seats.filter((s) => ["D", "E", "F"].includes(s.column));

  return (
    <div
      className={cn(
        "flex items-center gap-1.5",
        row.isExitRow && "border-y border-amber-800/30 my-0.5"
      )}
      role="row"
    >
      {/* Row number */}
      <Typography
        variant="caption"
        color="muted"
        className="w-6 text-right shrink-0 tabular-nums select-none"
        aria-hidden="true"
      >
        {row.rowNumber}
      </Typography>

      {/* Left block: A B C */}
      <div className="flex gap-1" role="group" aria-label={`Row ${row.rowNumber}, seats A to C`}>
        {leftSeats.map((seat) => {
          const effectiveStatus = getEffectiveStatus(seat, selections);
          return (
            <SeatButton
              key={seat.id}
              seat={seat}
              effectiveStatus={effectiveStatus}
              assignedPassenger={getPassengerLabel(seat.id)}
              onClick={() => onSelectSeat(seat)}
              onHover={onHoverSeat}
            />
          );
        })}
      </div>

      {/* Aisle */}
      <div className="w-6 shrink-0 flex items-center justify-center" aria-hidden="true">
        {row.isExitRow && (
          <span className="text-[7px] text-amber-600 font-bold leading-none">EXIT</span>
        )}
      </div>

      {/* Right block: D E F */}
      <div className="flex gap-1" role="group" aria-label={`Row ${row.rowNumber}, seats D to F`}>
        {rightSeats.map((seat) => {
          const effectiveStatus = getEffectiveStatus(seat, selections);
          return (
            <SeatButton
              key={seat.id}
              seat={seat}
              effectiveStatus={effectiveStatus}
              assignedPassenger={getPassengerLabel(seat.id)}
              onClick={() => onSelectSeat(seat)}
              onHover={onHoverSeat}
            />
          );
        })}
      </div>
    </div>
  );
}
