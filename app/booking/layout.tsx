import type { ReactNode } from "react";
import { Navbar } from "@/shared/layout/navbar";
import { Footer } from "@/shared/layout/footer";

export const metadata = {
  title: "Booking — AetherAirways",
  description: "Review and complete your flight booking with AetherAirways.",
};

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
