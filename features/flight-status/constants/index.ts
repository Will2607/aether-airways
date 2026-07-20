import type { FlightOperationalStatus } from "@/features/flight-status/types";

/* ── Timeline step order ────────────────────────────────────────────────── */

/**
 * Ordered steps displayed in the operational timeline.
 * "delayed" and "gate_closed" are sub-states shown separately (not timeline nodes).
 */
export const TIMELINE_STEP_KEYS: FlightOperationalStatus[] = [
  "scheduled",
  "check_in_open",
  "boarding",
  "departed",
  "in_air",
  "landed",
];

export const TIMELINE_STEP_LABELS: Record<FlightOperationalStatus, string> = {
  scheduled:      "Scheduled",
  check_in_open:  "Check-in open",
  boarding:       "Boarding",
  gate_closed:    "Gate closed",
  delayed:        "Delayed",
  departed:       "Departed",
  in_air:         "In air",
  landed:         "Landed",
  cancelled:      "Cancelled",
};

/**
 * Maps each status to its index in the TIMELINE_STEP_KEYS array.
 * "delayed" and "gate_closed" are treated as sub-states at the "boarding" level.
 * "cancelled" is -1 (terminal state, no timeline position).
 */
export const STATUS_TIMELINE_INDEX: Record<FlightOperationalStatus, number> = {
  scheduled:      0,
  check_in_open:  1,
  boarding:       2,
  gate_closed:    2,   // visual parity with boarding
  delayed:        2,   // flight is still on the ground
  departed:       3,
  in_air:         4,
  landed:         5,
  cancelled:      -1,
};

/* ── Status display config ───────────────────────────────────────────────── */

export interface StatusConfig {
  label:         string;
  colorClass:    string;
  bgClass:       string;
  borderClass:   string;
  textClass:     string;
}

export const STATUS_CONFIG: Record<FlightOperationalStatus, StatusConfig> = {
  scheduled: {
    label:       "Scheduled",
    colorClass:  "text-sky-400",
    bgClass:     "bg-sky-900/20",
    borderClass: "border-sky-700/40",
    textClass:   "text-sky-300",
  },
  check_in_open: {
    label:       "Check-in open",
    colorClass:  "text-blue-400",
    bgClass:     "bg-blue-900/20",
    borderClass: "border-blue-700/40",
    textClass:   "text-blue-300",
  },
  boarding: {
    label:       "Boarding",
    colorClass:  "text-aether-400",
    bgClass:     "bg-aether-900/20",
    borderClass: "border-aether-700/40",
    textClass:   "text-aether-300",
  },
  gate_closed: {
    label:       "Gate closed",
    colorClass:  "text-orange-400",
    bgClass:     "bg-orange-900/20",
    borderClass: "border-orange-700/40",
    textClass:   "text-orange-300",
  },
  delayed: {
    label:       "Delayed",
    colorClass:  "text-amber-400",
    bgClass:     "bg-amber-900/20",
    borderClass: "border-amber-700/40",
    textClass:   "text-amber-300",
  },
  departed: {
    label:       "Departed",
    colorClass:  "text-indigo-400",
    bgClass:     "bg-indigo-900/20",
    borderClass: "border-indigo-700/40",
    textClass:   "text-indigo-300",
  },
  in_air: {
    label:       "In air",
    colorClass:  "text-violet-400",
    bgClass:     "bg-violet-900/20",
    borderClass: "border-violet-700/40",
    textClass:   "text-violet-300",
  },
  landed: {
    label:       "Landed",
    colorClass:  "text-emerald-400",
    bgClass:     "bg-emerald-900/20",
    borderClass: "border-emerald-700/40",
    textClass:   "text-emerald-300",
  },
  cancelled: {
    label:       "Cancelled",
    colorClass:  "text-red-400",
    bgClass:     "bg-red-900/20",
    borderClass: "border-red-700/40",
    textClass:   "text-red-300",
  },
};
