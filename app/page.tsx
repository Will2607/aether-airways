import { Navbar }                     from "@/shared/layout/navbar";
import { Footer }                     from "@/shared/layout/footer";
import {
  HeroSection,
  FlightSearchSection,
  PopularDestinationsSection,
  FeaturedOffersSection,
  WhyChooseSection,
} from "@/features/marketing";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <FlightSearchSection />
        <PopularDestinationsSection />
        <FeaturedOffersSection />
        <WhyChooseSection />
      </main>
      <Footer />
    </>
  );
}
