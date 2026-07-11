import type { Metadata } from "next";
import { BookingReviewLoader } from "@/features/booking/components/booking-review-loader";

export const metadata: Metadata = {
  title: "Review Itinerary — AetherAirways",
  description:
    "Review your selected flight and fare before continuing with your booking.",
};

/**
 * /booking/review
 * Delegates rendering to BookingReviewLoader, which uses dynamic(ssr:false)
 * to skip SSR for the sessionStorage-dependent BookingReviewPage.
 */
export default function ReviewPage() {
  return <BookingReviewLoader />;
}
