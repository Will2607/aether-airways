import {
  TIMELINE_STEP_KEYS,
  TIMELINE_STEP_LABELS,
  STATUS_TIMELINE_INDEX,
} from "@/features/flight-status/constants";
import type {
  FlightOperationalStatus,
  FlightStatusRecord,
  FlightStatusEvent,
  FlightStatusTimelineStep,
} from "@/features/flight-status/types";

/* ── Flight number normalization ─────────────────────────────────────────── */

/**
 * Normalizes user input to canonical "AE NNN" format.
 * Accepts "201", "AE201", "AE 201", "ae201", etc.
 */
export function normalizeFlightNumber(input: string): string {
  const cleaned = input.trim().toUpperCase().replace(/\s+/g, "");
  // Already has IATA prefix
  const withPrefix = cleaned.match(/^([A-Z]{2})(\d+)$/);
  if (withPrefix) return `${withPrefix[1]} ${withPrefix[2]}`;
  // Digits only — prepend "AE"
  const digitsOnly = cleaned.match(/^(\d+)$/);
  if (digitsOnly) return `AE ${digitsOnly[1]}`;
  return cleaned;
}

/** Converts "AE 201" → "AE201" for use in URL paths. */
export function urlSafeFlightNumber(flightNumber: string): string {
  return flightNumber.replace(/\s/g, "");
}

/** Converts URL-safe "AE201" back to "AE 201". */
export function fromUrlFlightNumber(slug: string): string {
  return normalizeFlightNumber(slug);
}

/* ── Time formatting ─────────────────────────────────────────────────────── */

/** Formats an ISO string to "HH:MM" in local time. */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour:   "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/** Formats an ISO string to "DD Mon YYYY". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day:   "2-digit",
    month: "short",
    year:  "numeric",
  });
}

/** Formats an ISO string to "DD Mon, HH:MM". */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString("en-US", { day: "2-digit", month: "short" })}, ${d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`;
}

/** Returns "YYYY-MM-DD" for today in local time. */
export function todayLocalDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/* ── Timeline builder ────────────────────────────────────────────────────── */

/**
 * Builds the ordered timeline steps from a flight's status and event history.
 *
 * For cancelled flights, only completed events are marked as such.
 * For delayed flights, the current step is shown at its real position
 * (boarding level) and a separate DelayAlert is displayed.
 */
export function buildTimelineSteps(
  status:   FlightOperationalStatus,
  events:   FlightStatusEvent[]
): FlightStatusTimelineStep[] {
  const isCancelled    = status === "cancelled";
  const currentIndex   = STATUS_TIMELINE_INDEX[status] ?? 0;

  const eventByStatus = new Map(events.map((e) => [e.status, e]));

  return TIMELINE_STEP_KEYS.map((key, i) => {
    const event = eventByStatus.get(key);

    if (isCancelled) {
      // Only mark steps that actually happened
      const happened = event !== undefined;
      return {
        key,
        label:       TIMELINE_STEP_LABELS[key],
        occurredAt:  event?.occurredAt,
        isCurrent:   false,
        isCompleted: happened,
        isPending:   !happened,
      };
    }

    return {
      key,
      label:       TIMELINE_STEP_LABELS[key],
      occurredAt:  event?.occurredAt,
      isCurrent:   i === currentIndex,
      isCompleted: i < currentIndex,
      isPending:   i > currentIndex,
    };
  });
}

/* ── Delay formatting ────────────────────────────────────────────────────── */

/** Returns human-readable delay string, e.g. "1 h 30 min" or "45 min". */
export function formatDelay(minutes: number): string {
  if (minutes <= 0) return "";
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} h ${m} min` : `${h} h`;
}

/* ── Search date matching ────────────────────────────────────────────────── */

/**
 * Checks if a flight's scheduled departure matches the search date.
 * Empty date always matches (show all). Any date not matching today's
 * flights returns no results in the demo.
 */
export function flightMatchesDate(flight: FlightStatusRecord, searchDate: string): boolean {
  if (!searchDate) return true;
  const flightDate = flight.scheduledDeparture.slice(0, 10);
  return flightDate === searchDate;
}
