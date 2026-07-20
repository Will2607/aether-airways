import { buildDemoFlightStatuses } from "@/features/flight-status/mocks";
import { normalizeFlightNumber, flightMatchesDate } from "@/features/flight-status/utils/flight-status.utils";
import type { FlightStatusRecord } from "@/features/flight-status/types";

/**
 * Flight Status service.
 *
 * LIMITATION: Backed entirely by deterministic mock data generated relative
 * to the current time. No external API, no real-time data, no persistence.
 *
 * Date matching note: Mock flights are generated for "today". Searching for
 * any other date returns no results by design, as documented in the mocks.
 */

/** Returns all demo flights for the given moment. */
export function getAllFlightStatuses(now: Date = new Date()): FlightStatusRecord[] {
  return buildDemoFlightStatuses(now);
}

/**
 * Searches for flights by (possibly abbreviated) flight number and date.
 * Accepts "201", "AE201", "AE 201".
 */
export function searchFlightsByNumber(
  flightInput: string,
  date:        string,
  now:         Date = new Date()
): FlightStatusRecord[] {
  const normalized = normalizeFlightNumber(flightInput);
  return buildDemoFlightStatuses(now).filter(
    (f) => f.flightNumber === normalized && flightMatchesDate(f, date)
  );
}

/**
 * Searches for flights by origin + destination IATA codes and date.
 * Origin ≠ destination is enforced by the form schema.
 */
export function searchFlightsByRoute(
  origin:      string,
  destination: string,
  date:        string,
  now:         Date = new Date()
): FlightStatusRecord[] {
  const o = origin.trim().toUpperCase();
  const d = destination.trim().toUpperCase();
  return buildDemoFlightStatuses(now).filter(
    (f) =>
      f.origin.code      === o &&
      f.destination.code === d &&
      flightMatchesDate(f, date)
  );
}

/**
 * Resolves a single FlightStatusRecord by flight number.
 * Always returns today's mock flight for that number (demo strategy).
 * Returns null when the flight number is unknown.
 */
export function getFlightStatusByNumber(
  flightNumber: string,
  now:          Date = new Date()
): FlightStatusRecord | null {
  const normalized = normalizeFlightNumber(flightNumber);
  return buildDemoFlightStatuses(now).find((f) => f.flightNumber === normalized) ?? null;
}
