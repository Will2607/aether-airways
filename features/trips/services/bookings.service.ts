import { BOOKINGS_STORAGE_KEY } from "@/features/trips/constants";
import type { StoredBooking } from "@/features/trips/types";

/**
 * Persists confirmed bookings in localStorage.
 *
 * SECURITY: Only SafePaymentSummary (brand, last4, holder) is stored — no full card number or CVC.
 * LIMITATION: localStorage is client-only and not synced across devices or browsers.
 *             In production, bookings would be fetched from an authenticated API.
 */

function isClient(): boolean {
  return typeof window !== "undefined";
}

function isValidBooking(raw: unknown): raw is StoredBooking {
  if (!raw || typeof raw !== "object") return false;
  const d = raw as Record<string, unknown>;
  return (
    typeof d.bookingRef  === "string" &&
    typeof d.confirmedAt === "string" &&
    (d.status === "confirmed" || d.status === "cancelled") &&
    typeof d.selection   === "object" && d.selection !== null &&
    typeof d.passengers  === "object" && d.passengers !== null &&
    typeof d.seats       === "object" && d.seats !== null &&
    typeof d.grandTotal  === "number" &&
    typeof d.payment     === "object" && d.payment !== null
  );
}

function readAll(): StoredBooking[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidBooking);
  } catch {
    return [];
  }
}

function writeAll(bookings: StoredBooking[]): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // Quota exceeded — fail silently
  }
}

export const bookingsService = {
  getAll(): StoredBooking[] {
    return readAll();
  },

  getByRef(bookingRef: string): StoredBooking | null {
    const bookings = readAll();
    return bookings.find((b) => b.bookingRef === bookingRef.toUpperCase()) ?? null;
  },

  /**
   * Adds a booking to the collection, avoiding duplicates by bookingRef.
   * New bookings are prepended (most recent first).
   */
  save(booking: StoredBooking): void {
    const bookings = readAll();
    const existing = bookings.findIndex((b) => b.bookingRef === booking.bookingRef);
    if (existing >= 0) {
      // Update in place if already exists
      bookings[existing] = booking;
      writeAll(bookings);
    } else {
      writeAll([booking, ...bookings]);
    }
  },

  clear(): void {
    if (!isClient()) return;
    try {
      localStorage.removeItem(BOOKINGS_STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};
