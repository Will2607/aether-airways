"use client";

import { Container } from "@/shared/layout/container";
import { Typography } from "@/shared/ui/typography";
import { useBookingSelection } from "@/features/booking/hooks/use-booking-selection";
import { usePassengerData } from "@/features/booking/hooks/use-passenger-data";
import { BookingProgress } from "./booking-progress";
import { BookingEmpty } from "./booking-empty";
import { PassengersForm } from "./passengers-form";

/**
 * /booking/passengers — route protection + layout.
 * Must be loaded via dynamic(ssr:false) — reads sessionStorage on mount.
 */
export function PassengersPage() {
  const { selection } = useBookingSelection();
  const { savedData }  = usePassengerData();

  if (!selection) return <BookingEmpty />;

  return (
    <>
      <BookingProgress currentStep="passengers" />

      <div className="min-h-screen bg-surface py-8 pb-16">
        <Container size="lg">
          <header className="mb-6">
            <Typography variant="heading-xl" as="h1">
              Passenger details
            </Typography>
            <Typography variant="body" color="secondary" className="mt-1">
              Enter the details exactly as they appear on each passenger&apos;s travel document.
            </Typography>
          </header>

          <PassengersForm selection={selection} savedData={savedData} />
        </Container>
      </div>
    </>
  );
}
