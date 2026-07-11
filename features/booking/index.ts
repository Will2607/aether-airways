// Store (legacy)
export { useBookingStore } from "./store/booking.store";

// Types
export type {
  Booking, BookingDraft, BookingStatus,
  PassengerInfo,
  BookingSelection, BookingSearchContext,
  BookingPriceSummary, BookingTaxLine,
  PassengerCounts,
} from "./types";

export { type BookingStep } from "./types";

// Constants
export { BOOKING_STEPS, BOOKING_STORAGE_KEY, type BookingStepId } from "./constants";

// Services
export { selectionService } from "./services/selection.service";

// Hooks
export { useBookingSelection } from "./hooks/use-booking-selection";

// Utils
export { computePriceSummary, formatCurrency } from "./utils/booking.utils";

// Components
export { BookingReviewPage }   from "./components/booking-review-page";
export { BookingReviewLoader } from "./components/booking-review-loader";
export { BookingProgress }     from "./components/booking-progress";
export { BookingEmpty }        from "./components/booking-empty";
