import type {
  BookingPriceSummary,
  BookingSelection,
  PassengerDetails,
  PassengerListItem,
} from "@/features/booking/types";
import { TAX_RATE, AIRPORT_CHARGE_USD } from "@/features/booking/constants";

/**
 * Build a display-friendly passenger list from raw PassengerDetails.
 * Shared between Seat Selection and Extras pages.
 */
export function buildPassengerList(passengers: PassengerDetails[]): PassengerListItem[] {
  const counts: Record<string, number> = {};
  return passengers.map((p, idx) => {
    const type                = p.passengerType;
    counts[type]              = (counts[type] ?? 0) + 1;
    const typeLabel           = type.charAt(0).toUpperCase() + type.slice(1);
    return {
      id:    String(idx),
      label: `${typeLabel} ${counts[type]}`,
      name:  `${p.firstName} ${p.lastName}`.trim() || "—",
    };
  });
}

/** Format a number as currency (USD by default) */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

/**
 * Compute the full price summary for a booking selection.
 * Uses mock tax rates — replace with real pricing API in production.
 */
export function computePriceSummary(selection: BookingSelection): BookingPriceSummary {
  const { fare, searchContext: { passengers } } = selection;
  const { amount, currency } = fare.price;

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;
  const subtotal = amount * totalPassengers;

  const taxAmount    = Math.round(subtotal * TAX_RATE);
  const airportCharge = AIRPORT_CHARGE_USD * totalPassengers;

  const taxes = [
    { label: "Taxes & fees (12%)", amount: taxAmount         },
    { label: "Airport charges",    amount: airportCharge     },
  ];
  const totalTaxes = taxes.reduce((sum, t) => sum + t.amount, 0);

  return {
    farePerPerson: amount,
    currency,
    passengers,
    totalPassengers,
    subtotal,
    taxes,
    totalTaxes,
    grandTotal: subtotal + totalTaxes,
  };
}
