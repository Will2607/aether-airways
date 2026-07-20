import { Suspense } from "react";
import { FlightStatusLoader } from "@/features/flight-status/components/flight-status-loader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Status | AetherAirways",
  description: "Check operational status, departure times, and gate information for AetherAirways flights.",
};

export default function FlightStatusPage() {
  return (
    <Suspense>
      <FlightStatusLoader />
    </Suspense>
  );
}
