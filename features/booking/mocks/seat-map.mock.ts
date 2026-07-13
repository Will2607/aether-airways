import type { CabinSeatMap, Seat, SeatRow, SeatType, SeatPrice } from "@/features/booking/types";

/* ── Configuration ──────────────────────────────────────────────────────── */

const COLUMNS      = ["A", "B", "C", "D", "E", "F"] as const;
const LEFT_COLS    = ["A", "B", "C"] as const;
const RIGHT_COLS   = ["D", "E", "F"] as const;
const TOTAL_ROWS   = 30;
const EXIT_ROWS    = new Set([12, 24]);

/**
 * Deterministic set of occupied seat IDs (~35% occupancy).
 * Generated once — keeps the mock stable across reloads.
 */
const OCCUPIED_IDS = new Set([
  "1B","1D",
  "2A","2F",
  "3C","3E",
  "4B","4D","4F",
  "5A","5C","5E",
  "6B","6F",
  "7A","7D","7F",
  "8B","8C","8F",
  "9A","9C","9E",
  "10A","10B","10D",
  "11B","11D","11F",
  "12A","12C","12F",
  "13A","13C","13E",
  "14B","14D","14F",
  "15A","15C",
  "16B","16E","16F",
  "17A","17D",
  "18B","18C","18F",
  "19A","19D","19F",
  "20B","20E",
  "21A","21C",
  "22B","22D","22F",
  "23A","23E","23F",
  "24B","24E",
  "25A","25F",
  "26D","26E",
  "27A",
  "28B","28E",
  "29A","29F",
  "30C","30D",
]);

/** Blocked seats (e.g. crew jump seats, structural constraints). */
const BLOCKED_IDS = new Set(["1A", "1F"]);

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function getSeatType(row: number): SeatType {
  if (row <= 3)                          return "preferred";
  if (EXIT_ROWS.has(row))                return "exit-row";
  if (row >= 25 && row <= 27)            return "extra-legroom";
  return "standard";
}

function getSeatPrice(type: SeatType): SeatPrice {
  const amounts: Record<SeatType, number> = {
    standard:        0,
    preferred:      25,
    "exit-row":     35,
    "extra-legroom":50,
  };
  return { amount: amounts[type], currency: "USD" };
}

/* ── Builder ─────────────────────────────────────────────────────────────── */

function buildCabinMap(): CabinSeatMap {
  const rows: SeatRow[] = [];

  for (let rowNum = 1; rowNum <= TOTAL_ROWS; rowNum++) {
    const type      = getSeatType(rowNum);
    const price     = getSeatPrice(type);
    const isExitRow = EXIT_ROWS.has(rowNum);

    const seats: Seat[] = COLUMNS.map((col) => {
      const id     = `${rowNum}${col}`;
      const status = BLOCKED_IDS.has(id) ? "blocked"
                   : OCCUPIED_IDS.has(id) ? "occupied"
                   : "available";

      return {
        id,
        row:      rowNum,
        column:   col,
        label:    id,
        status,
        type,
        price,
        isWindow: col === "A" || col === "F",
        isAisle:  col === "C" || col === "D",
      };
    });

    rows.push({ rowNumber: rowNum, seats, isExitRow });
  }

  return {
    aircraftType: "Boeing 737-800",
    totalRows:    TOTAL_ROWS,
    columns:      [...COLUMNS],
    leftColumns:  [...LEFT_COLS],
    rightColumns: [...RIGHT_COLS],
    rows,
  };
}

export const MOCK_CABIN_SEAT_MAP: CabinSeatMap = buildCabinMap();
