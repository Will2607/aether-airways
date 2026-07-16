import { CONFIRMATION_STORAGE_KEY } from "@/features/booking/constants";
import type { BookingConfirmation } from "@/features/booking/types";

function isClient(): boolean {
  return typeof window !== "undefined";
}

function isValid(raw: unknown): raw is BookingConfirmation {
  if (!raw || typeof raw !== "object") return false;
  const d = raw as Record<string, unknown>;
  return (
    typeof d.bookingRef  === "string" &&
    typeof d.confirmedAt === "string" &&
    d.status             === "confirmed" &&
    typeof d.selection   === "object" && d.selection !== null &&
    typeof d.passengers  === "object" && d.passengers !== null &&
    typeof d.seats       === "object" && d.seats !== null &&
    typeof d.grandTotal  === "number" &&
    typeof d.payment     === "object" && d.payment !== null
  );
}

export const confirmationService = {
  save(data: BookingConfirmation): void {
    if (!isClient()) return;
    try {
      sessionStorage.setItem(CONFIRMATION_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Quota exceeded or private browsing — fail silently
    }
  },

  get(): BookingConfirmation | null {
    if (!isClient()) return null;
    try {
      const raw = sessionStorage.getItem(CONFIRMATION_STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      return isValid(parsed) ? parsed : null;
    } catch {
      return null;
    }
  },

  clear(): void {
    if (!isClient()) return;
    try {
      sessionStorage.removeItem(CONFIRMATION_STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
