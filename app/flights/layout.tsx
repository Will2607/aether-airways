import type { ReactNode } from "react";
import { Navbar } from "@/shared/layout/navbar";
import { Footer } from "@/shared/layout/footer";

export const metadata = {
  title: "Flights — AetherAirways",
};

export default function FlightsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-surface">{children}</div>
      <Footer />
    </>
  );
}
