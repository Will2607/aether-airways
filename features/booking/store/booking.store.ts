import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { BookingDraft, BookingStep } from "../types";

interface BookingState {
  currentStep: BookingStep;
  draft: BookingDraft | null;
  setStep: (step: BookingStep) => void;
  updateDraft: (data: Partial<BookingDraft>) => void;
  resetBooking: () => void;
}

const INITIAL_STATE = {
  currentStep: "search" as BookingStep,
  draft: null,
};

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,
        setStep: (step) => set({ currentStep: step }),
        updateDraft: (data) =>
          set((state) => ({
            draft: state.draft ? { ...state.draft, ...data } : (data as BookingDraft),
          })),
        resetBooking: () => set(INITIAL_STATE),
      }),
      { name: "aether-booking-draft" }
    ),
    { name: "booking-store" }
  )
);
