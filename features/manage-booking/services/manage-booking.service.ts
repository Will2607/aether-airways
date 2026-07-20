import {
  MODIFICATIONS_STORAGE_KEY,
  MOCK_MODIFICATION_LATENCY_MS,
} from "@/features/manage-booking/constants";
import type {
  BookingChangeSet,
  BookingModificationRecord,
  ManageBookingResult,
} from "@/features/manage-booking/types";

/**
 * Manage Booking service.
 *
 * LIMITATION: No backend integration. The modification is applied
 * locally to localStorage only. modificationId is deterministic.
 * No real PNR changes occur. No money is charged or refunded.
 */

/* ── ID generation (deterministic, no Math.random) ───────────────────────── */

function generateModificationId(bookingRef: string, now: string): string {
  const ts = now.replace(/[^0-9]/g, "").slice(0, 14);
  return `MOD-${bookingRef}-${ts}`;
}

/* ── localStorage persistence ────────────────────────────────────────────── */

type ModificationCollection = Record<string, BookingModificationRecord[]>;

function isClient(): boolean { return typeof window !== "undefined"; }

function readAll(): ModificationCollection {
  if (!isClient()) return {};
  try {
    const raw = localStorage.getItem(MODIFICATIONS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as ModificationCollection;
  } catch {
    return {};
  }
}

function writeAll(data: ModificationCollection): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(MODIFICATIONS_STORAGE_KEY, JSON.stringify(data));
  } catch { /* quota exceeded */ }
}

export const modificationService = {
  /** Append a modification record. Does not remove existing records. */
  save(record: BookingModificationRecord): void {
    const all = readAll();
    const existing = all[record.bookingRef] ?? [];
    all[record.bookingRef] = [...existing, record];
    writeAll(all);
  },

  /** Returns all modification records for a booking reference. */
  getByRef(bookingRef: string): BookingModificationRecord[] {
    return readAll()[bookingRef.toUpperCase()] ?? [];
  },

  getAll(): ModificationCollection {
    return readAll();
  },
};

/* ── Mock processing ─────────────────────────────────────────────────────── */

/**
 * Simulates sending the change set to an airline system.
 * Always succeeds (deterministic). Latency is fixed, not random.
 *
 * In production this would call an airline API / PNR system.
 */
export async function processBookingModification(
  changeSet: BookingChangeSet
): Promise<ManageBookingResult> {
  await new Promise<void>((resolve) =>
    setTimeout(resolve, MOCK_MODIFICATION_LATENCY_MS)
  );

  const modificationId = generateModificationId(
    changeSet.bookingRef,
    changeSet.changes[0]?.createdAt ?? new Date().toISOString()
  );

  return { success: true, modificationId };
}
