"use client";
import dynamic from "next/dynamic";

export const FlightStatusLoader = dynamic(
  () => import("./flight-status-page").then((m) => ({ default: m.FlightStatusPage })),
  { ssr: false }
);
