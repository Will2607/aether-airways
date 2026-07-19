import { Suspense } from "react";
import { CheckInLoader } from "@/features/check-in/components/check-in-loader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Check-in | AetherAirways",
  description: "Check in for your AetherAirways flight and access your boarding passes.",
};

export default function CheckInPage() {
  return (
    <Suspense>
      <CheckInLoader />
    </Suspense>
  );
}
