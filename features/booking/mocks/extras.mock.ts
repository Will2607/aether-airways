import type { BookingExtra, ExtraCategory } from "@/features/booking/types";

/* ── Extra options catalogue ─────────────────────────────────────────────── */

export const ALL_EXTRAS: BookingExtra[] = [
  /* ── Baggage ─────────────────────────────────────────────────────────── */
  {
    id:                     "bag-extra-23",
    category:               "baggage",
    name:                   "Extra bag — 23 kg",
    description:            "Add one checked bag up to 23 kg. Ideal for trips longer than 3 days.",
    price:                  45,
    currency:               "USD",
    selectablePerPassenger: true,
    maxQuantity:            2,
    availability:           "available",
    terms:                  "Must be booked at least 4 hours before departure.",
  },
  {
    id:                     "bag-two-23",
    category:               "baggage",
    name:                   "Two bags — 23 kg each",
    description:            "Add two checked bags up to 23 kg each — best value for longer stays.",
    price:                  80,
    currency:               "USD",
    selectablePerPassenger: true,
    maxQuantity:            1,
    availability:           "available",
    terms:                  "Each bag must not exceed 23 kg. Overweight fees apply at check-in.",
  },
  {
    id:                     "bag-sport",
    category:               "baggage",
    name:                   "Sports equipment",
    description:            "Transport skis, surfboards, golf clubs, or bicycles as checked sports gear.",
    price:                  65,
    currency:               "USD",
    selectablePerPassenger: true,
    maxQuantity:            1,
    availability:           "available",
    terms:                  "Equipment must be packaged appropriately. Max 32 kg.",
  },

  /* ── Priority boarding ───────────────────────────────────────────────── */
  {
    id:                     "priority-boarding",
    category:               "priority-boarding",
    name:                   "Priority boarding",
    description:            "Be among the first to board and secure overhead bin space.",
    price:                  12,
    currency:               "USD",
    selectablePerPassenger: true,
    maxQuantity:            1,
    availability:           "available",
  },

  /* ── Meals ───────────────────────────────────────────────────────────── */
  {
    id:                     "meal-standard",
    category:               "meal",
    name:                   "Standard meal",
    description:            "Chef-inspired hot meal with seasonal ingredients.",
    price:                  0,
    currency:               "USD",
    selectablePerPassenger: true,
    maxQuantity:            1,
    availability:           "available",
  },
  {
    id:                     "meal-vegetarian",
    category:               "meal",
    name:                   "Vegetarian meal",
    description:            "Lacto-ovo vegetarian — no meat, fish or poultry.",
    price:                  0,
    currency:               "USD",
    selectablePerPassenger: true,
    maxQuantity:            1,
    availability:           "available",
  },
  {
    id:                     "meal-vegan",
    category:               "meal",
    name:                   "Vegan meal",
    description:            "100% plant-based, no animal-derived ingredients.",
    price:                  5,
    currency:               "USD",
    selectablePerPassenger: true,
    maxQuantity:            1,
    availability:           "available",
  },
  {
    id:                     "meal-gluten-free",
    category:               "meal",
    name:                   "Gluten-free meal",
    description:            "Prepared in a gluten-controlled environment, certified gluten-free.",
    price:                  5,
    currency:               "USD",
    selectablePerPassenger: true,
    maxQuantity:            1,
    availability:           "available",
  },

  /* ── Lounge ──────────────────────────────────────────────────────────── */
  {
    id:                     "lounge-access",
    category:               "lounge",
    name:                   "Lounge access",
    description:            "Relax before your flight with complimentary food, drinks and Wi-Fi.",
    price:                  35,
    currency:               "USD",
    selectablePerPassenger: true,
    maxQuantity:            1,
    availability:           "available",
    terms:                  "Opens 3 hours before departure. Children under 12 free with a paying adult.",
  },

  /* ── Insurance ───────────────────────────────────────────────────────── */
  {
    id:                     "insurance-basic",
    category:               "insurance",
    name:                   "Basic travel insurance",
    description:            "Trip cancellation up to $2,000 · Lost baggage up to $500 · Medical emergencies.",
    price:                  25,
    currency:               "USD",
    selectablePerPassenger: false,
    maxQuantity:            1,
    availability:           "available",
    terms:                  "Underwritten by SecureTravel Partners. Policy docs emailed on purchase.",
  },
  {
    id:                     "insurance-premium",
    category:               "insurance",
    name:                   "Premium travel insurance",
    description:            "All Basic coverage plus delay compensation up to $500, missed connections, 24/7 helpline.",
    price:                  55,
    currency:               "USD",
    selectablePerPassenger: false,
    maxQuantity:            1,
    availability:           "available",
    terms:                  "Applies to all passengers in this booking. Full policy docs on purchase.",
  },
];

/** Extras pre-grouped by category for efficient lookup. */
export const EXTRAS_BY_CATEGORY: Record<ExtraCategory, BookingExtra[]> = {
  baggage:           ALL_EXTRAS.filter((e) => e.category === "baggage"),
  "priority-boarding": ALL_EXTRAS.filter((e) => e.category === "priority-boarding"),
  meal:              ALL_EXTRAS.filter((e) => e.category === "meal"),
  lounge:            ALL_EXTRAS.filter((e) => e.category === "lounge"),
  insurance:         ALL_EXTRAS.filter((e) => e.category === "insurance"),
};

/** IDs of all meal options — used for meal exclusivity logic. */
export const MEAL_EXTRA_IDS = new Set(
  ALL_EXTRAS.filter((e) => e.category === "meal").map((e) => e.id)
);

/** IDs of all insurance options — used for insurance exclusivity logic. */
export const INSURANCE_EXTRA_IDS = new Set(
  ALL_EXTRAS.filter((e) => e.category === "insurance").map((e) => e.id)
);
