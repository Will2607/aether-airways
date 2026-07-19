/**
 * Check-in domain types.
 * LIMITATION: All check-in data is client-side only (localStorage).
 * No airline PNR integration, no real seat changes, no wallet passes.
 */

/* ── Status ─────────────────────────────────────────────────────────────── */

export type CheckInStatus =
  | "not_started"
  | "eligible"
  | "checked_in"
  | "not_eligible"
  | "closed";

export type BoardingGroup = "A" | "B" | "C" | "D";

export type PassengerCheckInStatus = "selected" | "skipped";

/* ── Eligibility ─────────────────────────────────────────────────────────── */

export interface CheckInEligibility {
  eligible:   boolean;
  status:     CheckInStatus;
  /** Human-readable explanation shown to the user. */
  reason:     string;
  /** ISO — when check-in will open (if status is not_eligible due to window). */
  opensAt?:   string;
  /** ISO — when check-in closed (if status is closed). */
  closesAt?:  string;
}

/* ── Passenger ───────────────────────────────────────────────────────────── */

export interface CheckInPassenger {
  index:       number;
  passengerId: string;  // String(index) matching seats.selections
  name:        string;  // "First Last"
  maskedDoc:   string;  // "••••1234"
  seat:        string;  // "14C" or "—"
}

/* ── Request ─────────────────────────────────────────────────────────────── */

export interface CheckInRequest {
  bookingRef:         string;
  selectedPassengers: string[];  // passengerId values
}

/* ── Boarding pass ───────────────────────────────────────────────────────── */

/**
 * Visual boarding pass generated after successful check-in.
 * Contains NO sensitive data: no document numbers, no payment info.
 * barcodeValue is a deterministic mock string, not encoded personal data.
 */
export interface BoardingPass {
  bookingReference: string;
  passengerId:      string;
  /** IATA format: "DOE/JANE" — first/last name only, no document data. */
  passengerName:    string;
  flightNumber:     string;
  origin:           string;  // IATA code
  destination:      string;  // IATA code
  originCity:       string;
  destinationCity:  string;
  departureDate:    string;  // "YYYY-MM-DD"
  /** Boarding time = departure - 30 min. */
  boardingTime:     string;  // "HH:MM"
  departureTime:    string;  // "HH:MM"
  gate:             string;
  terminal:         string;
  seat:             string;
  boardingGroup:    BoardingGroup;
  sequenceNumber:   number;
  /** Deterministic mock value only. Never encodes sensitive information. */
  barcodeValue:     string;
  checkedInAt:      string;  // ISO
  status:           "confirmed";
}

/* ── Result ─────────────────────────────────────────────────────────────── */

export interface CheckInResult {
  bookingRef:     string;
  checkedInAt:    string;   // ISO
  boardingPasses: BoardingPass[];
}
