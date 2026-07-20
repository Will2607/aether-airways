// Types
export type {
  FlightOperationalStatus,
  FlightStatusSearchMode,
  AirportOperationalInfo,
  FlightStatusEvent,
  FlightStatusTimelineStep,
  FlightStatusRecord,
  FlightNumberSearchInput,
  RouteSearchInput,
} from "./types";

// Constants
export {
  TIMELINE_STEP_KEYS,
  TIMELINE_STEP_LABELS,
  STATUS_TIMELINE_INDEX,
  STATUS_CONFIG,
} from "./constants";

// Mocks
export { buildDemoFlightStatuses, AIRPORTS } from "./mocks";

// Service
export {
  getAllFlightStatuses,
  searchFlightsByNumber,
  searchFlightsByRoute,
  getFlightStatusByNumber,
} from "./services/flight-status.service";

// Utils
export {
  normalizeFlightNumber,
  urlSafeFlightNumber,
  fromUrlFlightNumber,
  formatTime,
  formatDate,
  formatDateTime,
  todayLocalDate,
  buildTimelineSteps,
  formatDelay,
  flightMatchesDate,
} from "./utils/flight-status.utils";

// Components
export { FlightStatusBadge }          from "./components/flight-status-badge";
export { FlightNumberSearchForm }     from "./components/flight-number-search-form";
export { RouteSearchForm }            from "./components/route-search-form";
export { FlightStatusCard }           from "./components/flight-status-card";
export { FlightStatusResults }        from "./components/flight-status-results";
export { DelayAlert }                 from "./components/delay-alert";
export { FlightOperationalTimeline }  from "./components/flight-operational-timeline";
export { FlightTimesCard }            from "./components/flight-times-card";
export { FlightStatusNotFound }       from "./components/flight-status-not-found";
export { FlightStatusPage }           from "./components/flight-status-page";
export { FlightStatusDetailsPage }    from "./components/flight-status-details-page";
export { FlightStatusLoader }         from "./components/flight-status-loader";
export { FlightStatusDetailsLoader }  from "./components/flight-status-details-loader";
