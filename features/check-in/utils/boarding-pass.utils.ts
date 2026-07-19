import { BOARDING_STARTS_MINUTES_BEFORE } from "@/features/check-in/constants";
import type { BoardingPass, BoardingGroup, CheckInRequest, CheckInResult } from "@/features/check-in/types";
import type { StoredBooking } from "@/features/trips/types";

/* ── Deterministic helpers (no Math.random) ──────────────────────────────── */

function charSum(str: string): number {
  return str.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

function deterministicPick<T>(arr: readonly T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length]!;
}

const GATES:      readonly string[]       = ["A12","A18","B06","B14","C08","C21","D03","D17","E01","E09"];
const TERMINALS:  readonly string[]       = ["T1", "T2", "T3"];
const GROUPS:     readonly BoardingGroup[] = ["A", "B", "C", "D"];

/* ── Time helpers ────────────────────────────────────────────────────────── */

/**
 * Extracts "HH:MM" from an ISO date string or plain "HH:MM" string.
 * Handles both "2026-08-15T07:30:00Z" and "07:30" formats.
 */
function extractHHMM(isoOrTime: string): string {
  if (isoOrTime.includes("T")) {
    const d = new Date(isoOrTime);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  return isoOrTime.slice(0, 5);
}

function computeBoardingTime(departureIso: string): string {
  const d = new Date(departureIso);
  if (isNaN(d.getTime())) {
    // Fallback: treat as plain "HH:MM"
    const [hStr, mStr] = departureIso.split(":");
    const totalMin = parseInt(hStr ?? "0", 10) * 60 + parseInt(mStr ?? "0", 10) - BOARDING_STARTS_MINUTES_BEFORE;
    const h = Math.max(0, Math.floor(totalMin / 60));
    const m = ((totalMin % 60) + 60) % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
  const boardingMs = d.getTime() - BOARDING_STARTS_MINUTES_BEFORE * 60 * 1000;
  const bd = new Date(boardingMs);
  return `${String(bd.getHours()).padStart(2, "0")}:${String(bd.getMinutes()).padStart(2, "0")}`;
}

/* ── Boarding pass generation ────────────────────────────────────────────── */

export function generateBoardingPass(
  booking:        StoredBooking,
  passengerId:    string,
  sequenceNumber: number
): BoardingPass {
  const firstLeg    = booking.selection.flight.legs[0]!;
  const paxIdx      = Number(passengerId);
  const passenger   = booking.passengers.passengers[paxIdx]!;
  const seatEntry   = booking.seats.selections.find((s) => s.passengerId === passengerId);

  const refSeed  = charSum(booking.bookingRef);
  const paxSeed  = refSeed + paxIdx;

  const gate      = deterministicPick(GATES, paxSeed);
  const terminal  = deterministicPick(TERMINALS, refSeed);
  const group     = deterministicPick(GROUPS, paxIdx);

  // Passenger name in airline format: LASTNAME/FIRSTNAME — no document data
  const passengerName = `${passenger.lastName.toUpperCase()}/${passenger.firstName.toUpperCase()}`;

  // Barcode: deterministic mock, no sensitive data encoded
  const seat = seatEntry?.seatLabel ?? "—";
  const barcodeValue = `AE${booking.bookingRef}P${passengerId}${seat.replace(/\s/g, "")}`;

  return {
    bookingReference: booking.bookingRef,
    passengerId,
    passengerName,
    flightNumber:     firstLeg.flightNumber,
    origin:           firstLeg.origin.code,
    destination:      firstLeg.destination.code,
    originCity:       firstLeg.origin.city,
    destinationCity:  firstLeg.destination.city,
    departureDate:    booking.selection.searchContext.departureDate,
    boardingTime:     computeBoardingTime(firstLeg.departureAt),
    departureTime:    extractHHMM(firstLeg.departureAt),
    gate,
    terminal,
    seat,
    boardingGroup:    group,
    sequenceNumber,
    barcodeValue,
    checkedInAt:      new Date().toISOString(),
    status:           "confirmed",
  };
}

/* ── Mock processing ─────────────────────────────────────────────────────── */

const MOCK_LATENCY_MS = 1500;

/**
 * Simulates the check-in processing with a fixed latency.
 * Generates deterministic boarding passes. No Math.random() used.
 *
 * LIMITATION: No airline PNR integration. Boarding passes are visual mocks only.
 */
export async function processCheckIn(
  request: CheckInRequest,
  booking:  StoredBooking
): Promise<CheckInResult> {
  await new Promise<void>((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

  const boardingPasses = request.selectedPassengers.map((pid, idx) =>
    generateBoardingPass(booking, pid, idx + 1)
  );

  return {
    bookingRef:     booking.bookingRef,
    checkedInAt:    new Date().toISOString(),
    boardingPasses,
  };
}
