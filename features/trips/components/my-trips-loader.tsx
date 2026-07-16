"use client";
import dynamic from "next/dynamic";

/**
 * Dynamic loader for MyTripsPage.
 * SSR disabled because the page reads from localStorage on mount.
 */
const MyTripsPage = dynamic(
  () => import("./my-trips-page").then((m) => ({ default: m.MyTripsPage })),
  { ssr: false }
);

export function MyTripsLoader() {
  return <MyTripsPage />;
}
