"use client";

import Link from "next/link";
import { Container } from "@/shared/layout/container";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { buttonVariants } from "@/shared/ui/button";
import { PlaneIcon, ChevronLeftIcon, UsersIcon } from "@/shared/icons";
import { useBookingSelection } from "@/features/booking/hooks/use-booking-selection";
import { usePassengerData } from "@/features/booking/hooks/use-passenger-data";
import { formatShortDate } from "@/features/flights/utils/flight.utils";
import { BookingProgress } from "./booking-progress";
import { BookingEmpty } from "./booking-empty";
import { BookingSummarySidebar } from "./booking-summary-sidebar";

/* ── Seat map placeholder ───────────────────────────────────────────────── */

function SeatMapPlaceholder() {
  const rows = Array.from({ length: 5 });
  const cols = ["A", "B", "C", "", "D", "E", "F"];

  return (
    <div
      className="relative rounded-2xl border border-neutral-800 bg-card p-6 overflow-hidden"
      aria-label="Seat map — coming soon"
      aria-hidden="true"
    >
      {/* Nose */}
      <div className="mx-auto mb-4 w-16 h-8 bg-neutral-800 rounded-t-full" />

      {/* Seat grid */}
      <div className="space-y-2 select-none pointer-events-none">
        {rows.map((_, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1.5">
            {cols.map((col, colIdx) =>
              col === "" ? (
                <div key={colIdx} className="w-7" aria-hidden="true" />
              ) : (
                <div
                  key={colIdx}
                  className="h-7 w-7 rounded-t-lg bg-neutral-700/60 border border-neutral-600/40 text-[9px] font-mono text-neutral-500 flex items-end justify-center pb-0.5"
                >
                  {col}
                </div>
              )
            )}
          </div>
        ))}
      </div>

      {/* Coming soon overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/80 backdrop-blur-sm rounded-2xl">
        <Badge variant="primary" size="sm" className="mb-3">Coming next phase</Badge>
        <Typography variant="heading-md" className="text-white text-center">
          Seat selection
        </Typography>
        <Typography variant="caption" color="muted" className="mt-1 text-center max-w-xs">
          Choose your preferred seat from an interactive cabin map.
        </Typography>
      </div>
    </div>
  );
}

/* ── Missing passengers state ───────────────────────────────────────────── */

function MissingPassengersState() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="mb-6 h-20 w-20 rounded-2xl bg-aether-900/40 border border-aether-800/40 flex items-center justify-center">
        <UsersIcon className="h-9 w-9 text-aether-400" aria-hidden="true" />
      </div>
      <Typography variant="heading-xl" as="h1" className="mb-3">
        Passenger details missing
      </Typography>
      <Typography variant="body" color="secondary" className="max-w-md mb-8">
        Please complete your passenger information before selecting seats.
      </Typography>
      <Link
        href="/booking/passengers"
        className={buttonVariants({ variant: "primary", size: "lg" })}
      >
        <UsersIcon className="h-4 w-4" aria-hidden="true" />
        Enter passenger details
      </Link>
    </section>
  );
}

/* ── Passenger summary list ─────────────────────────────────────────────── */

function PassengerSummary({ names }: { names: string[] }) {
  return (
    <div className="bg-card border border-neutral-800 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <UsersIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
        <Typography variant="label-lg" className="font-semibold text-white">
          Passengers
        </Typography>
      </div>
      <ul className="space-y-1.5">
        {names.map((name, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-aether-400 shrink-0" aria-hidden="true" />
            <Typography variant="body-sm" color="secondary">{name}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────────────────────── */

export function SeatsPage() {
  const { selection } = useBookingSelection();
  const { savedData } = usePassengerData();

  if (!selection) return <BookingEmpty />;
  if (!savedData)  return <MissingPassengersState />;

  const passengerNames = savedData.passengers.map(
    (p) => `${p.firstName} ${p.lastName}`.trim() || "—"
  );

  const firstLeg = selection.flight.legs[0]!;
  const lastLeg  = selection.flight.legs[selection.flight.legs.length - 1]!;

  return (
    <>
      <BookingProgress currentStep="seats" />

      <div className="min-h-screen bg-surface py-8 pb-16">
        <Container size="lg">
          {/* Header */}
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <PlaneIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
              <Typography variant="caption" color="secondary">
                {firstLeg.origin.code} → {lastLeg.destination.code} ·{" "}
                {formatShortDate(selection.searchContext.departureDate)}
              </Typography>
            </div>
            <Typography variant="heading-xl" as="h1">
              Choose your seats
            </Typography>
            <Typography variant="body" color="secondary" className="mt-1">
              Seat selection is coming in the next phase of development.
            </Typography>
          </header>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">

            {/* Left — seat map + back button */}
            <div className="space-y-4">
              <SeatMapPlaceholder />
              <PassengerSummary names={passengerNames} />

              <div className="flex gap-3 pt-2">
                <Button
                  variant="ghost" size="lg"
                  onClick={() => history.back()}
                >
                  <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                  Back
                </Button>

                <Button variant="primary" size="lg" disabled className="flex-1 lg:flex-none">
                  Continue to Payment
                </Button>
              </div>
            </div>

            {/* Right — booking summary */}
            <BookingSummarySidebar selection={selection} />
          </div>
        </Container>
      </div>
    </>
  );
}
