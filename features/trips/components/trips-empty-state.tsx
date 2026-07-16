import Link from "next/link";
import { PlaneTakeoffIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";

export function TripsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-neutral-800 px-8 py-16 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900"
        aria-hidden="true"
      >
        <PlaneTakeoffIcon className="h-7 w-7 text-neutral-600" />
      </div>

      <div className="space-y-1.5">
        <Typography variant="heading-md" className="text-white">
          No trips yet
        </Typography>
        <Typography variant="body" color="muted">
          Your confirmed bookings will appear here. Complete a reservation to see your trips.
        </Typography>
      </div>

      <Link href="/flights/search">
        <Button variant="primary" size="md">
          Search flights
        </Button>
      </Link>
    </div>
  );
}
