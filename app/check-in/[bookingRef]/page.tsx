import { Suspense } from "react";
import { BoardingPassesLoader } from "@/features/check-in/components/boarding-passes-loader";
import { LoaderIcon } from "@/shared/icons";
import type { Metadata } from "next";

interface Params {
  params: Promise<{ bookingRef: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { bookingRef } = await params;
  return {
    title: `Boarding Passes · ${bookingRef} | AetherAirways`,
    description: `View and print your boarding passes for booking ${bookingRef}.`,
  };
}

export default async function BoardingPassesPage({ params }: Params) {
  const { bookingRef } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <LoaderIcon className="h-8 w-8 animate-spin text-aether-400" aria-hidden="true" />
        </div>
      }
    >
      <BoardingPassesLoader bookingRef={bookingRef.toUpperCase()} />
    </Suspense>
  );
}
