"use client";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { BookingProgress } from "@/features/booking/components/booking-progress";
import { ItinerarySummary } from "@/features/booking/components/itinerary-summary";
import { ExtrasPriceSummary } from "@/features/booking/components/extras/extras-price-summary";
import { ConfirmationHeader } from "@/features/booking/components/confirmation/confirmation-header";
import { ConfirmationPassengers } from "@/features/booking/components/confirmation/confirmation-passengers";
import { ConfirmationExtras } from "@/features/booking/components/confirmation/confirmation-extras";
import { useConfirmation } from "@/features/booking/hooks/use-confirmation";
import { maskCardNumber, brandLabel } from "@/features/booking/utils/card.utils";
import { CreditCardIcon } from "@/shared/icons";

/* ── Empty state ─────────────────────────────────────────────────────────── */

function NoConfirmation() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <Typography variant="heading-md" className="text-white">
        No booking confirmation found.
      </Typography>
      <Typography variant="body" color="muted">
        This page requires a completed booking. Please start from the search.
      </Typography>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button variant="outline">Back to home</Button>
        </Link>
        <Link href="/flights/search">
          <Button variant="primary">Search flights</Button>
        </Link>
      </div>
    </div>
  );
}

/* ── Payment method row ──────────────────────────────────────────────────── */

function PaymentMethodSummary({ confirmation }: { confirmation: ReturnType<typeof useConfirmation>["confirmation"] }) {
  if (!confirmation) return null;
  const { payment } = confirmation;
  return (
    <section aria-labelledby="conf-payment-heading" className="space-y-3">
      <div className="flex items-center gap-2">
        <CreditCardIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
        <Typography
          as="h2"
          id="conf-payment-heading"
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
          Ref: {payment.transactionId}
        </p>
      </div>
    </section>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */

export function BookingConfirmationPage() {
  const { confirmation } = useConfirmation();

  if (!confirmation) {
    return (
      <div className="min-h-screen bg-surface">
        <BookingProgress currentStep="confirmation" />
        <NoConfirmation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface print:bg-white">
      <BookingProgress currentStep="confirmation" />

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Success header */}
        <ConfirmationHeader confirmation={confirmation} />

        <hr className="border-neutral-800" />

        {/* Itinerary — reuses existing component */}
        <section aria-labelledby="conf-itinerary-heading">
          <Typography
            as="h2"
            id="conf-itinerary-heading"
            variant="heading-sm"
            className="mb-4 text-white"
          >
            Your itinerary
          </Typography>
          <ItinerarySummary selection={confirmation.selection} />
        </section>

        <hr className="border-neutral-800" />

        {/* Passengers + seats */}
        <ConfirmationPassengers confirmation={confirmation} />

        <hr className="border-neutral-800" />

        {/* Extras */}
        <ConfirmationExtras confirmation={confirmation} />

        <hr className="border-neutral-800" />

        {/* Price breakdown */}
        <section aria-labelledby="conf-price-heading">
          <Typography
            as="h2"
            id="conf-price-heading"
            variant="heading-sm"
            className="mb-4 text-white"
          >
            Price breakdown
          </Typography>
          <ExtrasPriceSummary
            priceSummary={confirmation.priceSummary}
            seatFees={confirmation.seatFees}
            breakdown={confirmation.extrasBreakdown}
          />
        </section>

        <hr className="border-neutral-800" />

        {/* Payment method */}
        <PaymentMethodSummary confirmation={confirmation} />

        {/* Footer CTA */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link href={`/my-trips/${confirmation.bookingRef}`}>
            <Button variant="primary" size="lg">
              View my trip
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
