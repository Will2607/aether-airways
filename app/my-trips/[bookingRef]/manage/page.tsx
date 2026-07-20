import { Suspense } from "react";
import { ManageBookingLoader } from "@/features/manage-booking/components/manage-booking-loader";
import { LoaderIcon } from "@/shared/icons";
import type { Metadata } from "next";

interface Params {
  params: Promise<{ bookingRef: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { bookingRef } = await params;
  return {
    title: `Manage Booking · ${bookingRef.toUpperCase()} | AetherAirways`,
    description: `Modify contact details, seats, and extras for booking ${bookingRef.toUpperCase()}.`,
  };
}

export default async function ManageBookingPage({ params }: Params) {
  const { bookingRef } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <LoaderIcon className="h-8 w-8 animate-spin text-aether-400" aria-hidden="true" />
        </div>
      }
    >
      <ManageBookingLoader bookingRef={bookingRef.toUpperCase()} />
    </Suspense>
  );
}
