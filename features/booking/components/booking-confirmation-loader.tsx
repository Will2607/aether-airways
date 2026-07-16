"use client";
import dynamic from "next/dynamic";

/**
 * Dynamic loader for BookingConfirmationPage.
 * SSR disabled because the component reads from sessionStorage on mount.
 */
const BookingConfirmationPage = dynamic(
  () =>
    import("./booking-confirmation-page").then((m) => ({
      default: m.BookingConfirmationPage,
    })),
  { ssr: false }
);

export function BookingConfirmationLoader() {
  return <BookingConfirmationPage />;
}
