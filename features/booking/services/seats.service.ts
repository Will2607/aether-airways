import { SEATS_STORAGE_KEY } from "@/features/booking/constants";
import type { SeatSelectionData } from "@/features/booking/types";

function isClient(): boolean {
  return typeof window !== "undefined";
}

function isValidSeatSelectionData(raw: unknown): raw is SeatSelectionData {
  if (!raw || typeof raw !== "object") return false;
  const d = raw as Record<string, unknown>;
  return (
    typeof d.savedAt === "string" &&
    Array.isArray(d.selections) &&
    typeof d.totalSeatFee === "number"
  );
}

export const seatsService = {
  save(data: SeatSelectionData): void {
    if (!isClient()) return;
    try {
      sessionStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Quota exceeded or private mode — fail silently
    }
  },

  get(): SeatSelectionData | null {
    if (!isClient()) return null;
    try {
      const raw = sessionStorage.getItem(SEATS_STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return isValidSeatSelectionData(parsed) ? parsed : null;
    } catch {
      return null;
    }
  },

  clear(): void {
    if (!isClient()) return;
    try {
      sessionStorage.removeItem(SEATS_STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
