import Link from "next/link";
import { AlertCircleIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";

interface FlightStatusNotFoundProps {
  flightNumber?: string;
}

export function FlightStatusNotFound({ flightNumber }: FlightStatusNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-neutral-800 bg-card px-6 py-14 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900"
        aria-hidden="true"
      >
        <AlertCircleIcon className="h-7 w-7 text-neutral-500" />
      </div>
      <div className="space-y-2">
        <Typography variant="heading-sm" className="text-white">Flight not found</Typography>
        {flightNumber ? (
          <Typography variant="body-sm" color="muted">
            No flight matching{" "}
            <span className="font-mono font-medium text-neutral-300">{flightNumber}</span>{" "}
            was found in today&apos;s schedule.
          </Typography>
        ) : (
          <Typography variant="body-sm" color="muted">
            This flight number does not match any flight in today&apos;s schedule.
          </Typography>
        )}
        <p className="text-xs text-neutral-700">
          Demo: only AE 201, AE 211, AE 305, AE 412, AE 501, AE 607, and AE 999 are available.
        </p>
      </div>
      <Link href="/flight-status">
        <Button variant="outline">Search another flight</Button>
      </Link>
    </div>
  );
}
