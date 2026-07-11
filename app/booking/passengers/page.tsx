import type { Metadata } from "next";
import { PassengersPageLoader } from "@/features/booking/components/passengers-page-loader";

export const metadata: Metadata = {
  title: "Passenger Details — AetherAirways",
  description: "Enter passenger information for your AetherAirways booking.",
};

export default function PassengersPage() {
  return <PassengersPageLoader />;
}
