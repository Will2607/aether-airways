"use client";
import dynamic from "next/dynamic";

const TripDetailsPage = dynamic(
  () => import("./trip-details-page").then((m) => ({ default: m.TripDetailsPage })),
  { ssr: false }
);

interface TripDetailsLoaderProps {
  bookingRef: string;
}

/**
 * Dynamic loader for TripDetailsPage.
 * SSR disabled because the page reads from localStorage on mount.
 * bookingRef comes from the server component (URL params).
 */
export function TripDetailsLoader({ bookingRef }: TripDetailsLoaderProps) {
  return <TripDetailsPage bookingRef={bookingRef} />;
}
