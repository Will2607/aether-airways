"use client";

/**
 * Reads previously saved passenger form data from sessionStorage.
 * Uses useState lazy initializer — same pattern as useBookingSelection.
 * Safe because this hook is only used inside components loaded with ssr:false.
 */

import { useState } from "react";
import { passengersService } from "@/features/booking/services/passengers.service";
import type { PassengerFormData } from "@/features/booking/types";

export function usePassengerData(): { savedData: PassengerFormData | null } {
  const [savedData] = useState<PassengerFormData | null>(
    () => passengersService.get()
  );
  return { savedData };
}
