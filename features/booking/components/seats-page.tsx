"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/shared/layout/container";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { AlertCircleIcon, ChevronLeftIcon } from "@/shared/icons";
import { useBookingSelection } from "@/features/booking/hooks/use-booking-selection";
import { usePassengerData }    from "@/features/booking/hooks/use-passenger-data";
import { seatsService }        from "@/features/booking/services/seats.service";
import { computePriceSummary } from "@/features/booking/utils/booking.utils";
import { computeSeatFees }     from "@/features/booking/utils/seat.utils";
import { MOCK_CABIN_SEAT_MAP } from "@/features/booking/mocks/seat-map.mock";
import { BookingProgress }           from "./booking-progress";
import { BookingEmpty }              from "./booking-empty";
import { SeatMap }                   from "./seat-map/seat-map";
import { SeatLegend }                from "./seat-map/seat-legend";
import { PassengerSeatSelector }     from "./passenger-seat-selector";
import { SeatDetailsPanel }          from "./seat-details-panel";
import { SeatsPriceSummary }         from "./seats-price-summary";
import type {
  Seat,
  PassengerSeatSelection,
  PassengerListItem,
  PassengerDetails,
} from "@/features/booking/types";

/* ── Missing passengers guard ───────────────────────────────────────────── */

function MissingPassengersState() {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <Typography variant="heading-xl" as="h1" className="mb-3">Passenger details missing</Typography>
      <Typography variant="body" color="secondary" className="max-w-md mb-8">
        Please complete passenger information before selecting seats.
      </Typography>
      <Button variant="primary" size="lg" onClick={() => router.push("/booking/passengers")}>
        Enter passenger details
      </Button>
    </section>
  );
}

/* ── Passenger label builder ─────────────────────────────────────────────── */

function buildPassengerList(passengers: PassengerDetails[]): PassengerListItem[] {
  const counts: Record<string, number> = {};
  return passengers.map((p, idx) => {
    const type = p.passengerType;
    counts[type] = (counts[type] ?? 0) + 1;
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    return {
      id:    String(idx),
      label: `${typeLabel} ${counts[type]}`,
      name:  `${p.firstName} ${p.lastName}`.trim() || "—",
    };
  });
}

/* ── Main page ──────────────────────────────────────────────────────────── */

export function SeatsPage() {
  const router              = useRouter();
  const { selection }       = useBookingSelection();
  const { savedData }       = usePassengerData();

  /* All hooks declared unconditionally — early returns come after */
  const [selections, setSelections]           = useState<PassengerSeatSelection[]>(
    () => seatsService.get()?.selections ?? []
  );
  const [activeIdx, setActiveIdx]             = useState(0);
  const [hoveredSeat, setHoveredSeat]         = useState<Seat | null>(null);
  const [validationError, setValidationError] = useState(false);

  /* Derived passenger list (empty when savedData is null — guarded below) */
  const passengerList: PassengerListItem[] = useMemo(
    () => (savedData ? buildPassengerList(savedData.passengers) : []),
    [savedData]
  );

  /* Persist to sessionStorage on every selections change */
  useEffect(() => {
    seatsService.save({
      savedAt:      new Date().toISOString(),
      selections,
      totalSeatFee: computeSeatFees(selections),
    });
  }, [selections]);

  /* ── Seat selection handler ─────────────────────────────────────────── */

  const handleSelectSeat = useCallback((seat: Seat) => {
    if (seat.status === "occupied" || seat.status === "blocked") return;
    setValidationError(false);

    setSelections((prev) => {
      const passengerId    = String(activeIdx);
      const pax            = passengerList[activeIdx];
      const passengerLabel = pax ? `${pax.label} — ${pax.name}` : `Passenger ${activeIdx + 1}`;
      const existing       = prev.find((s) => s.passengerId === passengerId);

      if (existing?.seatId === seat.id) {
        return prev.filter((s) => s.passengerId !== passengerId);
      }

      const filtered = prev.filter(
        (s) => s.passengerId !== passengerId && s.seatId !== seat.id
      );
      const next = [
        ...filtered,
        { passengerId, passengerLabel, seatId: seat.id, seatLabel: seat.label, price: seat.price },
      ];

      const assigned   = new Set(next.map((s) => s.passengerId));
      const nextIdx    = passengerList.findIndex((_, i) => !assigned.has(String(i)) && i !== activeIdx);
      if (nextIdx >= 0) setActiveIdx(nextIdx);

      return next;
    });
  }, [activeIdx, passengerList]);

  const handleClearSeat = useCallback((passengerId: string) => {
    setSelections((prev) => prev.filter((s) => s.passengerId !== passengerId));
  }, []);

  /* ── Guard renders (AFTER all hooks) ───────────────────────────────── */

  if (!selection) return <BookingEmpty />;
  if (!savedData)  return <MissingPassengersState />;

  const priceSummary = computePriceSummary(selection);

  /* ── Continue ───────────────────────────────────────────────────────── */

  function handleContinue() {
    const allAssigned = passengerList.every((p) =>
      selections.some((s) => s.passengerId === p.id)
    );
    if (!allAssigned) {
      setValidationError(true);
      const firstMissing = passengerList.findIndex(
        (p) => !selections.some((s) => s.passengerId === p.id)
      );
      if (firstMissing >= 0) setActiveIdx(firstMissing);
      return;
    }
    router.push("/booking/extras");
  }

  return (
    <>
      <BookingProgress currentStep="seats" />

      <div className="min-h-screen bg-surface py-8 pb-16">
        <Container size="lg">
          <header className="mb-6">
            <Typography variant="heading-xl" as="h1">Choose your seats</Typography>
            <Typography variant="body" color="secondary" className="mt-1">
              Select a seat for each passenger. Upgrade options are available.
            </Typography>
          </header>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">

            {/* ── Left column ─────────────────────────────────────────── */}
            <div className="space-y-4">
              <PassengerSeatSelector
                passengers={passengerList}
                selections={selections}
                activeIdx={activeIdx}
                onSelectPassenger={setActiveIdx}
                onClearSeat={handleClearSeat}
              />

              <SeatDetailsPanel seat={hoveredSeat} />

              <SeatMap
                cabinMap={MOCK_CABIN_SEAT_MAP}
                selections={selections}
                onSelectSeat={handleSelectSeat}
                onHoverSeat={setHoveredSeat}
              />

              <SeatLegend />

              {validationError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 px-4 py-3 bg-red-950/50 border border-red-800/50 rounded-xl"
                >
                  <AlertCircleIcon className="h-4 w-4 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <Typography variant="caption" className="text-red-300">
                    Every passenger must have a seat assigned before continuing.
                    Please select a seat for the highlighted passenger.
                  </Typography>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => router.push("/booking/passengers")}
                >
                  <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 lg:flex-none"
                  onClick={handleContinue}
                >
                  Continue to Extras
                </Button>
              </div>
            </div>

            {/* ── Right column ─────────────────────────────────────────── */}
            <SeatsPriceSummary summary={priceSummary} selections={selections} />
          </div>
        </Container>
      </div>
    </>
  );
}
