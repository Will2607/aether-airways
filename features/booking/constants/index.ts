/** sessionStorage key for booking selection (fare chosen in results) */
export const BOOKING_STORAGE_KEY = "aether.booking.selection" as const;

/** sessionStorage key for passenger form data */
export const PASSENGERS_STORAGE_KEY = "aether.booking.passengers" as const;

/** sessionStorage key for seat selection data */
export const SEATS_STORAGE_KEY = "aether.booking.seats" as const;

/** sessionStorage key for extras / upgrades selection */
export const EXTRAS_STORAGE_KEY = "aether.booking.extras" as const;

/** Ordered booking flow steps */
export const BOOKING_STEPS = [
  { id: "select",       label: "Select"     },
  { id: "review",       label: "Review"     },
  { id: "passengers",   label: "Passengers" },
  { id: "seats",        label: "Seats"      },
  { id: "extras",       label: "Extras"     },
  { id: "payment",      label: "Payment"    },
  { id: "confirmation", label: "Confirm"    },
] as const;

export type BookingStepId = (typeof BOOKING_STEPS)[number]["id"];

/** Mock tax rate applied to the base fare subtotal */
export const TAX_RATE = 0.12;

/** Fixed airport handling charge per passenger (USD) */
export const AIRPORT_CHARGE_USD = 35;
