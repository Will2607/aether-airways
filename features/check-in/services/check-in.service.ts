import { CHECKINS_STORAGE_KEY } from "@/features/check-in/constants";
import type { CheckInResult } from "@/features/check-in/types";

/**
 * Persists check-in results in localStorage keyed by booking reference.
 *
 * SECURITY: Boarding passes contain no document numbers, no payment data.
 * Only safe fields: passenger name (first/last), seat, gate, flight info.
 * LIMITATION: Client-only, not synced across devices.
 */

type CheckInCollection = Record<string, CheckInResult>;

function isClient(): boolean { return typeof window !== "undefined"; }

function isValidResult(raw: unknown): raw is CheckInResult {
  if (!raw || typeof raw !== "object") return false;
  const d = raw as Record<string, unknown>;
  return (
    typeof d.bookingRef    === "string" &&
    typeof d.checkedInAt   === "string" &&
    Array.isArray(d.boardingPasses)
  );
}

function readAll(): CheckInCollection {
  if (!isClient()) return {};
  try {
    const raw = localStorage.getItem(CHECKINS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const collection = parsed as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(collection).filter(([, v]) => isValidResult(v))
    ) as CheckInCollection;
  } catch {
    return {};
  }
}

function writeAll(collection: CheckInCollection): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(CHECKINS_STORAGE_KEY, JSON.stringify(collection));
  } catch {
    // Quota exceeded — fail silently
  }
}

export const checkInService = {
  getByRef(bookingRef: string): CheckInResult | null {
    const all = readAll();
    return all[bookingRef.toUpperCase()] ?? null;
  },

  getAll(): CheckInCollection {
    return readAll();
  },

  save(result: CheckInResult): void {
    const all = readAll();
    all[result.bookingRef.toUpperCase()] = result;
    writeAll(all);
  },

  clear(): void {
    if (!isClient()) return;
    try { localStorage.removeItem(CHECKINS_STORAGE_KEY); } catch { /* ignore */ }
  },
};
