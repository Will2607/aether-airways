"use client";

import { useState } from "react";
import { extrasService } from "@/features/booking/services/extras.service";
import type { ExtrasSelectionData } from "@/features/booking/types";

/**
 * Reads persisted extras selection from sessionStorage once on client mount.
 * Returns null when no extras have been saved (extras are optional).
 */
export function useExtrasData(): { extrasData: ExtrasSelectionData | null } {
  const [extrasData] = useState<ExtrasSelectionData | null>(
    () => extrasService.get()
  );
  return { extrasData };
}
