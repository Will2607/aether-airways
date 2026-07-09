import { Navbar } from "@/shared/layout/navbar";
import { Footer } from "@/shared/layout/footer";
import { HeroSection, FlightSearchSection } from "@/features/marketing";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <FlightSearchSection />
      </main>
      <Footer />
    </>
  );
}
