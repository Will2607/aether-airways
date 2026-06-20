import type { ID } from "@/types";
import type { FlightOffer } from "@/features/flights/types";

export type BookingStep =
  | "search"
  | "select"
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
