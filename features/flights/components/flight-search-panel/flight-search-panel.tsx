"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRightIcon, SearchIcon, AlertCircleIcon } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { TripTypeTabs } from "./trip-type-tabs";
import { AirportCombobox } from "./airport-combobox";
import { DatePicker } from "./date-picker";
import { PassengersSelector, type PassengerCounts } from "./passengers-selector";
import { AIRPORTS } from "@/features/flights/constants/airports";
import type { Airport } from "@/features/flights/types";
import type { CabinClass, TripType } from "@/features/flights/types";

/* ── Types ──────────────────────────────────────────────────────────────── */

interface FormErrors {
  origin?:        string;
  destination?:   string;
  departureDate?: string;
  returnDate?:    string;
}

/* ── Error message inline ───────────────────────────────────────────────── */

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400" aria-live="polite">
      <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {msg}
    </p>
  );
}

/* ── URL builder ────────────────────────────────────────────────────────── */

function buildSearchUrl(params: {
  origin: string; destination: string;
  date: string; returnDate?: string;
  cabin: CabinClass; adults: number;
  children: number; infants: number;
  tripType: TripType;
}): string {
  const q = new URLSearchParams({
    origin: params.origin, destination: params.destination,
    date: params.date, cabin: params.cabin,
    adults: String(params.adults), children: String(params.children),
    infants: String(params.infants), tripType: params.tripType,
  });
  if (params.returnDate) q.set("returnDate", params.returnDate);
  return `/flights/search?${q.toString()}`;
}

/* ── Date → ISO string ──────────────────────────────────────────────────── */

function toISO(date: Date | null): string | null {
  if (!date || date.getTime() === 0) return null;
  return date.toISOString().slice(0, 10);
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function FlightSearchPanel() {
  const router = useRouter();

  const [tripType, setTripType]           = useState<TripType>("round_trip");
  const [origin, setOrigin]               = useState<Airport | null>(null);
  const [destination, setDestination]     = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate]       = useState<Date | null>(null);
  const [passengers, setPassengers]       = useState<PassengerCounts>({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass]       = useState<CabinClass>("economy");
  const [swapRotation, setSwapRotation]   = useState(0);
  const [errors, setErrors]               = useState<FormErrors>({});

  /* ── Handlers ─────────────────────────────────────────────────────── */

  const handleSwap = useCallback(() => {
    setSwapRotation((r) => r + 180);
    setOrigin(destination);
    setDestination(origin);
    setErrors((e) => ({ ...e, origin: undefined, destination: undefined }));
  }, [origin, destination]);

  const handleTripTypeChange = (type: TripType) => {
    setTripType(type);
    if (type === "one_way") setReturnDate(null);
    setErrors({});
  };

  /* ── Validation ───────────────────────────────────────────────────── */

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!origin)
      errs.origin = "Please select an origin city.";
    if (!destination)
      errs.destination = "Please select a destination city.";
    if (origin && destination && origin.code === destination.code)
      errs.destination = "Origin and destination must be different.";
    const depISO = toISO(departureDate);
    if (!depISO)
      errs.departureDate = "Please select a departure date.";
    if (tripType === "round_trip") {
      const retISO = toISO(returnDate);
      if (!retISO)
        errs.returnDate = "Please select a return date.";
      else if (depISO && retISO < depISO)
        errs.returnDate = "Return date cannot be before departure.";
    }
    return errs;
  };

  const focusFirst = (errs: FormErrors) => {
    if (errs.origin)        document.getElementById("origin")?.focus();
    else if (errs.destination)   document.getElementById("destination")?.focus();
    else if (errs.departureDate) document.getElementById("departure-date")?.focus();
    else if (errs.returnDate)    document.getElementById("return-date")?.focus();
  };

  /* ── Search ───────────────────────────────────────────────────────── */

  const handleSearch = () => {
    if (tripType === "multi_city") return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      focusFirst(errs);
      return;
    }

    setErrors({});
    router.push(buildSearchUrl({
      origin:      origin!.code,
      destination: destination!.code,
      date:        toISO(departureDate)!,
      returnDate:  toISO(returnDate) ?? undefined,
      cabin:       cabinClass,
      adults:      passengers.adults,
      children:    passengers.children,
      infants:     passengers.infants,
      tripType,
    }));
  };

  /* ── Render ───────────────────────────────────────────────────────── */

  const isMultiCity = tripType === "multi_city";

  return (
    <div className="bg-card/80 backdrop-blur-xl border border-neutral-800/80 rounded-2xl lg:rounded-3xl p-5 lg:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      {/* Trip type selector */}
      <div className="flex items-center gap-3">
        <TripTypeTabs value={tripType} onChange={handleTripTypeChange} />
        {isMultiCity && (
          <Badge variant="secondary" size="sm">Coming soon</Badge>
        )}
      </div>

      {/* Fields row */}
      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-start">

        {/* ── Origin + Swap + Destination ─────────────────────────── */}
        <div className="flex-[2]">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <AirportCombobox
                id="origin" label="From" value={origin}
                onChange={(a) => { setOrigin(a); setErrors((e) => ({ ...e, origin: undefined, destination: undefined })); }}
                airports={AIRPORTS} placeholder="City or airport"
                hasError={!!errors.origin}
              />
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="shrink-0 mt-5 h-10 w-10 rounded-xl border border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500"
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
                id="destination" label="To" value={destination}
                onChange={(a) => { setDestination(a); setErrors((e) => ({ ...e, destination: undefined })); }}
                airports={AIRPORTS} placeholder="City or airport"
                hasError={!!errors.destination}
              />
            </div>
          </div>

          {/* Route errors */}
          {(errors.origin || errors.destination) && (
            <FieldError msg={(errors.origin ?? errors.destination)!} />
          )}
        </div>

        {/* ── Departure date ─────────────────────────────────────── */}
        <div className="lg:flex-1">
          <DatePicker
            id="departure-date" label="Departure" value={departureDate}
            onChange={(d) => { setDepartureDate(d); setErrors((e) => ({ ...e, departureDate: undefined })); }}
            minDate={new Date()} placeholder="Add date"
            hasError={!!errors.departureDate}
          />
          {errors.departureDate && <FieldError msg={errors.departureDate} />}
        </div>

        {/* ── Return date (animated) ─────────────────────────────── */}
        <AnimatePresence initial={false}>
          {tripType !== "one_way" && (
            <motion.div
              key="return-date" className="lg:flex-1"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <DatePicker
                id="return-date" label="Return" value={returnDate}
                onChange={(d) => { setReturnDate(d); setErrors((e) => ({ ...e, returnDate: undefined })); }}
                minDate={departureDate ?? new Date()} placeholder="Add date"
                hasError={!!errors.returnDate}
              />
              {errors.returnDate && <FieldError msg={errors.returnDate} />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Passengers & Class ─────────────────────────────────── */}
        <div className="lg:flex-1">
          <PassengersSelector
            passengers={passengers} cabinClass={cabinClass}
            onPassengersChange={setPassengers} onCabinClassChange={setCabinClass}
          />
        </div>

        {/* ── Search button ──────────────────────────────────────── */}
        <div className="lg:shrink-0 lg:pt-[1.625rem]">
          <Button
            variant="primary" size="lg"
            onClick={handleSearch}
            disabled={isMultiCity}
            aria-label={
              isMultiCity
                ? "Multi-city search coming soon"
                : origin && destination
                ? `Search flights from ${origin.city} to ${destination.city}`
                : "Search flights"
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
