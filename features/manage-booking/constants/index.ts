/** localStorage key for append-only modification history. */
export const MODIFICATIONS_STORAGE_KEY = "aether.booking-modifications" as const;

/**
 * sessionStorage key for the post-modification success banner.
 * Stores the bookingRef of the last successful modification.
 */
export const MODIFICATION_SUCCESS_FLAG_KEY = "aether.modification-success" as const;

/** Mock processing latency in milliseconds. */
export const MOCK_MODIFICATION_LATENCY_MS = 1500;
