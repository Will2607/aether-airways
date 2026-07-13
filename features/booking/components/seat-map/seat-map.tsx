import { Typography } from "@/shared/ui/typography";
import { SeatRow } from "./seat-row";
import type { CabinSeatMap, Seat, PassengerSeatSelection } from "@/features/booking/types";

interface SeatMapProps {
  cabinMap:          CabinSeatMap;
  selections:        PassengerSeatSelection[];
  onSelectSeat:      (seat: Seat) => void;
  onHoverSeat:       (seat: Seat | null) => void;
}

/** Column header labels shown once above the seat grid. */
function ColumnHeaders() {
  return (
    <div className="flex items-center gap-1.5 mb-2" aria-hidden="true">
      {/* Row number spacer */}
      <div className="w-6" />

      {/* Left columns */}
      <div className="flex gap-1">
        {["A", "B", "C"].map((col) => (
          <div key={col} className="h-5 w-8 flex items-center justify-center">
            <Typography variant="caption" color="muted" className="font-mono font-semibold">
              {col}
            </Typography>
          </div>
        ))}
      </div>

      {/* Aisle spacer */}
      <div className="w-6" />

      {/* Right columns */}
      <div className="flex gap-1">
        {["D", "E", "F"].map((col) => (
          <div key={col} className="h-5 w-8 flex items-center justify-center">
            <Typography variant="caption" color="muted" className="font-mono font-semibold">
              {col}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SeatMap({ cabinMap, selections, onSelectSeat, onHoverSeat }: SeatMapProps) {
  function getPassengerLabel(seatId: string): string | undefined {
    return selections.find((s) => s.seatId === seatId)?.passengerLabel;
  }

  return (
    <div
      className="bg-card border border-neutral-800 rounded-2xl p-5"
      role="grid"
      aria-label={`Seat map for ${cabinMap.aircraftType}`}
    >
      {/* Aircraft info */}
      <Typography variant="caption" color="muted" className="text-center block mb-4">
        {cabinMap.aircraftType} · Economy Class · {cabinMap.totalRows} rows
      </Typography>

      {/* Nose indicator */}
      <div className="mx-auto mb-4 w-14 h-6 bg-neutral-800 rounded-t-full" aria-hidden="true" />

      {/* Scrollable map */}
      <div className="overflow-x-auto">
        <div className="min-w-[280px] space-y-1">
          <ColumnHeaders />

          {cabinMap.rows.map((row) => (
            <SeatRow
              key={row.rowNumber}
              row={row}
              selections={selections}
              onSelectSeat={onSelectSeat}
              onHoverSeat={onHoverSeat}
              getPassengerLabel={getPassengerLabel}
            />
          ))}
        </div>
      </div>

      {/* Tail indicator */}
      <div className="mx-auto mt-4 w-14 h-4 bg-neutral-800 rounded-b-full" aria-hidden="true" />
    </div>
  );
}
