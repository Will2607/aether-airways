import type { PassengerSeatSelection, ExtraSelection } from "@/features/booking/types";

/**
 * Manage Booking domain types.
 *
 * LIMITATION: No backend integration. Changes are applied to the local
 * localStorage booking record only. No real PNR modification.
 * Drafts are lost on page reload — this is intentional.
 */

/* ── Section navigation ──────────────────────────────────────────────────── */

export type ManageBookingSection = "contact" | "seats" | "extras" | "review";

/* ── Change types ────────────────────────────────────────────────────────── */

export type BookingChangeType =
  | "contact_updated"
  | "seat_changed"
  | "extra_added"
  | "extra_removed"
  | "extra_quantity_changed";

/* ── Single change record ────────────────────────────────────────────────── */

export interface BookingChange {
  /** Deterministic ID: "{type}-{passengerId?}-{extraId?}" */
  id:              string;
  type:            BookingChangeType;
  /** Human-readable label. Never contains sensitive data. */
  label:           string;
  /** Safe textual description of original value. */
  previousValue:   string;
  /** Safe textual description of new value. */
  nextValue:       string;
  /** Positive = extra charge, negative = credit. */
  priceDifference: number;
  passengerId?:    string;
  createdAt:       string;   // ISO — set at confirmation time
}

/* ── Change set ──────────────────────────────────────────────────────────── */

export interface BookingChangeSet {
  bookingRef:      string;
  changes:         BookingChange[];
  previousTotal:   number;
  newTotal:        number;
  netDifference:   number;
}

/* ── Price difference summary ────────────────────────────────────────────── */

export interface PriceDiff {
  previousTotal:   number;
  addedCharges:    number;
  removedCredits:  number;
  netDifference:   number;
  newTotal:        number;
}

/* ── Eligibility ─────────────────────────────────────────────────────────── */

export type ManageBookingEligibilityStatus =
  | "eligible"
  | "partial"   // only contact editable (post check-in)
  | "blocked"   // no modifications allowed
  | "not_found";

export interface ManageBookingEligibility {
  status:          ManageBookingEligibilityStatus;
  canModify:       boolean;   // any section modifiable
  canEditContact:  boolean;
  canChangeSeats:  boolean;
  canChangeExtras: boolean;
  reason:          string;
}

/* ── Modification record (persisted in localStorage) ────────────────────── */

export interface BookingModificationRecord {
  modificationId: string;
  bookingRef:     string;
  createdAt:      string;   // ISO
  changes:        BookingChange[];
  previousTotal:  number;
  newTotal:       number;
  netDifference:  number;
  status:         "completed";
}

/* ── Processing result ───────────────────────────────────────────────────── */

export interface ManageBookingResult {
  success:        boolean;
  modificationId: string;
}

/* ── Draft types (transient, never persisted) ────────────────────────────── */

export interface ContactDraft {
  email:       string;
  phone:       string;
  countryCode: string;
}

/** Alias — reuse existing type to avoid duplication. */
export type SeatDraftEntry = PassengerSeatSelection;

/** Alias — reuse existing type to avoid duplication. */
export type ExtraDraftEntry = ExtraSelection;
