"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, AlertCircleIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { MOCK_CABIN_SEAT_MAP } from "@/features/booking/mocks/seat-map.mock";
import type { Seat } from "@/features/booking/types";
import type { SeatDraftEntry } from "@/features/manage-booking/types";
import type { StoredBooking } from "@/features/trips/types";

/* ── Seat button ─────────────────────────────────────────────────────────── */

function SeatButton({
  seat,
  isCurrentPassenger,
  isTakenByOther,
  onClick,
}: {
  seat:               Seat;
  isCurrentPassenger: boolean;
  isTakenByOther:     boolean;
  onClick:            () => void;
}) {
  const unavailable = seat.status === "occupied" || seat.status === "blocked" || isTakenByOther;
  const typeColors: Record<string, string> = {
    preferred:       "border-violet-700/60 bg-violet-900/20 text-violet-300",
    "exit-row":      "border-amber-700/60 bg-amber-900/20 text-amber-300",
    "extra-legroom": "border-emerald-700/60 bg-emerald-900/20 text-emerald-300",
    standard:        "border-neutral-700 bg-neutral-900 text-neutral-300",
  };

  if (unavailable) {
    return (
      <div
        className="flex h-8 w-8 items-center justify-center rounded border border-neutral-800 bg-neutral-950/50 text-xs text-neutral-700 cursor-not-allowed"
        aria-label={`Seat ${seat.label} — unavailable`}
        aria-disabled="true"
      >
        {seat.label}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded border text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
        isCurrentPassenger
          ? "border-aether-500 bg-aether-600 text-white ring-1 ring-aether-400"
          : typeColors[seat.type]
      )}
      aria-label={`Seat ${seat.label}${seat.price.amount > 0 ? `, $${seat.price.amount}` : ", included"}`}
      aria-pressed={isCurrentPassenger}
    >
      {isCurrentPassenger ? <CheckIcon className="h-3 w-3" aria-hidden="true" /> : seat.label}
    </button>
  );
}

/* ── Seat grid section ───────────────────────────────────────────────────── */

function SeatGrid({
  selectedPassengerId,
  seatsDraft,
  onSelect,
}: {
  selectedPassengerId: string;
  seatsDraft:          SeatDraftEntry[];
  onSelect:            (seat: Seat) => void;
}) {
  const draftSeatIds = new Set(
    seatsDraft
      .filter((s) => s.passengerId !== selectedPassengerId)
      .map((s) => s.seatId)
  );
  const currentSeatId = seatsDraft.find((s) => s.passengerId === selectedPassengerId)?.seatId;

  // Show a subset: rows 1-3 (Preferred), 11-13 (Exit), 25-27 (Extra-legroom), 4-10 (Standard sample)
  const SHOWN_ROWS = [1,2,3,4,5,6,7,8,9,10,11,12,13,24,25,26,27,28,29,30];
  const visibleRows = MOCK_CABIN_SEAT_MAP.rows.filter((r) => SHOWN_ROWS.includes(r.rowNumber));

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[280px] space-y-1 p-2">
        {/* Legend */}
        <div className="mb-3 flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1 text-violet-400"><span className="h-2 w-2 rounded-sm bg-violet-900/40 border border-violet-700/60 inline-block" />Preferred +$25</span>
          <span className="flex items-center gap-1 text-amber-400"><span className="h-2 w-2 rounded-sm bg-amber-900/40 border border-amber-700/60 inline-block" />Exit row +$35</span>
          <span className="flex items-center gap-1 text-emerald-400"><span className="h-2 w-2 rounded-sm bg-emerald-900/40 border border-emerald-700/60 inline-block" />Extra legroom +$50</span>
          <span className="flex items-center gap-1 text-neutral-400"><span className="h-2 w-2 rounded-sm bg-neutral-900 border border-neutral-700 inline-block" />Standard</span>
        </div>

        {/* Column headers */}
        <div className="flex gap-1 pl-8 text-xs text-neutral-600">
          {MOCK_CABIN_SEAT_MAP.leftColumns.map((c) => (
            <div key={c} className="flex h-5 w-8 items-center justify-center">{c}</div>
          ))}
          <div className="w-4" />
          {MOCK_CABIN_SEAT_MAP.rightColumns.map((c) => (
            <div key={c} className="flex h-5 w-8 items-center justify-center">{c}</div>
          ))}
        </div>

        {visibleRows.map((row) => (
          <div key={row.rowNumber} className="flex items-center gap-1">
            <span className="w-7 text-right text-xs text-neutral-600">{row.rowNumber}</span>
            {MOCK_CABIN_SEAT_MAP.leftColumns.map((col) => {
              const seat = row.seats.find((s) => s.column === col)!;
              return (
                <SeatButton
                  key={seat.id}
                  seat={seat}
                  isCurrentPassenger={seat.id === currentSeatId}
                  isTakenByOther={draftSeatIds.has(seat.id)}
                  onClick={() => onSelect(seat)}
                />
              );
            })}
            <div className="w-4" />
            {MOCK_CABIN_SEAT_MAP.rightColumns.map((col) => {
              const seat = row.seats.find((s) => s.column === col)!;
              return (
                <SeatButton
                  key={seat.id}
                  seat={seat}
                  isCurrentPassenger={seat.id === currentSeatId}
                  isTakenByOther={draftSeatIds.has(seat.id)}
                  onClick={() => onSelect(seat)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main seat editor ────────────────────────────────────────────────────── */

interface SeatChangeEditorProps {
  booking:    StoredBooking;
  seatsDraft: SeatDraftEntry[];
  onUpdate:   (entry: SeatDraftEntry) => void;
}

export function SeatChangeEditor({ booking, seatsDraft, onUpdate }: SeatChangeEditorProps) {
  const passengers = booking.passengers.passengers;
  const [activePax, setActivePax] = useState<string>("0");

  function handleSeatSelect(seat: Seat) {
    const origEntry = booking.seats.selections.find((s) => s.passengerId === activePax)!;
    onUpdate({
      passengerId:    activePax,
      passengerLabel: origEntry.passengerLabel,
      seatId:         seat.id,
      seatLabel:      seat.label,
      price:          seat.price,
    });
  }

  return (
    <section aria-labelledby="seat-editor-heading" className="space-y-5">
      <div>
        <h2 id="seat-editor-heading" className="text-lg font-semibold text-white">
          Change seats
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Select a passenger, then choose a new seat. Changes apply only when you confirm on the Review step.
        </p>
      </div>

      {/* Conflict check */}
      {(() => {
        const ids = seatsDraft.map((s) => s.seatId);
        const hasDuplicate = ids.length !== new Set(ids).size;
        return hasDuplicate ? (
          <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-700/40 bg-red-900/20 px-4 py-3 text-sm text-red-300">
            <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Two passengers cannot share the same seat. Please choose different seats.
          </div>
        ) : null;
      })()}

      {/* Passenger list */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select passenger">
        {passengers.map((_, i) => {
          const id    = String(i);
          const draft = seatsDraft.find((s) => s.passengerId === id);
          const orig  = booking.seats.selections.find((s) => s.passengerId === id);
          const changed = draft && orig && draft.seatId !== orig.seatId;

          return (
            <button
              key={id}
              type="button"
              aria-pressed={activePax === id}
              onClick={() => setActivePax(id)}
              className={cn(
                "flex flex-col items-start rounded-xl border px-4 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
                activePax === id
                  ? "border-aether-600 bg-aether-900/30 text-aether-200"
                  : "border-neutral-800 bg-card text-neutral-400 hover:border-neutral-700"
              )}
            >
              <span className="font-medium">Passenger {i + 1}</span>
              <span className="text-xs text-neutral-500">
                {changed ? (
                  <><span className="line-through text-neutral-700">{orig!.seatLabel}</span>{" → "}<span className="text-aether-400">{draft!.seatLabel}</span></>
                ) : (
                  `Seat ${draft?.seatLabel ?? orig?.seatLabel ?? "—"}`
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Seat grid */}
      <div className="rounded-2xl border border-neutral-800 bg-card overflow-hidden">
        <div className="border-b border-neutral-800 px-4 py-2.5">
          <Typography variant="label-sm" color="muted">
            Selecting for Passenger {Number(activePax) + 1} · {passengers[Number(activePax)]?.firstName} {passengers[Number(activePax)]?.lastName}
          </Typography>
        </div>
        <SeatGrid
          selectedPassengerId={activePax}
          seatsDraft={seatsDraft}
          onSelect={handleSeatSelect}
        />
      </div>
    </section>
  );
}
