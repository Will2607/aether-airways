/** localStorage key for the full collection of confirmed bookings */
export const BOOKINGS_STORAGE_KEY = "aether.bookings" as const;

export const TRIP_STATUS_LABELS: Record<string, string> = {
  upcoming:  "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
};
