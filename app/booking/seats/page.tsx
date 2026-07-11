import type { Metadata } from "next";
import { SeatsPageLoader } from "@/features/booking/components/seats-page-loader";

export const metadata: Metadata = {
  title: "Seat Selection — AetherAirways",
  description: "Select your preferred seats for your AetherAirways booking.",
};

export default function SeatsPage() {
  return <SeatsPageLoader />;
}
