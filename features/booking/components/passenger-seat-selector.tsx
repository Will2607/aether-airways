import { cn } from "@/lib/utils";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { XIcon, CheckIcon } from "@/shared/icons";
import type { PassengerListItem, PassengerSeatSelection } from "@/features/booking/types";

interface PassengerSeatSelectorProps {
  passengers:       PassengerListItem[];
  selections:       PassengerSeatSelection[];
  activeIdx:        number;
  onSelectPassenger: (idx: number) => void;
  onClearSeat:      (passengerId: string) => void;
}

interface PassengerRowProps {
  passenger:   PassengerListItem;
  selection?:  PassengerSeatSelection;
  isActive:    boolean;
  onActivate:  () => void;
  onClear:     () => void;
}

function PassengerRow({ passenger, selection, isActive, onActivate, onClear }: PassengerRowProps) {
  const hasSeated = Boolean(selection);

  return (
    <li>
      <button
        type="button"
        onClick={onActivate}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
          isActive
            ? "bg-aether-900/60 ring-1 ring-aether-600/50"
            : "hover:bg-neutral-800/60"
        )}
        aria-current={isActive ? "true" : undefined}
        aria-label={`${passenger.label} — ${passenger.name}${hasSeated ? `, seated at ${selection!.seatLabel}` : ", no seat selected"}. ${isActive ? "Active" : "Click to select"}`}
      >
        {/* Status icon */}
        <div
          className={cn(
            "h-7 w-7 rounded-full border flex items-center justify-center shrink-0 transition-colors",
            hasSeated
              ? "bg-aether-500 border-aether-400"
              : isActive
                ? "border-aether-500 bg-aether-500/10"
                : "border-neutral-700 bg-neutral-800"
          )}
          aria-hidden="true"
        >
          {hasSeated
            ? <CheckIcon className="h-3.5 w-3.5 text-white" />
            : <span className={cn("text-[10px] font-bold", isActive ? "text-aether-400" : "text-neutral-500")}>
                {passenger.id}
              </span>
          }
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <Typography variant="label-sm" className={cn("font-semibold leading-tight", isActive ? "text-aether-300" : "text-white")}>
            {passenger.label}
          </Typography>
          <Typography variant="caption" color="muted" className="truncate leading-tight">
            {passenger.name}
          </Typography>
        </div>

        {/* Seat badge or placeholder */}
        {hasSeated ? (
          <div className="flex items-center gap-1 shrink-0">
            <Badge variant="primary" size="sm">{selection!.seatLabel}</Badge>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="h-5 w-5 rounded-full flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-aether-500"
              aria-label={`Remove seat ${selection!.seatLabel} for ${passenger.label}`}
            >
              <XIcon className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <Typography variant="caption" color="muted" className="shrink-0 italic">
            {isActive ? "Select below" : "—"}
          </Typography>
        )}
      </button>
    </li>
  );
}

export function PassengerSeatSelector({
  passengers,
  selections,
  activeIdx,
  onSelectPassenger,
  onClearSeat,
}: PassengerSeatSelectorProps) {
  return (
    <div className="bg-card border border-neutral-800 rounded-2xl p-4">
      <Typography variant="label-lg" className="font-semibold text-white block mb-3">
        Passengers
      </Typography>

      <ul className="space-y-1" aria-label="Passenger list — select a passenger then click a seat">
        {passengers.map((p, idx) => {
          const selection = selections.find((s) => s.passengerId === p.id);
          return (
            <PassengerRow
              key={p.id}
              passenger={p}
              selection={selection}
              isActive={idx === activeIdx}
              onActivate={() => onSelectPassenger(idx)}
              onClear={() => onClearSeat(p.id)}
            />
          );
        })}
      </ul>
    </div>
  );
}
