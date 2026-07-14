import type { Metadata } from "next";
import { PaymentPageLoader } from "@/features/booking/components/payment-page-loader";

export const metadata: Metadata = {
  title: "Payment — AetherAirways",
  description: "Complete your AetherAirways booking with secure payment.",
};

export default function PaymentPage() {
  return <PaymentPageLoader />;
}
