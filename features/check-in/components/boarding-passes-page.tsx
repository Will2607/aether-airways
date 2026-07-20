"use client";
import Link from "next/link";
import { CheckCircleIcon, PrinterIcon, ArrowLeftIcon, PlaneIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { useCheckIn } from "@/features/check-in/hooks/use-check-in";
import { BoardingPassCard } from "@/features/check-in/components/boarding-pass-card";
import { urlSafeFlightNumber } from "@/features/flight-status/utils/flight-status.utils";

interface BoardingPassesPageProps {
  bookingRef: string;
}

function NotFound({ bookingRef }: { bookingRef: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <Typography variant="heading-md" className="text-white">Check-in not found</Typography>
      <Typography variant="body" color="muted">
        No check-in record for{" "}
        <span className="font-mono font-medium text-neutral-300">{bookingRef}</span>.
      </Typography>
      <div className="flex gap-3">
        <Link href="/check-in">
          <Button variant="primary">Check in now</Button>
        </Link>
        <Link href="/my-trips">
          <Button variant="outline">My Trips</Button>
        </Link>
      </div>
    </div>
  );
}

export function BoardingPassesPage({ bookingRef }: BoardingPassesPageProps) {
  const { checkIn } = useCheckIn(bookingRef);

  if (!checkIn) {
    return (
      <div className="min-h-screen bg-surface">
        <NotFound bookingRef={bookingRef} />
      </div>
    );
  }

  const passengerCount = checkIn.boardingPasses.length;
  const firstPass      = checkIn.boardingPasses[0]!;

  return (
    <div className="min-h-screen bg-surface print:bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center space-y-3">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20"
            aria-hidden="true"
          >
            <CheckCircleIcon className="h-7 w-7 text-emerald-400" />
          </div>
          <Typography as="h1" variant="heading-xl" className="text-white">
            Check-in complete!
          </Typography>
          <Typography variant="body" color="muted">
            {passengerCount === 1 ? "Your boarding pass is ready." : `${passengerCount} boarding passes are ready.`}
          </Typography>

          {/* Flight summary chip */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-card px-4 py-1.5 text-sm text-neutral-300">
            <PlaneIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
            {firstPass.origin} → {firstPass.destination} ·{" "}
            {new Date(firstPass.departureDate + "T12:00:00").toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500"
          >
            <PrinterIcon className="h-4 w-4" aria-hidden="true" />
            Print boarding passes
          </button>
          {firstPass && (
            <Link href={`/flight-status/${urlSafeFlightNumber(firstPass.flightNumber)}`}>
              <Button variant="outline" size="sm">
                <PlaneIcon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                View flight status
              </Button>
            </Link>
          )}
          <Link href={`/my-trips/${bookingRef}`}>
            <Button variant="outline" size="sm">View trip</Button>
          </Link>
          <Link href="/my-trips">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              My Trips
            </Button>
          </Link>
        </div>

        {/* Boarding passes */}
        <div className="space-y-6" aria-label="Boarding passes">
          {checkIn.boardingPasses.map((pass) => (
            <BoardingPassCard key={`${pass.passengerId}`} pass={pass} />
          ))}
        </div>

        {/* Limitation note */}
        <p className="mt-8 text-center text-xs text-neutral-700 print:hidden">
          These boarding passes are mock documents for demo purposes only and are not valid for travel.
        </p>
      </div>
    </div>
  );
}
