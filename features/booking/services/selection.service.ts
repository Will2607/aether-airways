/**
 * Selection service — encapsulates all access to sessionStorage for
 * BookingSelection. Components must never access sessionStorage directly.
 */

import type { BookingSelection } from "@/features/booking/types";
import { BOOKING_STORAGE_KEY } from "@/features/booking/constants";

const isClient = typeof window !== "undefined";

function isValidSelection(val: unknown): val is BookingSelection {
  if (!val || typeof val !== "object") return false;
  const s = val as Record<string, unknown>;
  return (
    typeof s.selectedAt === "string" &&
    !!s.flight &&
    typeof (s.flight as Record<string, unknown>).id === "string" &&
    !!s.fare &&
    typeof (s.fare as Record<string, unknown>).id === "string" &&
    !!s.searchContext
  );
}

export const selectionService = {
  /** Persist a selection. No-op outside the browser. */
  save(selection: BookingSelection): void {
    if (!isClient) return;
    try {
      sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(selection));
    } catch {
      // sessionStorage may be unavailable (private mode quotas, etc.)
    }
  },

  /** Read and validate the stored selection. Returns null if missing or corrupt. */
  get(): BookingSelection | null {
    if (!isClient) return null;
    try {
      const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return isValidSelection(parsed) ? parsed : null;
    } catch {
      return null;
    }
  },

  /** Remove the stored selection. */
  clear(): void {
    if (!isClient) return;
    try {
      sessionStorage.removeItem(BOOKING_STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
