import { Navbar } from "@/shared/layout/navbar";
import { HeroSection } from "@/features/marketing";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        {/* Next sections: Popular Destinations, Featured Offers, etc. */}
      </main>
    </>
  );
}
