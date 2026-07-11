"use client";

/**
 * Client Component wrapper that loads BookingReviewPage with `ssr: false`.
 *
 * `next/dynamic` with `ssr: false` is only allowed inside Client Components,
 * so this loader acts as the bridge between the Server Component page
 * and the client-only BookingReviewPage.
 */

import dynamic from "next/dynamic";

const DynamicReviewPage = dynamic(
  () =>
    import("./booking-review-page").then((m) => m.BookingReviewPage),
  { ssr: false }
);

export function BookingReviewLoader() {
  return <DynamicReviewPage />;
}
