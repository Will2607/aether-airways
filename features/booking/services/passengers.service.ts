/**
 * Passengers service — encapsulates all sessionStorage access for
 * PassengerFormData. Components must never access sessionStorage directly.
 */

import type { PassengerFormData } from "@/features/booking/types";
import { PASSENGERS_STORAGE_KEY } from "@/features/booking/constants";

const isClient = typeof window !== "undefined";

function isValidPassengerFormData(val: unknown): val is PassengerFormData {
  if (!val || typeof val !== "object") return false;
  const d = val as Record<string, unknown>;
  return (
    typeof d.savedAt === "string" &&
    !!d.contact &&
    typeof (d.contact as Record<string, unknown>).email === "string" &&
    Array.isArray(d.passengers) &&
    d.passengers.length > 0
  );
}

export const passengersService = {
  save(data: PassengerFormData): void {
    if (!isClient) return;
    try {
      sessionStorage.setItem(PASSENGERS_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // sessionStorage unavailable (quota exceeded, private mode, etc.)
    }
  },

  get(): PassengerFormData | null {
    if (!isClient) return null;
    try {
      const raw = sessionStorage.getItem(PASSENGERS_STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return isValidPassengerFormData(parsed) ? parsed : null;
    } catch {
      return null;
    }
  },

  clear(): void {
    if (!isClient) return;
    try {
      sessionStorage.removeItem(PASSENGERS_STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
