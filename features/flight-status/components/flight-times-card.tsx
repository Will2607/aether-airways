import { cn } from "@/lib/utils";
import { Typography } from "@/shared/ui/typography";
import { formatTime } from "@/features/flight-status/utils/flight-status.utils";
import type { FlightStatusRecord } from "@/features/flight-status/types";

function TimeCell({
  scheduled,
  estimated,
  actual,
  isDelayed,
}: {
  scheduled:  string;
  estimated?: string;
  actual?:    string;
  isDelayed?: boolean;
}) {
  const displayActual    = actual    ? formatTime(actual)    : null;
  const displayEstimated = estimated ? formatTime(estimated) : null;
  const displayScheduled = formatTime(scheduled);

  return (
    <td className="px-4 py-3 text-right">
      {/* Scheduled — always shown, strikethrough if delayed */}
      <p className={cn("font-mono text-sm tabular-nums", isDelayed && !actual ? "text-neutral-500 line-through" : "text-white")}>
        {displayScheduled}
      </p>
      {/* Estimated — shown when delayed and not yet actual */}
      {displayEstimated && !displayActual && (
        <p className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-amber-400">
          {displayEstimated}
        </p>
      )}
      {/* Actual — shown when event occurred */}
      {displayActual && (
        <p className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-emerald-400">
          {displayActual}
        </p>
      )}
    </td>
  );
}

interface FlightTimesCardProps {
  flight: FlightStatusRecord;
}

export function FlightTimesCard({ flight }: FlightTimesCardProps) {
  const isDelayed = flight.delayMinutes > 0;

  return (
    <section aria-labelledby="flight-times-heading" className="rounded-2xl border border-neutral-800 bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-800">
        <Typography as="h3" id="flight-times-heading" variant="label-lg" className="font-semibold text-white">
          Flight times
        </Typography>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-neutral-800">
              <th scope="col" className="px-5 py-2.5 text-left text-xs font-medium text-neutral-500">
                Event
              </th>
              <th scope="col" className="px-4 py-2.5 text-right text-xs font-medium text-neutral-500">
                Scheduled
              </th>
              <th scope="col" className="px-4 py-2.5 text-right text-xs font-medium text-amber-600">
                Estimated
              </th>
              <th scope="col" className="px-4 py-2.5 text-right text-xs font-medium text-emerald-600">
                Actual
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            <tr>
              <th scope="row" className="px-5 py-3 text-left">
                <p className="text-sm font-medium text-neutral-200">Departure</p>
                <p className="text-xs text-neutral-500">{flight.origin.code} — {flight.departureTerminal} · {flight.departureGate}</p>
              </th>
              <TimeCell
                scheduled={flight.scheduledDeparture}
                estimated={flight.estimatedDeparture}
                actual={flight.actualDeparture}
                isDelayed={isDelayed}
              />
              <td className="px-4 py-3 text-right">
                {flight.estimatedDeparture && !flight.actualDeparture ? (
                  <p className="font-mono text-xs font-semibold tabular-nums text-amber-400">
                    {formatTime(flight.estimatedDeparture)}
                  </p>
                ) : <p className="text-xs text-neutral-700">—</p>}
              </td>
              <td className="px-4 py-3 text-right">
                {flight.actualDeparture ? (
                  <p className="font-mono text-xs font-semibold tabular-nums text-emerald-400">
                    {formatTime(flight.actualDeparture)}
                  </p>
                ) : <p className="text-xs text-neutral-700">—</p>}
              </td>
            </tr>
            <tr>
              <th scope="row" className="px-5 py-3 text-left">
                <p className="text-sm font-medium text-neutral-200">Arrival</p>
                <p className="text-xs text-neutral-500">
                  {flight.destination.code}
                  {flight.arrivalTerminal && ` — ${flight.arrivalTerminal}`}
                  {flight.baggageClaim && ` · Belt ${flight.baggageClaim}`}
                </p>
              </th>
              <TimeCell
                scheduled={flight.scheduledArrival}
                estimated={flight.estimatedArrival}
                actual={flight.actualArrival}
                isDelayed={isDelayed}
              />
              <td className="px-4 py-3 text-right">
                {flight.estimatedArrival && !flight.actualArrival ? (
                  <p className="font-mono text-xs font-semibold tabular-nums text-amber-400">
                    {formatTime(flight.estimatedArrival)}
                  </p>
                ) : <p className="text-xs text-neutral-700">—</p>}
              </td>
              <td className="px-4 py-3 text-right">
                {flight.actualArrival ? (
                  <p className="font-mono text-xs font-semibold tabular-nums text-emerald-400">
                    {formatTime(flight.actualArrival)}
                  </p>
                ) : <p className="text-xs text-neutral-700">—</p>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 border-t border-neutral-800 px-5 py-3 text-xs">
        <span className="text-neutral-500">Scheduled: original time</span>
        <span className="text-amber-500">Estimated: updated forecast</span>
        <span className="text-emerald-500">Actual: confirmed time</span>
      </div>
    </section>
  );
}
