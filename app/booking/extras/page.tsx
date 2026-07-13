import type { Metadata } from "next";
import { ExtrasPageLoader } from "@/features/booking/components/extras-page-loader";

export const metadata: Metadata = {
  title: "Extras & Upgrades — AetherAirways",
  description: "Enhance your AetherAirways journey with extras and upgrades.",
};

export default function ExtrasPage() {
  return <ExtrasPageLoader />;
}
