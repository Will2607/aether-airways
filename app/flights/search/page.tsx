import type { Metadata } from "next";
import { FlightResultsPage } from "@/features/flights/components/flight-results";

export const metadata: Metadata = {
  title: "Search Results — AetherAirways",
  description: "Find and compare flights on AetherAirways.",
};

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Flight search results page.
 *
 * URL params:
 *   origin       — IATA origin code          (default: BOG)
 *   destination  — IATA destination code     (default: MIA)
 *   date         — Departure date YYYY-MM-DD (default: today)
 *   returnDate   — Return date for round-trip
 *   cabin        — economy | premium_economy | business | first
 *   adults       — integer ≥ 1
 *   children     — integer ≥ 0
 *   infants      — integer ≥ 0
 *   tripType     — one_way | round_trip | multi_city
 *
 * Example:
 *   /flights/search?origin=BOG&destination=MIA&date=2026-08-15&cabin=economy&adults=1
 */
export default async function FlightSearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  return <FlightResultsPage urlParams={params} />;
}
