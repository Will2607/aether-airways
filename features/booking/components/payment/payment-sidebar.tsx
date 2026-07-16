import { PlaneIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { ExtrasPriceSummary } from "@/features/booking/components/extras/extras-price-summary";
import { formatShortDate } from "@/features/flights/utils/flight.utils";
import type {
  BookingSelection,
  SeatSelectionData,
  ExtrasSelectionData,
  BookingPriceSummary,
  ExtrasBreakdown,
} from "@/features/booking/types";

interface PaymentSidebarProps {
  selection:    BookingSelection;
  seatsData:    SeatSelectionData;
  extrasData:   ExtrasSelectionData | null;
  priceSummary: BookingPriceSummary;
  seatFees:     number;
  breakdown:    ExtrasBreakdown;
}

export function PaymentSidebar({
  selection,
  seatsData,
  extrasData,
  priceSummary,
  seatFees,
  breakdown,
}: PaymentSidebarProps) {
  const legs    = selection.flight.legs;
  const firstLeg = legs[0]!;
  const lastLeg  = legs[legs.length - 1]!;
  const ctx      = selection.searchContext;
  const seats    = seatsData.selections.map((s) => s.seatLabel).join(", ");
  const extrasCount =
    (extrasData?.selections ?? []).reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="space-y-4">
      {/* Compact booking overview */}
      <div className="rounded-2xl border border-neutral-800 bg-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <PlaneIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
          <Typography
            as="h2"
            variant="label-lg"
            className="font-semibold text-white"
          >
            Booking summary
          </Typography>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tabular-nums text-white">
            {firstLeg.origin.code}
          </span>
          <PlaneIcon className="h-4 w-4 text-neutral-500" aria-hidden="true" />
          <span className="text-2xl font-bold tabular-nums text-white">
            {lastLeg.destination.code}
          </span>
        </div>

        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Date</dt>
            <dd className="text-neutral-300">{formatShortDate(ctx.departureDate)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Cabin</dt>
            <dd className="capitalize text-neutral-300">{ctx.cabin.replace("-", " ")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Fare</dt>
            <dd className="text-neutral-300">{selection.fare.brand.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Passengers</dt>
            <dd className="text-neutral-300">{priceSummary.totalPassengers}</dd>
          </div>
          {seats && (
            <div className="flex justify-between">
              <dt className="text-neutral-500">Seats</dt>
              <dd className="text-neutral-300">{seats}</dd>
            </div>
          )}
          {extrasCount > 0 && (
            <div className="flex justify-between">
              <dt className="text-neutral-500">Extras</dt>
              <dd className="text-neutral-300">
                {extrasCount} item{extrasCount !== 1 ? "s" : ""}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Full price breakdown */}
      <ExtrasPriceSummary
        priceSummary={priceSummary}
        seatFees={seatFees}
        breakdown={breakdown}
      />
    </div>
  );
}
