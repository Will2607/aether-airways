import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { FlightStatusCard } from "./flight-status-card";
import type { FlightStatusRecord } from "@/features/flight-status/types";

interface FlightStatusResultsProps {
  results:  FlightStatusRecord[];
  searched: boolean;
}

export function FlightStatusResults({ results, searched }: FlightStatusResultsProps) {
  if (!searched) return null;

  return (
    <section aria-label="Flight search results" aria-live="polite">
      {results.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800 bg-card px-6 py-10 text-center">
          <Typography variant="heading-sm" className="text-white">No flights found</Typography>
          <Typography variant="body-sm" color="muted" className="mt-2">
            No flights match your search for today. Try a different flight number or route.
          </Typography>
          <p className="mt-3 text-xs text-neutral-700">
            Demo note: only today&apos;s mock flights are available. Searching other dates returns no results.
          </p>
          <div className="mt-5">
            <Link href="/flight-status">
              <Button variant="outline" size="sm">Try another search</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Typography variant="label-sm" color="muted">
            {results.length === 1 ? "1 flight found" : `${results.length} flights found`}
          </Typography>
          <ul className="space-y-4" aria-label="Flight results">
            {results.map((f) => (
              <li key={f.flightNumber}>
                <FlightStatusCard flight={f} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
