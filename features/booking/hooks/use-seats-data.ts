"use client";

import { useState } from "react";
import { seatsService } from "@/features/booking/services/seats.service";
import type { SeatSelectionData } from "@/features/booking/types";

/**
 * Reads persisted seat selection from sessionStorage once on client mount.
 * Uses a lazy initializer to avoid synchronous setState inside effects.
 */
export function useSeatsData(): { seatsData: SeatSelectionData | null } {
  const [seatsData] = useState<SeatSelectionData | null>(
    () => seatsService.get()
  );
  return { seatsData };
}
