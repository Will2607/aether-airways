"use client";

import { useQuery } from "@tanstack/react-query";
import { searchFlights } from "@/features/flights/services/flight-search.service";
import type { FlightSearchParams, FlightSearchResponse } from "@/features/flights/types";

/**
 * Hook for fetching flight search results.
 *
 * - Uses TanStack Query for caching, loading and error states.
 * - Pass null to disable the query (e.g., while form is incomplete).
 * - Results are cached for 5 minutes per unique search params.
 */
export function useFlightSearch(params: FlightSearchParams | null) {
  return useQuery<FlightSearchResponse, Error>({
    queryKey: ["flight-search", params],
    queryFn:  () => searchFlights(params!),
    enabled:  params !== null,
    staleTime: 5 * 60 * 1000,   // 5 min
    gcTime:   10 * 60 * 1000,   // 10 min
    retry: 1,
  });
}
