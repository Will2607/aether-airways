import { MOCK_FLIGHTS } from "@/features/flights/mocks/flights.mock";
import { injectDate } from "@/features/flights/utils/flight.utils";
import type { FlightSearchParams, FlightSearchResponse } from "@/features/flights/types";

/* ── Simulated latency ──────────────────────────────────────────────────── */

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/* ── Route matching ─────────────────────────────────────────────────────── */

function matchesRoute(
  params: FlightSearchParams,
  origin: string,
  destination: string
): boolean {
  return (
    origin.toUpperCase() === params.origin.toUpperCase() &&
    destination.toUpperCase() === params.destination.toUpperCase()
  );
}

/* ── Search service ─────────────────────────────────────────────────────── */

/**
 * Mock implementation of the flight search service.
 *
 * To replace with a real API:
 * 1. Remove the delay() call and MOCK_FLIGHTS import.
 * 2. Call your API: const res = await fetch(`${API_URL}/flights/search`, { body: JSON.stringify(params) });
 * 3. Parse and return: return res.json() as FlightSearchResponse;
 * The FlightSearchResponse shape is the contract — keep it stable.
 */
export async function searchFlights(
  params: FlightSearchParams
): Promise<FlightSearchResponse> {
  // Simulate network latency (600–1000 ms)
  await delay(600 + Math.random() * 400);

  // Filter by route
  const rawMatches = MOCK_FLIGHTS.filter((flight) => {
    const firstLeg = flight.legs[0];
    const lastLeg  = flight.legs[flight.legs.length - 1];
    return matchesRoute(params, firstLeg.origin.code, lastLeg.destination.code);
  });

  // Inject the requested departure date into mock times
  const outbound = rawMatches.map((flight) =>
    injectDate(flight, params.departureDate)
  );

  const searchId = `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    outbound,
    searchId,
    currency: "USD",
    totalResults: outbound.length,
  };
}
