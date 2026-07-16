"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { ArrowLeftIcon } from "@/shared/icons";
import { BookingProgress } from "@/features/booking/components/booking-progress";
import { useBookingSelection } from "@/features/booking/hooks/use-booking-selection";
import { usePassengerData }    from "@/features/booking/hooks/use-passenger-data";
import { useSeatsData } from "@/features/booking/hooks/use-seats-data";
import { useExtrasData } from "@/features/booking/hooks/use-extras-data";
import { computePriceSummary } from "@/features/booking/utils/booking.utils";
import { computeSeatFees } from "@/features/booking/utils/seat.utils";
import { computeExtrasBreakdown } from "@/features/booking/utils/extras.utils";
import { buildBookingConfirmation } from "@/features/booking/utils/booking-confirmation.utils";
import { processMockPayment } from "@/features/booking/services/payment.service";
import { confirmationService } from "@/features/booking/services/confirmation.service";
import { selectionService } from "@/features/booking/services/selection.service";
import { passengersService } from "@/features/booking/services/passengers.service";
import { seatsService } from "@/features/booking/services/seats.service";
import { extrasService } from "@/features/booking/services/extras.service";
import { bookingsService } from "@/features/trips/services/bookings.service";
import { ALL_EXTRAS } from "@/features/booking/mocks/extras.mock";
import { PaymentForm } from "@/features/booking/components/payment/payment-form";
import { PaymentSidebar } from "@/features/booking/components/payment/payment-sidebar";
import { PaymentStatusMessage } from "@/features/booking/components/payment/payment-status-message";
import type { PaymentFormValues } from "@/features/booking/schemas/payment-form.schema";

type PaymentStatus = "idle" | "processing" | "error";

interface MissingStepGuardProps {
  message: string;
  href:    string;
  label:   string;
}

function MissingStepGuard({ message, href, label }: MissingStepGuardProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <Typography variant="heading-md" className="text-white">{message}</Typography>
      <Link href={href}><Button variant="outline">{label}</Button></Link>
    </div>
  );
}

export function PaymentPage() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentError, setPaymentError]   = useState<string | null>(null);

  const { selection }    = useBookingSelection();
  const { savedData }    = usePassengerData();
  const { seatsData }    = useSeatsData();
  const { extrasData }   = useExtrasData();

  /* ── Guard states (all hooks called above) ──────────────────────────── */

  if (!selection) {
    return (
      <MissingStepGuard
        message="No flight selected."
        href="/flights/search"
        label="Search flights"
      />
    );
  }

  if (!savedData) {
    return (
      <MissingStepGuard
        message="Passenger information is missing."
        href="/booking/passengers"
        label="Go to passengers"
      />
    );
  }

  if (!seatsData || seatsData.selections.length === 0) {
    return (
      <MissingStepGuard
        message="Seat selection is incomplete."
        href="/booking/seats"
        label="Select seats"
      />
    );
  }

  /* ── Narrowed non-null refs (guards above ensure these are safe) ────── */
  const confirmedSelection = selection;
  const confirmedPassengers = savedData;
  const confirmedSeats = seatsData;

  /* ── Price computation ──────────────────────────────────────────────── */

  const priceSummary = computePriceSummary(confirmedSelection);
  const seatFees     = computeSeatFees(confirmedSeats.selections);
  const breakdown    = computeExtrasBreakdown(
    extrasData?.selections ?? [],
    ALL_EXTRAS
  );
  const grandTotal   = priceSummary.grandTotal + seatFees + breakdown.extrasTotal;
  const currency     = priceSummary.currency;

  /* ── Payment submit handler ─────────────────────────────────────────── */

  async function handlePaymentSubmit(data: PaymentFormValues) {
    setPaymentStatus("processing");
    setPaymentError(null);

    // Normalize card number (strip spaces) — full number never stored
    const normalizedCard = data.cardNumber.replace(/\s+/g, "");

    try {
      const result = await processMockPayment({
        normalizedCardNumber: normalizedCard,
        holderName:           data.cardHolder,
      });

      if (!result.success) {
        setPaymentStatus("error");
        setPaymentError(result.message);
        return;
      }

      // Build confirmation with SAFE payment summary only
      const confirmation = buildBookingConfirmation({
        selection:       confirmedSelection,
        passengers:      confirmedPassengers,
        seats:           confirmedSeats,
        extras:          extrasData,
        priceSummary,
        seatFees,
        extrasBreakdown: breakdown,
        grandTotal,
        currency,
        payment: {
          method:        "card",
          brand:         result.brand,
          last4:         result.last4,
          holder:        data.cardHolder,
          transactionId: result.transactionId,
        },
      });

      // Persist confirmation first (sessionStorage for /booking/confirmation page)
      confirmationService.save(confirmation);
      // Also persist to the trips collection (localStorage for /my-trips)
      bookingsService.save(confirmation);
      try {
        selectionService.clear();
        passengersService.clear();
        seatsService.clear();
        extrasService.clear();
      } catch {
        // Clean-up errors are non-critical; confirmation is already saved
      }

      router.push("/booking/confirmation");
    } catch {
      setPaymentStatus("error");
      setPaymentError("An unexpected error occurred. Please try again.");
    }
  }

  const isProcessing = paymentStatus === "processing";

  return (
    <div className="min-h-screen bg-surface">
      <BookingProgress currentStep="payment" />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Typography as="h1" variant="heading-xl" className="text-white">
            Payment
          </Typography>
          <Typography variant="body" color="muted" className="mt-1">
            Complete your purchase securely. Your booking will be confirmed immediately.
          </Typography>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: payment form + status */}
          <div className="space-y-5">
            <PaymentForm
              isProcessing={isProcessing}
              paymentError={paymentError}
              totalAmount={grandTotal}
              currency={currency}
              onSubmit={handlePaymentSubmit}
            />

            {(paymentStatus === "processing" || paymentStatus === "error") && (
              <PaymentStatusMessage
                status={paymentStatus}
                error={paymentError}
              />
            )}
          </div>

          {/* Right: booking overview + price breakdown */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PaymentSidebar
              selection={confirmedSelection}
              seatsData={confirmedSeats}
              extrasData={extrasData}
              priceSummary={priceSummary}
              seatFees={seatFees}
              breakdown={breakdown}
            />
          </div>
        </div>

        {/* Back navigation */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/booking/extras")}
            disabled={isProcessing}
            className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white
                       disabled:pointer-events-none disabled:opacity-50 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Back to Extras
          </button>
        </div>
      </div>
    </div>
  );
}
