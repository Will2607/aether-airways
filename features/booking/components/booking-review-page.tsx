"use client";

import { Container } from "@/shared/layout/container";
import { Typography } from "@/shared/ui/typography";
import { useBookingSelection } from "@/features/booking/hooks/use-booking-selection";
import { computePriceSummary } from "@/features/booking/utils/booking.utils";
import { BookingProgress } from "./booking-progress";
import { ItinerarySummary } from "./itinerary-summary";
import { PriceSummary } from "./price-summary";
import { BookingEmpty } from "./booking-empty";

/**
 * Orchestrates the /booking/review page.
 *
 * Must be loaded via `dynamic(..., { ssr: false })` because:
 * 1. useBookingSelection reads from sessionStorage (client-only).
 * 2. Skipping SSR avoids hydration mismatches between server (null) and
 *    client (real selection from sessionStorage).
 */
export function BookingReviewPage() {
  const { selection } = useBookingSelection();

  if (!selection) return <BookingEmpty />;

  const summary = computePriceSummary(selection);

  return (
    <>
      <BookingProgress currentStep="review" />

      <div className="min-h-screen bg-surface py-8 pb-16">
        <Container size="lg">
          <header className="mb-6">
            <Typography variant="heading-xl" as="h1">
              Review your itinerary
            </Typography>
            <Typography variant="body" color="secondary" className="mt-1">
              Check your flight details and fare before continuing.
            </Typography>
          </header>

          <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
            <ItinerarySummary selection={selection} />
            <PriceSummary summary={summary} fare={selection.fare} />
          </div>
        </Container>
      </div>
    </>
  );
}
