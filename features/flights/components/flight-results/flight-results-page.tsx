"use client";

import { useState, useMemo } from "react";
import { Container } from "@/shared/layout/container";
import { useFlightSearch } from "@/features/flights/hooks/use-flight-search";
import {
  parseUrlParams,
  applyFilters,
  sortFlights,
} from "@/features/flights/utils/flight.utils";
import type { FlightActiveFilters, FlightSortOption } from "@/features/flights/types";
import { FlightResultsHeader }   from "./flight-results-header";
import { FlightCard }             from "./flight-card";
import { FlightFilters }          from "./flight-filters";
import { FlightSort }             from "./flight-sort";
import { FlightResultsSkeleton }  from "./flight-results-skeleton";
import { FlightResultsEmpty }     from "./flight-results-empty";
import { FlightResultsError }     from "./flight-results-error";

const DEFAULT_FILTERS: FlightActiveFilters = {
  stops: [],
  maxPrice: null,
  departurePeriods: [],
};

interface FlightResultsPageProps {
  urlParams: Record<string, string | string[] | undefined>;
}

export function FlightResultsPage({ urlParams }: FlightResultsPageProps) {
  const searchParams = useMemo(() => parseUrlParams(urlParams), [urlParams]);

  const [filters, setFilters] = useState<FlightActiveFilters>(DEFAULT_FILTERS);
  const [sort, setSort]       = useState<FlightSortOption>("price_asc");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useFlightSearch(searchParams);

  const visibleFlights = useMemo(() => {
    if (!data) return [];
    return sortFlights(applyFilters(data.outbound, filters), sort);
  }, [data, filters, sort]);

  return (
    <>
      <FlightResultsHeader
        params={searchParams}
        total={data?.totalResults ?? 0}
        showing={visibleFlights.length}
        onToggleFilters={() => setFiltersOpen((v) => !v)}
      />

      {/* Mobile filter overlay */}
      {filtersOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setFiltersOpen(false)}
          aria-hidden="true"
        />
      )}

      <Container size="xl" className="py-6 pb-16">
        <div className="flex gap-6 items-start">

          {/* Filters sidebar */}
          <div
            className={[
              "w-72 shrink-0 transition-all",
              // Mobile: fixed panel, toggled by button
              "fixed left-0 top-0 bottom-0 z-50 overflow-y-auto bg-surface p-6",
              filtersOpen ? "translate-x-0" : "-translate-x-full",
              // Desktop: static sidebar, always visible
              "lg:static lg:translate-x-0 lg:z-auto lg:bg-transparent lg:p-0 lg:overflow-visible",
            ].join(" ")}
          >
            <FlightFilters
              flights={data?.outbound ?? []}
              filters={filters}
              onChange={setFilters}
              onClose={() => setFiltersOpen(false)}
            />
          </div>

          {/* Main results area */}
          <main className="flex-1 min-w-0" aria-label="Flight results">
            {!isLoading && !isError && data && (
              <FlightSort
                value={sort}
                onChange={setSort}
                count={visibleFlights.length}
              />
            )}

            <div className="mt-4 space-y-4">
              {isLoading && <FlightResultsSkeleton />}

              {isError && (
                <FlightResultsError onRetry={() => refetch()} />
              )}

              {!isLoading && !isError && visibleFlights.length === 0 && (
                <FlightResultsEmpty />
              )}

              {!isLoading && !isError &&
                visibleFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    cabinClass={searchParams.cabinClass}
                  />
                ))}
            </div>
          </main>
        </div>
      </Container>
    </>
  );
}
