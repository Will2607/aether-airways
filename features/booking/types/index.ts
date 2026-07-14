import type { ID } from "@/types";
import type { CabinClass, TripType, Fare, FlightResult, FlightOffer } from "@/features/flights/types";

/* ── Passenger Information types (Booking Flow v2) ──────────────────────── */

export type PassengerType  = "adult" | "child" | "infant";
export type PassengerTitle = "mr" | "ms" | "mrs" | "dr" | "prof";
export type DocumentType   = "passport" | "national_id" | "drivers_license";
export type Gender         = "male" | "female" | "other" | "prefer_not_to_say";

export interface ContactDetails {
  email:       string;
  countryCode: string;  // e.g. "+57"
  phone:       string;
}

export interface PassengerDetails {
  passengerType:  PassengerType;    // derived from search context, not editable
  title:          PassengerTitle;
  firstName:      string;
  middleName?:    string;
  lastName:       string;
  dateOfBirth:    string;           // YYYY-MM-DD
  gender:         Gender;
  nationality:    string;           // ISO 3166-1 alpha-2
  documentType:   DocumentType;
  documentNumber: string;
  documentExpiry: string;           // YYYY-MM-DD
  // frequentFlyer?: FrequentFlyerDetails  ← reserved for future phase
}

export interface PassengerFormData {
  contact:    ContactDetails;
  passengers: PassengerDetails[];
  savedAt:    string;              // ISO timestamp
}

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

/* ── Seat Selection types (Booking Flow v3) ─────────────────────────────── */

export type SeatStatus = "available" | "occupied" | "blocked" | "selected";
export type SeatType   = "standard" | "preferred" | "extra-legroom" | "exit-row";

export interface SeatPrice {
  amount:   number;
  currency: string;
}

export interface Seat {
  id:          string;   // e.g. "14A"
  row:         number;
  column:      string;   // "A" | "B" | "C" | "D" | "E" | "F"
  label:       string;   // display label, same as id
  status:      SeatStatus;
  type:        SeatType;
  price:       SeatPrice;
  isWindow:    boolean;
  isAisle:     boolean;
  passengerId?: string;  // set when assigned
}

export interface SeatRow {
  rowNumber: number;
  seats:     Seat[];
  isExitRow: boolean;
}

export interface CabinSeatMap {
  aircraftType:  string;
  totalRows:     number;
  columns:       string[];
  leftColumns:   string[];  // ["A","B","C"]
  rightColumns:  string[];  // ["D","E","F"]
  rows:          SeatRow[];
}

/** One passenger → one seat assignment */
export interface PassengerSeatSelection {
  passengerId:    string;  // string index: "0", "1", …
  passengerLabel: string;  // "Adult 1 — John Doe"
  seatId:         string;  // "14A"
  seatLabel:      string;  // "14A"
  price:          SeatPrice;
}

/** Persisted to sessionStorage under SEATS_STORAGE_KEY */
export interface SeatSelectionData {
  savedAt:      string;
  selections:   PassengerSeatSelection[];
  totalSeatFee: number;
}

/** Derived passenger list item used in seat selection UI */
export interface PassengerListItem {
  id:    string;  // string index
  label: string;  // "Adult 1", "Child 1"
  name:  string;  // "John Doe"
}

/* ── Extras / Upgrades types (Booking Flow v4) ──────────────────────────── */

export type ExtraCategory      = "baggage" | "priority-boarding" | "meal" | "lounge" | "insurance";
export type ExtraAvailability  = "available" | "soldout" | "unavailable";

export interface BookingExtra {
  id:                     string;
  category:               ExtraCategory;
  name:                   string;
  description:            string;
  price:                  number;
  currency:               string;
  /** true = must be assigned per passenger; false = applies to the whole booking */
  selectablePerPassenger: boolean;
  maxQuantity?:           number;
  availability:           ExtraAvailability;
  terms?:                 string;
}

/** One selection record — ties a passenger (or the booking) to an extra and quantity */
export interface ExtraSelection {
  extraId:      string;
  /** String passenger index ("0","1",...) or "booking" for booking-level extras */
  passengerId:  string;
  quantity:     number;
  /** Snapshot of price at selection time — never mutated after selection */
  priceAtTime:  number;
  currency:     string;
}

/** Persisted to sessionStorage under EXTRAS_STORAGE_KEY */
export interface ExtrasSelectionData {
  savedAt:     string;
  selections:  ExtraSelection[];
  extrasTotal: number;
}

/** Derived price breakdown by extra category */
export interface ExtrasBreakdown {
  baggageFees:   number;
  mealFees:      number;
  priorityFees:  number;
  loungeFees:    number;
  insuranceFees: number;
  extrasTotal:   number;
}
