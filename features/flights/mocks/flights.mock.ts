import { AIRPORTS } from "@/features/flights/constants/airports";
import { FARE_BRANDS } from "@/features/flights/constants/flights";
import type { Airport, Fare, FlightResult } from "@/features/flights/types";

/* ── Airport lookup map ─────────────────────────────────────────────────── */

const AP = Object.fromEntries(AIRPORTS.map((a) => [a.code, a])) as Record<string, Airport>;

/* ── Fare factory helpers ───────────────────────────────────────────────── */

const fare = (
  id: string,
  brandId: string,
  amount: number,
  seats: number,
  available = true
): Fare => ({
  id,
  brand: FARE_BRANDS[brandId],
  price: { amount, currency: "USD" },
  seatsAvailable: seats,
  isAvailable: available,
});

/* ── Mock flights (BOG ↔ MIA + return legs) ─────────────────────────────── */

export const MOCK_FLIGHTS: FlightResult[] = [
  /* ── AE 101 — BOG → MIA, direct, B787, fastest ─── */
  {
    id: "AE101-20260815",
    legs: [
      {
        id: "leg-AE101-1",
        flightNumber: "AE 101",
        aircraft: { code: "B789", name: "Boeing 787-9 Dreamliner" },
        origin: AP["BOG"],
        destination: AP["MIA"],
        departureAt: "2026-08-15T06:00:00",
        arrivalAt: "2026-08-15T09:20:00",
        durationMinutes: 200,
        isCodeshare: false,
      },
    ],
    totalDurationMinutes: 200,
    stopCount: 0,
    tags: ["fastest"],
    fares: [
      fare("AE101-eco-saver",  "eco-saver",   199,  7),
      fare("AE101-eco-flex",   "eco-flex",    329, 12),
      fare("AE101-biz-comfort","biz-comfort", 899,  4),
      fare("AE101-biz-elite",  "biz-elite",  1199,  2),
    ],
  },

  /* ── AE 103 — BOG → MIA, direct, A350, best value ─ */
  {
    id: "AE103-20260815",
    legs: [
      {
        id: "leg-AE103-1",
        flightNumber: "AE 103",
        aircraft: { code: "A359", name: "Airbus A350-900" },
        origin: AP["BOG"],
        destination: AP["MIA"],
        departureAt: "2026-08-15T10:30:00",
        arrivalAt: "2026-08-15T14:15:00",
        durationMinutes: 225,
        isCodeshare: false,
      },
    ],
    totalDurationMinutes: 225,
    stopCount: 0,
    tags: ["best_value"],
    fares: [
      fare("AE103-eco-saver",   "eco-saver",    229, 14),
      fare("AE103-eco-flex",    "eco-flex",     359, 18),
      fare("AE103-prem-eco",    "prem-eco-flex",529,  6),
      fare("AE103-biz-comfort", "biz-comfort",  950,  5),
      fare("AE103-biz-elite",   "biz-elite",   1249,  2),
    ],
  },

  /* ── AE 105 — BOG → MIA, direct, A320, evening dep ─ */
  {
    id: "AE105-20260815",
    legs: [
      {
        id: "leg-AE105-1",
        flightNumber: "AE 105",
        aircraft: { code: "A320", name: "Airbus A320neo" },
        origin: AP["BOG"],
        destination: AP["MIA"],
        departureAt: "2026-08-15T16:45:00",
        arrivalAt: "2026-08-15T20:25:00",
        durationMinutes: 220,
        isCodeshare: false,
      },
    ],
    totalDurationMinutes: 220,
    stopCount: 0,
    tags: [],
    fares: [
      fare("AE105-eco-saver", "eco-saver", 219,  9),
      fare("AE105-eco-flex",  "eco-flex",  349, 11),
    ],
  },

  /* ── AE 201 — BOG → MEX → MIA, 1 stop via Mexico City ─ */
  {
    id: "AE201-20260815",
    legs: [
      {
        id: "leg-AE201-1",
        flightNumber: "AE 201",
        aircraft: { code: "A320", name: "Airbus A320neo" },
        origin: AP["BOG"],
        destination: AP["MEX"],
        departureAt: "2026-08-15T07:00:00",
        arrivalAt: "2026-08-15T09:10:00",
        durationMinutes: 130,
        isCodeshare: false,
      },
      {
        id: "leg-AE201-2",
        flightNumber: "AE 401",
        aircraft: { code: "A321", name: "Airbus A321neo" },
        origin: AP["MEX"],
        destination: AP["MIA"],
        departureAt: "2026-08-15T10:30:00",
        arrivalAt: "2026-08-15T13:15:00",
        durationMinutes: 165,
        isCodeshare: false,
      },
    ],
    totalDurationMinutes: 375,   // elapsed: 07:00 → 13:15
    stopCount: 1,
    tags: [],
    fares: [
      fare("AE201-eco-saver", "eco-saver", 169, 11),
      fare("AE201-eco-flex",  "eco-flex",  279, 15),
    ],
  },

  /* ── AE 203 — BOG → MDE → MIA, 1 stop via Medellín (cheapest) ─ */
  {
    id: "AE203-20260815",
    legs: [
      {
        id: "leg-AE203-1",
        flightNumber: "AE 211",
        aircraft: { code: "A320", name: "Airbus A320neo" },
        origin: AP["BOG"],
        destination: AP["MDE"],
        departureAt: "2026-08-15T08:00:00",
        arrivalAt: "2026-08-15T09:10:00",
        durationMinutes: 70,
        isCodeshare: false,
      },
      {
        id: "leg-AE203-2",
        flightNumber: "AE 511",
        aircraft: { code: "B738", name: "Boeing 737 MAX 8" },
        origin: AP["MDE"],
        destination: AP["MIA"],
        departureAt: "2026-08-15T11:20:00",
        arrivalAt: "2026-08-15T15:10:00",
        durationMinutes: 230,
        isCodeshare: false,
      },
    ],
    totalDurationMinutes: 430,   // elapsed: 08:00 → 15:10
    stopCount: 1,
    tags: ["cheapest"],
    fares: [
      fare("AE203-eco-saver", "eco-saver", 149, 18),
      fare("AE203-eco-flex",  "eco-flex",  249, 20),
    ],
  },
];
