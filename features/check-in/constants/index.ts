/** localStorage key for the collection of check-in results. */
export const CHECKINS_STORAGE_KEY = "aether.checkins" as const;

/** Check-in window: opens 48 hours before departure. */
export const CHECKIN_OPENS_HOURS_BEFORE = 48;

/** Check-in window: closes 60 minutes before departure. */
export const CHECKIN_CLOSES_MINUTES_BEFORE = 60;

/** Boarding time: starts 30 minutes before departure. */
export const BOARDING_STARTS_MINUTES_BEFORE = 30;

/**
 * DEMO MODE — bypasses the 48-hour check-in window validation.
 *
 * When true, any future confirmed booking is immediately eligible for check-in,
 * regardless of whether the flight is within the 48-hour window.
 *
 * Set to false in production to enforce real check-in windows.
 * This flag does NOT alter persisted booking data or dates.
 */
export const DEMO_BYPASS_CHECKIN_WINDOW = true;
