import Link from "next/link";
import { AlertCircleIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";

interface TripNotFoundProps {
  bookingRef: string;
}

export function TripNotFound({ bookingRef }: TripNotFoundProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900"
        aria-hidden="true"
      >
        <AlertCircleIcon className="h-7 w-7 text-neutral-500" />
      </div>

      <div className="space-y-1.5">
        <Typography variant="heading-md" className="text-white">
          Trip not found
        </Typography>
        <Typography variant="body" color="muted">
          No booking with reference{" "}
          <span className="font-mono font-medium text-neutral-300">{bookingRef}</span>{" "}
          was found in this session.
        </Typography>
        <Typography variant="body-sm" color="muted" className="max-w-sm mx-auto">
          Bookings are stored locally in this browser. Clearing browser data or using a different
          device will not show previous bookings.
        </Typography>
      </div>

      <Link href="/my-trips">
        <Button variant="outline">Back to My Trips</Button>
      </Link>
    </div>
  );
}
