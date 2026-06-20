import type { ID, ISODateString, CurrencyCode } from "@/types";

export type CabinClass = "economy" | "premium_economy" | "business" | "first";
export type TripType = "one_way" | "round_trip" | "multi_city";

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: ISODateString;
  returnDate?: ISODateString;
  passengers: number;
  cabinClass: CabinClass;
  tripType: TripType;
}

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
