import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { FlightOffer, FlightSearchParams } from "../types";

interface FlightsState {
  searchParams: FlightSearchParams | null;
  selectedFlight: FlightOffer | null;
  setSearchParams: (params: FlightSearchParams) => void;
  selectFlight: (flight: FlightOffer) => void;
  clearSelection: () => void;
}

export const useFlightsStore = create<FlightsState>()(
  devtools(
    (set) => ({
      searchParams: null,
      selectedFlight: null,
      setSearchParams: (params) => set({ searchParams: params }),
      selectFlight: (flight) => set({ selectedFlight: flight }),
      clearSelection: () => set({ selectedFlight: null }),
    }),
    { name: "flights-store" }
  )
);
