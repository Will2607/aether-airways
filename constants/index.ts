export const APP_NAME = "AetherAirways";
export const APP_DESCRIPTION =
  "Fly beyond the horizon. Book flights, manage reservations, and travel smarter.";

export const ROUTES = {
  HOME: "/",
  FLIGHTS: "/flights",
  BOOKING: "/booking",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  DASHBOARD: {
    ROOT: "/dashboard",
    TRIPS: "/dashboard/trips",
    PROFILE: "/dashboard/profile",
  },
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  PAGE_SIZE: 10,
} as const;
