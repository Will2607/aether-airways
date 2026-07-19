"use client";
import { CreditCardIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { ItinerarySummary } from "@/features/booking/components/itinerary-summary";
import { ExtrasPriceSummary } from "@/features/booking/components/extras/extras-price-summary";
import { maskCardNumber, brandLabel } from "@/features/booking/utils/card.utils";
import { useTripByRef } from "@/features/trips/hooks/use-trip";
import { TripDetailsHeader } from "@/features/trips/components/trip-details-header";
import { PassengersSummary } from "@/features/trips/components/passengers-summary";
import { ExtrasSummary } from "@/features/trips/components/extras-summary";
import { TripActions } from "@/features/trips/components/trip-actions";
import { TripNotFound } from "@/features/trips/components/trip-not-found";
import { useCheckIn } from "@/features/check-in/hooks/use-check-in";

interface TripDetailsPageProps {
  bookingRef: string;
}

export function TripDetailsPage({ bookingRef }: TripDetailsPageProps) {
  const { trip }    = useTripByRef(bookingRef);
  const { checkIn } = useCheckIn(bookingRef);

  if (!trip) {
    return (
      <div className="min-h-screen bg-surface">
        <TripNotFound bookingRef={bookingRef} />
      </div>
    );
  }

  const { payment } = trip;

  return (
    <div className="min-h-screen bg-surface print:bg-white">
      {/* Sticky header */}
      <TripDetailsHeader trip={trip} />

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* Itinerary */}
        <section aria-labelledby="trip-itinerary-heading">
          <Typography
            as="h2"
            id="trip-itinerary-heading"
            variant="heading-sm"
            className="mb-4 text-white"
          >
            Itinerary
          </Typography>
          <ItinerarySummary selection={trip.selection} />
        </section>

        <hr className="border-neutral-800" />

        {/* Passengers */}
        <PassengersSummary passengers={trip.passengers} seats={trip.seats} />

        <hr className="border-neutral-800" />

        {/* Extras */}
        <ExtrasSummary extras={trip.extras} currency={trip.currency} />

        <hr className="border-neutral-800" />

        {/* Price breakdown */}
        <section aria-labelledby="trip-price-heading">
          <Typography
            as="h2"
            id="trip-price-heading"
            variant="heading-sm"
            className="mb-4 text-white"
          >
            Price breakdown
          </Typography>
          <ExtrasPriceSummary
            priceSummary={trip.priceSummary}
            seatFees={trip.seatFees}
            breakdown={trip.extrasBreakdown}
          />
        </section>

        <hr className="border-neutral-800" />

        {/* Payment method */}
        <section aria-labelledby="trip-payment-heading" className="space-y-3">
          <div className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
            <Typography
              as="h2"
              id="trip-payment-heading"
              variant="label-lg"
              className="font-semibold text-white"
            >
              Payment
            </Typography>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-3">
            <CreditCardIcon className="h-5 w-5 shrink-0 text-neutral-400" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-neutral-200">
                {brandLabel(payment.brand)} · {maskCardNumber(payment.last4)}
              </p>
              <p className="text-xs text-neutral-500">{payment.holder}</p>
            </div>
            <p className="ml-auto text-xs text-neutral-600">
              {payment.transactionId}
            </p>
          </div>
        </section>

        <hr className="border-neutral-800" />

        {/* Actions */}
        <TripActions trip={trip} checkIn={checkIn} />
      </div>
    </div>
  );
}
