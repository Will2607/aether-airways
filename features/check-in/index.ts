// Types
export type {
  CheckInStatus,
  BoardingGroup,
  PassengerCheckInStatus,
  CheckInEligibility,
  CheckInPassenger,
  CheckInRequest,
  BoardingPass,
  CheckInResult,
} from "./types";

// Constants
export {
  CHECKINS_STORAGE_KEY,
  CHECKIN_OPENS_HOURS_BEFORE,
  CHECKIN_CLOSES_MINUTES_BEFORE,
  BOARDING_STARTS_MINUTES_BEFORE,
  DEMO_BYPASS_CHECKIN_WINDOW,
} from "./constants";

// Utils
export { evaluateEligibility, getDepartureDateTime } from "./utils/eligibility.utils";
export { generateBoardingPass, processCheckIn } from "./utils/boarding-pass.utils";

// Services
export { checkInService } from "./services/check-in.service";

// Hooks
export { useCheckIn } from "./hooks/use-check-in";

// Components
export { CheckInLookupForm }     from "./components/check-in-lookup-form";
export { CheckInEligibilityCard } from "./components/check-in-eligibility-card";
export { PassengerCheckInList }  from "./components/passenger-check-in-list";
export { TravelDeclarations }    from "./components/travel-declarations";
export { CheckInStatusMessage }  from "./components/check-in-status-message";
export { CheckInFlow }           from "./components/check-in-flow";
export { BoardingPassCard }      from "./components/boarding-pass-card";
export { BoardingPassesPage }    from "./components/boarding-passes-page";
export { CheckInPage }           from "./components/check-in-page";
export { CheckInLoader }         from "./components/check-in-loader";
export { BoardingPassesLoader }  from "./components/boarding-passes-loader";
