"use client";
import { useState } from "react";
import { bookingsService } from "@/features/trips/services/bookings.service";
import type { StoredBooking } from "@/features/trips/types";

/** Returns all confirmed bookings stored in localStorage. */
export function useBookings(): { bookings: StoredBooking[] } {
  const [bookings] = useState<StoredBooking[]>(() => bookingsService.getAll());
  return { bookings };
}
