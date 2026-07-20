import type { AirportOperationalInfo, FlightStatusRecord, FlightStatusEvent, FlightOperationalStatus } from "@/features/flight-status/types";

/* ── Airport definitions ─────────────────────────────────────────────────── */

const AIRPORTS: Record<string, AirportOperationalInfo> = {
  BOG: { code: "BOG", name: "El Dorado International Airport",       city: "Bogotá",      country: "Colombia",       timezone: "America/Bogota"      },
  MIA: { code: "MIA", name: "Miami International Airport",            city: "Miami",       country: "United States",  timezone: "America/New_York"    },
  MEX: { code: "MEX", name: "Benito Juárez International Airport",    city: "Mexico City", country: "Mexico",         timezone: "America/Mexico_City" },
  MDE: { code: "MDE", name: "José M. Córdova International Airport",  city: "Medellín",    country: "Colombia",       timezone: "America/Bogota"      },
  LIM: { code: "LIM", name: "Jorge Chávez International Airport",     city: "Lima",        country: "Peru",           timezone: "America/Lima"        },
  GRU: { code: "GRU", name: "Guarulhos International Airport",        city: "São Paulo",   country: "Brazil",         timezone: "America/Sao_Paulo"   },
};

/* ── Time helpers (no Math.random) ──────────────────────────────────────── */

function addMin(base: Date, minutes: number): string {
  return new Date(base.getTime() + minutes * 60_000).toISOString();
}
function subMin(base: Date, minutes: number): string {
  return new Date(base.getTime() - minutes * 60_000).toISOString();
}

/* ── Airline-wide constants ──────────────────────────────────────────────── */

const AIRLINE  = "AetherAirways";
const AIRCRAFTS = ["Airbus A320", "Boeing 737-800", "Airbus A321neo", "Boeing 787-9"];

function aircraft(seed: number): string {
  return AIRCRAFTS[seed % AIRCRAFTS.length]!;
}

/* ── Build demo statuses ─────────────────────────────────────────────────── */

/**
 * Generates a deterministic set of mock flight statuses relative to `now`.
 *
 * DEMO NOTE: Times are always relative to the current moment so flights
 * never become permanently stale. This function is called with `new Date()`
 * at search/render time. No `Math.random()` is used.
 *
 * LIMITATION: These are simulated statuses. Not real airline data.
 */
export function buildDemoFlightStatuses(now: Date): FlightStatusRecord[] {
  const ev = (status: FlightOperationalStatus, offsetMin: number, note?: string): FlightStatusEvent => ({
    status,
    occurredAt: offsetMin >= 0 ? addMin(now, offsetMin) : subMin(now, -offsetMin),
    ...(note ? { note } : {}),
  });

  return [
    /* ── AE 201  BOG → MEX  |  scheduled  |  departs +5h ─────────────────── */
    {
      flightNumber:       "AE 201",
      airline:            AIRLINE,
      aircraft:           aircraft(1),
      origin:             AIRPORTS.BOG!,
      destination:        AIRPORTS.MEX!,
      scheduledDeparture: addMin(now, 5 * 60),
      scheduledArrival:   addMin(now, 5 * 60 + 4 * 60),
      departureTerminal:  "T1",
      departureGate:      "A14",
      arrivalTerminal:    "T2",
      arrivalGate:        "B07",
      status:             "scheduled",
      delayMinutes:       0,
      updatedAt:          subMin(now, 30),
      timeline: [
        ev("scheduled", -(18 * 60)),
      ],
    },

    /* ── AE 211  BOG → MDE  |  check_in_open  |  departs +3h ─────────────── */
    {
      flightNumber:       "AE 211",
      airline:            AIRLINE,
      aircraft:           aircraft(2),
      origin:             AIRPORTS.BOG!,
      destination:        AIRPORTS.MDE!,
      scheduledDeparture: addMin(now, 3 * 60),
      scheduledArrival:   addMin(now, 3 * 60 + 45),
      departureTerminal:  "T1",
      departureGate:      "C22",
      arrivalTerminal:    "T2",
      arrivalGate:        "D01",
      status:             "check_in_open",
      delayMinutes:       0,
      updatedAt:          subMin(now, 15),
      timeline: [
        ev("scheduled",     -(20 * 60)),
        ev("check_in_open", -(30)),
      ],
    },

    /* ── AE 305  BOG → MIA  |  boarding  |  departs +1h ──────────────────── */
    {
      flightNumber:       "AE 305",
      airline:            AIRLINE,
      aircraft:           aircraft(3),
      origin:             AIRPORTS.BOG!,
      destination:        AIRPORTS.MIA!,
      scheduledDeparture: addMin(now, 60),
      scheduledArrival:   addMin(now, 60 + 4 * 60 + 30),
      departureTerminal:  "T2",
      departureGate:      "B06",
      arrivalTerminal:    "D",
      arrivalGate:        "J32",
      status:             "boarding",
      delayMinutes:       0,
      updatedAt:          subMin(now, 5),
      timeline: [
        ev("scheduled",     -(22 * 60)),
        ev("check_in_open", -(150)),
        ev("boarding",      -(15)),
      ],
    },

    /* ── AE 412  BOG → LIM  |  delayed  |  was +2h, now +3.5h ────────────── */
    {
      flightNumber:        "AE 412",
      airline:             AIRLINE,
      aircraft:            aircraft(0),
      origin:              AIRPORTS.BOG!,
      destination:         AIRPORTS.LIM!,
      scheduledDeparture:  addMin(now, 2 * 60),
      estimatedDeparture:  addMin(now, 3 * 60 + 30),
      scheduledArrival:    addMin(now, 2 * 60 + 3 * 60),
      estimatedArrival:    addMin(now, 3 * 60 + 30 + 3 * 60),
      departureTerminal:   "T1",
      departureGate:       "A08",
      arrivalTerminal:     "T1",
      arrivalGate:         "G14",
      status:              "delayed",
      delayMinutes:        90,
      updatedAt:           subMin(now, 20),
      timeline: [
        ev("scheduled",     -(18 * 60)),
        ev("check_in_open", -(60)),
        ev("delayed",       -(20), "Operational crew delay"),
      ],
    },

    /* ── AE 501  MIA → BOG  |  in_air  |  departed -2h, arrives +1.5h ────── */
    {
      flightNumber:       "AE 501",
      airline:            AIRLINE,
      aircraft:           aircraft(3),
      origin:             AIRPORTS.MIA!,
      destination:        AIRPORTS.BOG!,
      scheduledDeparture: subMin(now, 2 * 60),
      actualDeparture:    subMin(now, 2 * 60 - 5),
      scheduledArrival:   addMin(now, 90),
      estimatedArrival:   addMin(now, 95),
      departureTerminal:  "D",
      departureGate:      "J22",
      arrivalTerminal:    "T2",
      arrivalGate:        "C11",
      status:             "in_air",
      delayMinutes:       0,
      updatedAt:          subMin(now, 2),
      timeline: [
        ev("scheduled",     -(26 * 60)),
        ev("check_in_open", -(4 * 60)),
        ev("boarding",      -(2 * 60 + 40)),
        ev("departed",      -(2 * 60)),
        ev("in_air",        -(2 * 60 - 8)),
      ],
    },

    /* ── AE 607  MEX → BOG  |  landed  |  -30min ──────────────────────────── */
    {
      flightNumber:       "AE 607",
      airline:            AIRLINE,
      aircraft:           aircraft(2),
      origin:             AIRPORTS.MEX!,
      destination:        AIRPORTS.BOG!,
      scheduledDeparture: subMin(now, 5 * 60),
      actualDeparture:    subMin(now, 5 * 60 + 5),
      scheduledArrival:   subMin(now, 40),
      actualArrival:      subMin(now, 30),
      departureTerminal:  "T1",
      departureGate:      "F03",
      arrivalTerminal:    "T1",
      arrivalGate:        "A09",
      baggageClaim:       "Belt 4",
      status:             "landed",
      delayMinutes:       0,
      updatedAt:          subMin(now, 25),
      timeline: [
        ev("scheduled",     -(24 * 60)),
        ev("check_in_open", -(7 * 60)),
        ev("boarding",      -(5 * 60 + 40)),
        ev("departed",      -(5 * 60 + 5)),
        ev("in_air",        -(5 * 60 - 5)),
        ev("landed",        -(30)),
      ],
    },

    /* ── AE 999  BOG → GRU  |  cancelled ───────────────────────────────────── */
    {
      flightNumber:       "AE 999",
      airline:            AIRLINE,
      aircraft:           aircraft(1),
      origin:             AIRPORTS.BOG!,
      destination:        AIRPORTS.GRU!,
      scheduledDeparture: addMin(now, 4 * 60),
      scheduledArrival:   addMin(now, 4 * 60 + 7 * 60),
      departureTerminal:  "T2",
      departureGate:      "D14",
      arrivalTerminal:    "T3",
      status:             "cancelled",
      delayMinutes:       0,
      updatedAt:          subMin(now, 45),
      timeline: [
        ev("scheduled",  -(20 * 60)),
        ev("cancelled",  -(45), "Flight cancelled due to operational reasons"),
      ],
    },
  ];
}

export { AIRPORTS };
