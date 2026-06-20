"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRightIcon, SearchIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { TripTypeTabs } from "./trip-type-tabs";
import { AirportCombobox } from "./airport-combobox";
import { DatePicker } from "./date-picker";
import { PassengersSelector, type PassengerCounts } from "./passengers-selector";
import { AIRPORTS } from "@/features/flights/constants/airports";
import type { CabinClass, TripType } from "@/features/flights/types";
import type { Airport } from "@/features/flights/constants/airports";

export function FlightSearchPanel() {
  const [tripType, setTripType]         = useState<TripType>("round_trip");
  const [origin, setOrigin]             = useState<Airport | null>(null);
  const [destination, setDestination]   = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate]     = useState<Date | null>(null);
  const [passengers, setPassengers]     = useState<PassengerCounts>({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass]     = useState<CabinClass>("economy");
  const [swapRotation, setSwapRotation] = useState(0);
  const [searching, setSearching]       = useState(false);

  const handleSwap = useCallback(() => {
    setSwapRotation((r) => r + 180);
    setOrigin(destination);
    setDestination(origin);
  }, [origin, destination]);

  const handleTripTypeChange = (type: TripType) => {
    setTripType(type);
    if (type === "one_way") setReturnDate(null);
  };

  const handleSearch = async () => {
    if (!origin || !destination || !departureDate) return;
    setSearching(true);
    // Placeholder: navigate to /flights with search params
    await new Promise((r) => setTimeout(r, 1500));
    setSearching(false);
  };

  const canSearch = !!origin && !!destination && !!departureDate;

  return (
    <div className="bg-card/80 backdrop-blur-xl border border-neutral-800/80 rounded-2xl lg:rounded-3xl p-5 lg:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      {/* Trip type selector */}
      <TripTypeTabs value={tripType} onChange={handleTripTypeChange} />

      {/* Fields */}
      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-end">

        {/* ── Origin + Swap + Destination ─────────────────────────── */}
        <div className="flex-[2] flex items-center gap-2">
          <div className="flex-1">
            <AirportCombobox
              id="origin"
              label="From"
              value={origin}
              onChange={setOrigin}
              airports={AIRPORTS}
              placeholder="City or airport"
            />
          </div>

          {/* Swap button */}
          <button
            type="button"
            onClick={handleSwap}
            className="shrink-0 h-10 w-10 rounded-xl border border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-400 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500"
            aria-label="Swap origin and destination"
          >
            <motion.span
              animate={{ rotate: swapRotation }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center justify-center"
            >
              <ArrowLeftRightIcon className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>

          <div className="flex-1">
            <AirportCombobox
              id="destination"
              label="To"
              value={destination}
              onChange={setDestination}
              airports={AIRPORTS}
              placeholder="City or airport"
            />
          </div>
        </div>

        {/* ── Departure date ────────────────────────────────────────── */}
        <div className="lg:flex-1">
          <DatePicker
            id="departure-date"
            label="Departure"
            value={departureDate}
            onChange={setDepartureDate}
            minDate={new Date()}
            placeholder="Add date"
          />
        </div>

        {/* ── Return date (animated in/out) ─────────────────────────── */}
        <AnimatePresence initial={false}>
          {tripType !== "one_way" && (
            <motion.div
              key="return-date"
              className="lg:flex-1"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <DatePicker
                id="return-date"
                label="Return"
                value={returnDate}
                onChange={setReturnDate}
                minDate={departureDate ?? new Date()}
                placeholder="Add date"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Passengers & Class ────────────────────────────────────── */}
        <div className="lg:flex-1">
          <PassengersSelector
            passengers={passengers}
            cabinClass={cabinClass}
            onPassengersChange={setPassengers}
            onCabinClassChange={setCabinClass}
          />
        </div>

        {/* ── Search button ─────────────────────────────────────────── */}
        <div className="lg:shrink-0">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSearch}
            disabled={!canSearch}
            isLoading={searching}
            aria-label={
              canSearch
                ? `Search flights from ${origin?.city} to ${destination?.city}`
                : "Complete the search form to continue"
            }
            className="w-full lg:w-auto"
          >
            <SearchIcon className="h-4 w-4" aria-hidden="true" />
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
}
