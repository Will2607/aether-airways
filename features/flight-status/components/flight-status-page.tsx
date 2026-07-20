"use client";
import { useState } from "react";
import { PlaneIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/lib/utils";
import { searchFlightsByNumber, searchFlightsByRoute } from "@/features/flight-status/services/flight-status.service";
import { FlightNumberSearchForm } from "./flight-number-search-form";
import { RouteSearchForm } from "./route-search-form";
import { FlightStatusResults } from "./flight-status-results";
import type { FlightStatusRecord, FlightStatusSearchMode } from "@/features/flight-status/types";
import type { FlightNumberSearchValues } from "./flight-number-search-form";
import type { RouteSearchValues } from "./route-search-form";

export function FlightStatusPage() {
  const [mode, setMode]       = useState<FlightStatusSearchMode>("flight_number");
  const [results, setResults] = useState<FlightStatusRecord[]>([]);
  const [searched, setSearched] = useState(false);

  function handleFlightNumberSearch(values: FlightNumberSearchValues) {
    const found = searchFlightsByNumber(values.flightInput, values.date);
    setResults(found);
    setSearched(true);
  }

  function handleRouteSearch(values: RouteSearchValues) {
    const found = searchFlightsByRoute(values.origin, values.destination, values.date);
    setResults(found);
    setSearched(true);
  }

  function switchMode(newMode: FlightStatusSearchMode) {
    setMode(newMode);
    setResults([]);
    setSearched(false);
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-aether-900/40"
            aria-hidden="true"
          >
            <PlaneIcon className="h-5 w-5 text-aether-400" />
          </div>
          <div>
            <Typography as="h1" variant="heading-xl" className="text-white">
              Flight Status
            </Typography>
            <Typography variant="body-sm" color="muted">
              Check real-time operational status for AetherAirways flights.
            </Typography>
          </div>
        </div>

        {/* Demo notice */}
        <div className="mb-6 rounded-xl border border-amber-700/40 bg-amber-900/20 px-4 py-2.5 text-xs text-amber-400">
          <strong>Demo mode:</strong> Statuses are simulated and updated relative to the current time.
          Available flights: AE 201, AE 211, AE 305, AE 412, AE 501, AE 607, AE 999.
        </div>

        {/* Search card */}
        <div className="rounded-2xl border border-neutral-800 bg-card p-6">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Search mode"
            className="mb-6 flex gap-1 rounded-xl border border-neutral-800 bg-neutral-950/40 p-1"
          >
            {(["flight_number", "route"] as FlightStatusSearchMode[]).map((m) => (
              <button
                key={m}
                role="tab"
                type="button"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={cn(
                  "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500",
                  mode === m
                    ? "bg-aether-900/60 text-aether-300"
                    : "text-neutral-500 hover:text-neutral-300"
                )}
              >
                {m === "flight_number" ? "By flight number" : "By route"}
              </button>
            ))}
          </div>

          {/* Form panel */}
          <div role="tabpanel" aria-label={mode === "flight_number" ? "Flight number search" : "Route search"}>
            {mode === "flight_number" ? (
              <FlightNumberSearchForm onSearch={handleFlightNumberSearch} />
            ) : (
              <RouteSearchForm onSearch={handleRouteSearch} />
            )}
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div className="mt-6">
            <FlightStatusResults results={results} searched={searched} />
          </div>
        )}
      </div>
    </div>
  );
}
