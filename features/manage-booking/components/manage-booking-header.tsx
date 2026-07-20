import Link from "next/link";
import { ArrowLeftIcon, PlaneIcon } from "@/shared/icons";
import type { StoredBooking } from "@/features/trips/types";

interface ManageBookingHeaderProps {
  booking: StoredBooking;
}

export function ManageBookingHeader({ booking }: ManageBookingHeaderProps) {
  const firstLeg = booking.selection.flight.legs[0]!;

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-sm print:hidden">
      <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/my-trips/${booking.bookingRef}`}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors shrink-0"
          aria-label="Back to booking details"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">My booking</span>
        </Link>

        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <PlaneIcon className="h-4 w-4 shrink-0 text-aether-400" aria-hidden="true" />
          <span className="truncate text-sm font-medium text-neutral-300">
            {firstLeg.origin.code} → {firstLeg.destination.code}
          </span>
          <span className="hidden text-neutral-600 sm:inline" aria-hidden="true">·</span>
          <span className="hidden font-mono text-sm text-neutral-500 sm:inline">
            {booking.bookingRef}
          </span>
        </div>

        <span className="rounded-full border border-aether-700/40 bg-aether-900/30 px-3 py-0.5 text-xs font-medium text-aether-400 shrink-0">
          Manage booking
        </span>
      </div>
    </header>
  );
}
