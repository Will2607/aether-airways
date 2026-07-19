import { CheckIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { cn } from "@/lib/utils";
import type { StoredBooking } from "@/features/trips/types";

function maskDoc(doc: string): string {
  if (doc.length <= 4) return "••••";
  return `${"•".repeat(Math.min(doc.length - 4, 8))}${doc.slice(-4)}`;
}

interface PassengerCheckInListProps {
  booking:    StoredBooking;
  selectedIds: string[];
  onToggle:   (id: string) => void;
  onNext:     () => void;
}

export function PassengerCheckInList({
  booking,
  selectedIds,
  onToggle,
  onNext,
}: PassengerCheckInListProps) {
  const seatByIdx = Object.fromEntries(
    booking.seats.selections.map((s) => [s.passengerId, s.seatLabel])
  );
  const isMultiple = booking.passengers.passengers.length > 1;
  const canContinue = selectedIds.length > 0;

  return (
    <div className="space-y-5">
      <div>
        <Typography variant="heading-sm" className="text-white">Step 1 of 2 — Confirm passengers</Typography>
        <Typography variant="body-sm" color="muted" className="mt-1">
          {isMultiple
            ? "Select the passengers you are checking in."
            : "Confirm the passenger details before proceeding."}
        </Typography>
      </div>

      <ul className="space-y-3" aria-label="Passenger list">
        {booking.passengers.passengers.map((p, i) => {
          const id        = String(i);
          const isSelected = selectedIds.includes(id);
          const seat      = seatByIdx[id] ?? "—";
          const fullName  = `${p.firstName} ${p.lastName}`;
          const typeLabel = p.passengerType.charAt(0).toUpperCase() + p.passengerType.slice(1);

          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => isMultiple && onToggle(id)}
                aria-pressed={isSelected}
                disabled={!isMultiple}
                className={cn(
                  "w-full rounded-xl border px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
                  isSelected
                    ? "border-aether-700/60 bg-aether-900/20"
                    : "border-neutral-800 bg-neutral-950/40",
                  isMultiple && "cursor-pointer hover:border-neutral-700"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{fullName}</span>
                      <Badge variant="secondary" size="sm">{typeLabel} {i + 1}</Badge>
                    </div>
                    <p className="text-xs text-neutral-500">
                      {p.documentType.toUpperCase()} · {maskDoc(p.documentNumber)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="secondary" size="sm">Seat {seat}</Badge>
                    {isMultiple && (
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded border-2",
                          isSelected ? "border-aether-500 bg-aether-500" : "border-neutral-600"
                        )}
                        aria-hidden="true"
                      >
                        {isSelected && <CheckIcon className="h-3 w-3 text-white" />}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {!canContinue && (
        <p role="alert" className="text-xs text-red-400">
          Please select at least one passenger to continue.
        </p>
      )}

      <Button
        variant="primary"
        onClick={onNext}
        disabled={!canContinue}
        className="w-full sm:w-auto"
      >
        Continue to declarations
      </Button>
    </div>
  );
}
