"use client";
import { useState } from "react";
import { checkInService } from "@/features/check-in/services/check-in.service";
import type { CheckInResult } from "@/features/check-in/types";

/** Returns the check-in result for a given booking reference, or null. */
export function useCheckIn(bookingRef: string): { checkIn: CheckInResult | null } {
  const [checkIn] = useState<CheckInResult | null>(
    () => checkInService.getByRef(bookingRef)
  );
  return { checkIn };
}
