import type { ID } from "@/types";
import type { CabinClass, TripType, Fare, FlightResult, FlightOffer } from "@/features/flights/types";

/* ── Legacy types (backward compat with existing store/schemas) ─────────── */

export type BookingStep =
  | "select"
  | "review"
  | "passengers"
  | "extras"
  | "payment"
  | "confirmation";

export type BookingStatus =
  | "draft"
  | "pending_payment"
  | "confirmed"
  | "cancelled";

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
}

export interface BookingDraft {
  flightOffer: FlightOffer;
  passengers: PassengerInfo[];
  contactEmail: string;
  contactPhone: string;
}

export interface Booking extends BookingDraft {
  id: ID;
  status: BookingStatus;
  createdAt: string;
  pnr: string;
}

/* ── Booking Flow v1 types ──────────────────────────────────────────────── */

/** Passenger counts as selected in the search form */
export interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

/** Original search context captured at selection time */
export interface BookingSearchContext {
  origin: string;         // IATA code
  destination: string;    // IATA code
  departureDate: string;  // ISO date (YYYY-MM-DD)
  returnDate?: string;    // ISO date (YYYY-MM-DD)
  cabin: CabinClass;
  passengers: PassengerCounts;
  tripType: TripType;
}

/** A user's fare selection — persisted in sessionStorage */
export interface BookingSelection {
  flight: FlightResult;
  fare: Fare;
  searchContext: BookingSearchContext;
  selectedAt: string; // ISO timestamp
}

/** Line item within the price breakdown */
export interface BookingTaxLine {
  label: string;
  amount: number;
}

/** Computed price summary for the review page */
export interface BookingPriceSummary {
  farePerPerson: number;
  currency: string;
  passengers: PassengerCounts;
  totalPassengers: number;
  subtotal: number;
  taxes: BookingTaxLine[];
  totalTaxes: number;
  grandTotal: number;
}
