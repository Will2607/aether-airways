// Store (legacy)
export { useBookingStore } from "./store/booking.store";

// Types
export type {
  Booking, BookingDraft, BookingStatus,
  PassengerInfo,
  BookingSelection, BookingSearchContext,
  BookingPriceSummary, BookingTaxLine,
  PassengerCounts,
  // Seat types
  Seat, SeatStatus, SeatType, SeatPrice,
  SeatRow, CabinSeatMap,
  PassengerSeatSelection, SeatSelectionData, PassengerListItem,
  // Extras types
  ExtraCategory, ExtraAvailability, BookingExtra,
  ExtraSelection, ExtrasSelectionData, ExtrasBreakdown,
} from "./types";

export { type BookingStep } from "./types";

// Constants
export {
  BOOKING_STEPS, BOOKING_STORAGE_KEY, PASSENGERS_STORAGE_KEY,
  SEATS_STORAGE_KEY, EXTRAS_STORAGE_KEY,
  type BookingStepId,
} from "./constants";

// Services
export { selectionService }  from "./services/selection.service";
export { passengersService } from "./services/passengers.service";
export { seatsService }      from "./services/seats.service";
export { extrasService }     from "./services/extras.service";

// Hooks
export { useBookingSelection } from "./hooks/use-booking-selection";
export { usePassengerData }    from "./hooks/use-passenger-data";
export { useSeatsData }        from "./hooks/use-seats-data";
export { useExtrasData }       from "./hooks/use-extras-data";

// Utils
export { buildPassengerList, computePriceSummary, formatCurrency } from "./utils/booking.utils";
export { getSeatClasses, buildSeatAriaLabel, computeSeatFees } from "./utils/seat.utils";
export { computeExtrasBreakdown, getSelectionQty, isExtraSelected } from "./utils/extras.utils";

// Mocks
export { MOCK_CABIN_SEAT_MAP }                            from "./mocks/seat-map.mock";
export { ALL_EXTRAS, EXTRAS_BY_CATEGORY, MEAL_EXTRA_IDS } from "./mocks/extras.mock";

// Components
export { BookingReviewPage }        from "./components/booking-review-page";
export { BookingReviewLoader }      from "./components/booking-review-loader";
export { PassengersPage }           from "./components/passengers-page";
export { PassengersPageLoader }     from "./components/passengers-page-loader";
export { SeatsPage }                from "./components/seats-page";
export { SeatsPageLoader }          from "./components/seats-page-loader";
export { ExtrasPage }               from "./components/extras-page";
export { ExtrasPageLoader }         from "./components/extras-page-loader";
export { PaymentPage }              from "./components/payment-page";
export { PaymentPageLoader }        from "./components/payment-page-loader";
export { ExtraOptionCard }          from "./components/extras/extra-option-card";
export { ExtraCategorySection }     from "./components/extras/extra-category-section";
export { ExtrasPriceSummary }       from "./components/extras/extras-price-summary";
export { QuantitySelector }         from "./components/extras/quantity-selector";
export { PassengerExtraRow }        from "./components/extras/passenger-extra-row";
export { BookingProgress }          from "./components/booking-progress";
export { BookingEmpty }             from "./components/booking-empty";
export { BookingSummarySidebar }    from "./components/booking-summary-sidebar";
export { SeatsPriceSummary }        from "./components/seats-price-summary";
export { PassengerSeatSelector }    from "./components/passenger-seat-selector";
export { SeatDetailsPanel }         from "./components/seat-details-panel";
export { SeatMap }    from "./components/seat-map/seat-map";
export { SeatButton } from "./components/seat-map/seat-button";
export { SeatLegend } from "./components/seat-map/seat-legend";

// Schemas
export {
  passengerFormSchema,
  contactSchema,
  type PassengerFormPayload,
  type ContactFormValues,
  type PassengerFormValues,
} from "./schemas/passenger-form.schema";
