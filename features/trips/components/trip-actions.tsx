import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { CheckCircleIcon, PrinterIcon } from "@/shared/icons";

/**
 * Trip management actions.
 *
 * LIMITATION: Check-in and Manage Booking are disabled placeholders.
 * These features require backend integration (PNR lookup, airline API).
 */
export function TripActions() {
  return (
    <section aria-labelledby="trip-actions-heading" className="space-y-4">
      <Typography
        as="h2"
        id="trip-actions-heading"
        variant="label-lg"
        className="font-semibold text-white"
      >
        Manage your trip
      </Typography>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          disabled
          title="Online check-in is not available yet"
          aria-disabled="true"
        >
          <CheckCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Online check-in
          <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-xs">
            Coming soon
          </span>
        </Button>

        <Button
          variant="outline"
          disabled
          title="Booking management is not available yet"
          aria-disabled="true"
        >
          Manage booking
          <span className="ml-2 rounded-full bg-white/5 px-1.5 py-0.5 text-xs text-neutral-500">
            Coming soon
          </span>
        </Button>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-xl border border-neutral-700 px-4 py-2 text-sm
                     font-medium text-neutral-400 transition-colors hover:border-neutral-600
                     hover:text-white focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-aether-500"
        >
          <PrinterIcon className="h-4 w-4" aria-hidden="true" />
          Print itinerary
        </button>
      </div>

      <p className="text-xs text-neutral-600">
        Check-in and manage booking features require airline API integration (not implemented in this demo).
      </p>
    </section>
  );
}
