/** sessionStorage key for booking selection */
export const BOOKING_STORAGE_KEY = "aether.booking.selection" as const;

/** Ordered booking flow steps */
export const BOOKING_STEPS = [
  { id: "select",       label: "Select"     },
  { id: "review",       label: "Review"     },
  { id: "passengers",   label: "Passengers" },
  { id: "payment",      label: "Payment"    },
  { id: "confirmation", label: "Confirm"    },
] as const;

export type BookingStepId = (typeof BOOKING_STEPS)[number]["id"];

/** Mock tax rate applied to the base fare subtotal */
export const TAX_RATE = 0.12;

/** Fixed airport handling charge per passenger (USD) */
export const AIRPORT_CHARGE_USD = 35;
