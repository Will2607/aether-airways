import type {
  CabinClass,
  DeparturePeriod,
  Fare,
  FlightActiveFilters,
  FlightResult,
  FlightSearchParams,
  FlightSortOption,
  TripType,
} from "@/features/flights/types";

/* ── Date / time formatting ──────────────────────────────────────────────── */

/**
 * Returns "HH:MM" from an ISO datetime string.
 * Example: "2026-08-15T06:00:00" → "06:00"
 */
export function formatTime(isoDateTime: string): string {
  return isoDateTime.slice(11, 16);
}

/**
 * Returns "Aug 15" from an ISO date string.
 * Example: "2026-08-15" → "Aug 15"
 */
export function formatShortDate(isoDate: string): string {
  const [year, month, day] = isoDate.slice(0, 10).split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Converts minutes to "Xh Ym" format.
 * Example: 200 → "3h 20m"
 */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/* ── Fare helpers ────────────────────────────────────────────────────────── */

/** Returns the cheapest available fare for the given cabin class, or null. */
export function getCheapestFare(fares: Fare[], cabinClass?: CabinClass): Fare | null {
  const eligible = fares.filter(
    (f) => f.isAvailable && (!cabinClass || f.brand.cabinClass === cabinClass)
  );
  if (eligible.length === 0) return null;
  return eligible.reduce((a, b) => (a.price.amount < b.price.amount ? a : b));
}

/** Returns the cheapest available fare price in the given cabin, or Infinity. */
export function getCheapestPrice(flight: FlightResult, cabinClass?: CabinClass): number {
  return getCheapestFare(flight.fares, cabinClass)?.price.amount ?? Infinity;
}

/* ── Departure period ────────────────────────────────────────────────────── */

export function getDeparturePeriod(departureAt: string): DeparturePeriod {
  const hour = parseInt(departureAt.slice(11, 13), 10);
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

/* ── Filtering ───────────────────────────────────────────────────────────── */

export function applyFilters(
  flights: FlightResult[],
  filters: FlightActiveFilters
): FlightResult[] {
  return flights.filter((flight) => {
    // Stops filter
    if (filters.stops.length > 0 && !filters.stops.includes(flight.stopCount)) {
      return false;
    }

    // Max price filter
    if (filters.maxPrice !== null) {
      const cheapest = getCheapestFare(flight.fares);
      if (!cheapest || cheapest.price.amount > filters.maxPrice) return false;
    }

    // Departure period filter
    if (filters.departurePeriods.length > 0) {
      const period = getDeparturePeriod(flight.legs[0].departureAt);
      if (!filters.departurePeriods.includes(period)) return false;
    }

    return true;
  });
}

/* ── Sorting ─────────────────────────────────────────────────────────────── */

export function sortFlights(
  flights: FlightResult[],
  sort: FlightSortOption
): FlightResult[] {
  return [...flights].sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return getCheapestPrice(a) - getCheapestPrice(b);
      case "duration_asc":
        return a.totalDurationMinutes - b.totalDurationMinutes;
      case "departure_asc":
        return a.legs[0].departureAt.localeCompare(b.legs[0].departureAt);
      case "arrival_asc": {
        const lastA = a.legs[a.legs.length - 1].arrivalAt;
        const lastB = b.legs[b.legs.length - 1].arrivalAt;
        return lastA.localeCompare(lastB);
      }
      default:
        return 0;
    }
  });
}

/* ── URL param parsing ───────────────────────────────────────────────────── */

const VALID_CABIN: CabinClass[] = ["economy", "premium_economy", "business", "first"];
const VALID_TRIP:  TripType[]   = ["one_way", "round_trip", "multi_city"];

/** Converts raw URL query params into a typed FlightSearchParams. */
export function parseUrlParams(
  params: Record<string, string | string[] | undefined>
): FlightSearchParams {
  const get = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : Array.isArray(v) ? v[0] : undefined;
  };

  const origin      = get("origin")      ?? "BOG";
  const destination = get("destination") ?? "MIA";
  const date        = get("date")        ?? new Date().toISOString().slice(0, 10);
  const returnDate  = get("returnDate");
  const adults      = parseInt(get("adults") ?? "1", 10);
  const children    = parseInt(get("children") ?? "0", 10);
  const infants     = parseInt(get("infants") ?? "0", 10);
  const rawCabin    = get("cabin");
  const rawTrip     = get("tripType");

  const cabinClass: CabinClass = VALID_CABIN.includes(rawCabin as CabinClass)
    ? (rawCabin as CabinClass)
    : "economy";

  const tripType: TripType = VALID_TRIP.includes(rawTrip as TripType)
    ? (rawTrip as TripType)
    : "one_way";

  return {
    origin,
    destination,
    departureDate: date,
    returnDate,
    passengers: adults + children + infants,
    adults,
    children,
    infants,
    cabinClass,
    tripType,
  };
}

/* ── Date injection (for mock service) ──────────────────────────────────── */

/**
 * Replaces the date portion of each leg's departure and arrival
 * so mock data matches any requested date.
 */
export function injectDate(flight: FlightResult, date: string): FlightResult {
  return {
    ...flight,
    id: `${flight.id.split("-")[0]}-${date.replace(/-/g, "")}`,
    legs: flight.legs.map((leg) => ({
      ...leg,
      departureAt: `${date}T${leg.departureAt.slice(11)}`,
      arrivalAt:   `${date}T${leg.arrivalAt.slice(11)}`,
    })),
  };
}
