import type { ID, ISODateString, CurrencyCode } from "@/types";

/* ── Primitives ─────────────────────────────────────────────────────────── */

export type CabinClass = "economy" | "premium_economy" | "business" | "first";
export type TripType   = "one_way" | "round_trip" | "multi_city";
export type FlightTag  = "cheapest" | "fastest" | "best_value";
export type FlightSortOption = "price_asc" | "duration_asc" | "departure_asc" | "arrival_asc";

/* ── Airport ─────────────────────────────────────────────────────────────── */

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

/* ── Aircraft ────────────────────────────────────────────────────────────── */

export interface Aircraft {
  code: string;
  name: string;
}

/* ── Baggage ─────────────────────────────────────────────────────────────── */

export interface BaggageItem {
  count: number;
  weightKg: number;
}

export interface BaggageAllowance {
  carryOn: BaggageItem | null;
  checked: BaggageItem | null;
}

/* ── Fare brand (commercial product) ────────────────────────────────────── */

export interface FareBrand {
  id: string;
  name: string;
  cabinClass: CabinClass;
  isRefundable: boolean;
  isChangeable: boolean;
  changeFeeUsd: number | null;
  baggage: BaggageAllowance;
  highlights: string[];
}

/* ── Price ───────────────────────────────────────────────────────────────── */

export interface Price {
  amount: number;
  currency: string;
}

/* ── Fare (a bookable combination of brand + price) ─────────────────────── */

export interface Fare {
  id: string;
  brand: FareBrand;
  price: Price;
  seatsAvailable: number;
  isAvailable: boolean;
}

/* ── Flight leg (one physical flight segment with full airport objects) ──── */

export interface FlightLeg {
  id: string;
  flightNumber: string;
  aircraft: Aircraft;
  origin: Airport;
  destination: Airport;
  departureAt: ISODateString;
  arrivalAt: ISODateString;
  durationMinutes: number;
  isCodeshare: boolean;
  operatingCarrier?: string;
}

/* ── Flight result (one itinerary with 1–N legs and multiple fares) ─────── */

export interface FlightResult {
  id: string;
  legs: FlightLeg[];
  totalDurationMinutes: number;
  stopCount: number;
  fares: Fare[];
  tags: FlightTag[];
}

/* ── Search params (what the user submits) ───────────────────────────────── */

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: ISODateString;
  returnDate?: ISODateString;
  /** Total passenger count (adults + children + infants) */
  passengers: number;
  /** Individual counts — available after parseUrlParams */
  adults: number;
  children: number;
  infants: number;
  cabinClass: CabinClass;
  tripType: TripType;
}

/* ── Active filters (UI-level state) ────────────────────────────────────── */

export type DeparturePeriod = "morning" | "afternoon" | "evening";

export interface FlightActiveFilters {
  stops: number[];
  maxPrice: number | null;
  departurePeriods: DeparturePeriod[];
}

/* ── Service response ────────────────────────────────────────────────────── */

export interface FlightSearchResponse {
  outbound: FlightResult[];
  inbound?: FlightResult[];
  searchId: string;
  currency: string;
  totalResults: number;
}

/* ── Legacy types — kept for backward compatibility with existing store/schemas ── */

export interface FlightSegment {
  origin: string;
  destination: string;
  departureAt: ISODateString;
  arrivalAt: ISODateString;
  flightNumber: string;
  carrier: string;
  durationMinutes: number;
}

export interface FlightOffer {
  id: ID;
  segments: FlightSegment[];
  price: number;
  currency: CurrencyCode;
  seatsAvailable: number;
  cabinClass: CabinClass;
}
