import { Suspense } from "react";
import { FlightStatusDetailsLoader } from "@/features/flight-status/components/flight-status-details-loader";
import { LoaderIcon } from "@/shared/icons";
import type { Metadata } from "next";

interface Params {
  params: Promise<{ flightNumber: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { flightNumber } = await params;
  return {
    title: `Flight ${flightNumber.toUpperCase()} Status | AetherAirways`,
    description: `Operational status, gate information, and timeline for AetherAirways flight ${flightNumber.toUpperCase()}.`,
  };
}

export default async function FlightStatusDetailsPage({ params }: Params) {
  const { flightNumber } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <LoaderIcon className="h-8 w-8 animate-spin text-aether-400" aria-hidden="true" />
        </div>
      }
    >
      <FlightStatusDetailsLoader flightNumberSlug={flightNumber} />
    </Suspense>
  );
}
