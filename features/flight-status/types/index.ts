/**
 * Flight Status domain types.
 *
 * LIMITATION: All statuses are mock/simulated. No real airline data.
 * Times are generated relative to the current moment to avoid stale data.
 */

/* ── Operational status ─────────────────────────────────────────────────── */

export type FlightOperationalStatus =
  | "scheduled"
  | "check_in_open"
  | "boarding"
  | "gate_closed"
  | "delayed"
  | "departed"
  | "in_air"
  | "landed"
  | "cancelled";

export type FlightStatusSearchMode = "flight_number" | "route";

/* ── Airport ─────────────────────────────────────────────────────────────── */

export interface AirportOperationalInfo {
  code:     string;   // IATA code
  name:     string;
  city:     string;
  country:  string;
  timezone: string;   // IANA timezone id (e.g. "America/Bogota")
}

/* ── Events / timeline ───────────────────────────────────────────────────── */

export interface FlightStatusEvent {
  status:     FlightOperationalStatus;
  occurredAt: string;   // ISO
  note?:      string;
}

export interface FlightStatusTimelineStep {
  key:         FlightOperationalStatus;
  label:       string;
  occurredAt?: string;   // ISO — when this step happened
  isCurrent:   boolean;
  isCompleted: boolean;
  isPending:   boolean;
}

/* ── Main record ─────────────────────────────────────────────────────────── */

/**
 * Represents the complete operational status of one flight leg.
 * All timestamps are ISO strings in UTC.
 * Optional fields are undefined until the event occurs.
 */
export interface FlightStatusRecord {
  flightNumber:      string;   // e.g. "AE 201"
  airline:           string;
  aircraft:          string;
  origin:            AirportOperationalInfo;
  destination:       AirportOperationalInfo;
  scheduledDeparture: string;   // ISO — original scheduled time
  estimatedDeparture?: string;  // ISO — updated estimate (if delayed)
  actualDeparture?:   string;   // ISO — when it actually departed
  scheduledArrival:  string;   // ISO
  estimatedArrival?: string;   // ISO
  actualArrival?:    string;   // ISO
  departureTerminal: string;
  departureGate:     string;
  arrivalTerminal:   string;
  arrivalGate?:      string;
  baggageClaim?:     string;
  status:            FlightOperationalStatus;
  delayMinutes:      number;
  /** History of status events for the timeline. */
  timeline:          FlightStatusEvent[];
  updatedAt:         string;   // ISO — last data refresh
}

/* ── Search inputs ───────────────────────────────────────────────────────── */

export interface FlightNumberSearchInput {
  flightInput: string;   // "201" | "AE201" | "AE 201"
  date:        string;   // "YYYY-MM-DD"
}

export interface RouteSearchInput {
  origin:      string;   // IATA code
  destination: string;   // IATA code
  date:        string;   // "YYYY-MM-DD"
}
