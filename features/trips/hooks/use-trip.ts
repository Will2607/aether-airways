"use client";
import { useState } from "react";
import { bookingsService } from "@/features/trips/services/bookings.service";
import type { StoredBooking } from "@/features/trips/types";

/** Reads a single booking by its reference from localStorage. */
export function useTripByRef(bookingRef: string): { trip: StoredBooking | null } {
  const [trip] = useState<StoredBooking | null>(
    () => bookingsService.getByRef(bookingRef)
  );
  return { trip };
}
