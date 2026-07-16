import { TripDetailsLoader } from "@/features/trips/components/trip-details-loader";

interface PageProps {
  params: Promise<{ bookingRef: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { bookingRef } = await params;
  return {
    title: `Trip ${bookingRef} | AetherAirways`,
  };
}

export default async function TripDetailPage({ params }: PageProps) {
  const { bookingRef } = await params;
  return <TripDetailsLoader bookingRef={bookingRef} />;
}
