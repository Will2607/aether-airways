"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkInService } from "@/features/check-in/services/check-in.service";
import { processCheckIn } from "@/features/check-in/utils/boarding-pass.utils";
import { PassengerCheckInList } from "./passenger-check-in-list";
import { TravelDeclarations } from "./travel-declarations";
import { CheckInStatusMessage } from "./check-in-status-message";
import type { StoredBooking } from "@/features/trips/types";

type FlowStep = "passengers" | "declarations" | "processing" | "error";

interface CheckInFlowProps {
  booking: StoredBooking;
}

export function CheckInFlow({ booking }: CheckInFlowProps) {
  const router = useRouter();

  // All passengers selected by default
  const [selectedIds, setSelectedIds] = useState<string[]>(
    () => booking.passengers.passengers.map((_, i) => String(i))
  );
  const [step, setStep]   = useState<FlowStep>("passengers");
  const [error, setError] = useState<string | null>(null);

  function togglePassenger(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function handlePassengersNext() {
    if (selectedIds.length === 0) return;
    setStep("declarations");
  }

  async function handleDeclarationsConfirm() {
    setStep("processing");
    setError(null);

    try {
      const result = await processCheckIn(
        { bookingRef: booking.bookingRef, selectedPassengers: selectedIds },
        booking
      );
      checkInService.save(result);
      router.push(`/check-in/${booking.bookingRef}`);
    } catch {
      setStep("error");
      setError("An unexpected error occurred during check-in. Your booking has not been changed.");
    }
  }

  if (step === "processing") {
    return <CheckInStatusMessage status="processing" />;
  }

  if (step === "error") {
    return (
      <CheckInStatusMessage
        status="error"
        error={error}
        onRetry={() => { setStep("declarations"); setError(null); }}
      />
    );
  }

  if (step === "declarations") {
    return (
      <TravelDeclarations
        onBack={() => setStep("passengers")}
        onConfirm={handleDeclarationsConfirm}
      />
    );
  }

  return (
    <PassengerCheckInList
      booking={booking}
      selectedIds={selectedIds}
      onToggle={togglePassenger}
      onNext={handlePassengersNext}
    />
  );
}
