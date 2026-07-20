import Link from "next/link";
import { PlaneIcon, ClockIcon, ArrowRightIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { cn } from "@/lib/utils";
import { FlightStatusBadge } from "./flight-status-badge";
import { formatTime, formatDate, formatDelay, urlSafeFlightNumber } from "@/features/flight-status/utils/flight-status.utils";
import type { FlightStatusRecord } from "@/features/flight-status/types";

interface FlightStatusCardProps {
  flight: FlightStatusRecord;
}

export function FlightStatusCard({ flight }: FlightStatusCardProps) {
  const isDelayed     = flight.delayMinutes > 0;
  const departureTime = formatTime(flight.scheduledDeparture);
  const arrivalTime   = formatTime(flight.scheduledArrival);
  const href          = `/flight-status/${urlSafeFlightNumber(flight.flightNumber)}`;

  return (
    <article
      className="rounded-2xl border border-neutral-800 bg-card p-5 transition-colors hover:border-neutral-700"
      aria-label={`Flight ${flight.flightNumber} from ${flight.origin.city} to ${flight.destination.city}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        {/* Flight number + status */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aether-900/40" aria-hidden="true">
            <PlaneIcon className="h-5 w-5 text-aether-400" />
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-white">{flight.flightNumber}</p>
            <p className="text-xs text-neutral-500">{flight.aircraft}</p>
          </div>
        </div>
        <FlightStatusBadge status={flight.status} />
      </div>

      {/* Route */}
      <div className="mt-4 flex items-center gap-2">
        <div className="text-center">
          <p className="text-2xl font-black text-white tabular-nums">{flight.origin.code}</p>
          <p className="text-xs text-neutral-500">{flight.origin.city}</p>
        </div>
        <ArrowRightIcon className="mx-2 h-4 w-4 shrink-0 text-neutral-600" aria-hidden="true" />
        <div className="text-center">
          <p className="text-2xl font-black text-white tabular-nums">{flight.destination.code}</p>
          <p className="text-xs text-neutral-500">{flight.destination.city}</p>
        </div>
        <p className="ml-auto text-xs text-neutral-600">{formatDate(flight.scheduledDeparture)}</p>
      </div>

      {/* Times */}
      <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-3 text-xs">
        <div>
          <p className="mb-0.5 text-neutral-500">Departure</p>
          <div className="flex items-baseline gap-1.5">
            <span className={cn("font-semibold tabular-nums", isDelayed ? "text-neutral-400 line-through" : "text-white")}>
              {departureTime}
            </span>
            {isDelayed && flight.estimatedDeparture && (
              <span className="font-semibold text-amber-400">{formatTime(flight.estimatedDeparture)}</span>
            )}
          </div>
        </div>
        <div>
          <p className="mb-0.5 text-neutral-500">Arrival</p>
          <p className="font-semibold tabular-nums text-white">{arrivalTime}</p>
        </div>
        <div>
          <p className="mb-0.5 text-neutral-500">Terminal · Gate</p>
          <p className="font-semibold text-white">{flight.departureTerminal} · {flight.departureGate}</p>
        </div>
        {isDelayed && (
          <div>
            <p className="mb-0.5 text-neutral-500">Delay</p>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-3 w-3 text-amber-400" aria-hidden="true" />
              <p className="font-semibold text-amber-400">+{formatDelay(flight.delayMinutes)}</p>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-4">
        <Link href={href} aria-label={`View details for flight ${flight.flightNumber}`}>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            View details
            <ArrowRightIcon className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
