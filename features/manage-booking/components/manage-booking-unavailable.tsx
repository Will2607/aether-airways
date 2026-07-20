import Link from "next/link";
import { AlertCircleIcon, ArrowLeftIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";

interface ManageBookingUnavailableProps {
  /** Title shown as heading. */
  title?:        string;
  reason:        string;
  bookingRef?:   string;
  /** If true, renders as an inline section block (not full page). */
  inline?:       boolean;
}

export function ManageBookingUnavailable({
  title   = "Modification not available",
  reason,
  bookingRef,
  inline  = false,
}: ManageBookingUnavailableProps) {
  const content = (
    <div className="flex flex-col items-center gap-5 py-10 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900"
        aria-hidden="true"
      >
        <AlertCircleIcon className="h-7 w-7 text-neutral-500" />
      </div>
      <div className="space-y-2">
        <Typography variant="heading-sm" className="text-white">{title}</Typography>
        <Typography variant="body-sm" color="muted" className="max-w-sm">
          {reason}
        </Typography>
      </div>
      {bookingRef && (
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`/my-trips/${bookingRef}`}>
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Back to booking
            </Button>
          </Link>
          <Link href="/my-trips">
            <Button variant="ghost" size="sm">My Trips</Button>
          </Link>
        </div>
      )}
    </div>
  );

  if (inline) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-card px-6 py-6">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-card px-6">
          {content}
        </div>
      </div>
    </div>
  );
}
