"use client";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { FlightStatusDetailsPage } from "./flight-status-details-page";

type Props = ComponentProps<typeof FlightStatusDetailsPage>;

export const FlightStatusDetailsLoader = dynamic<Props>(
  () => import("./flight-status-details-page").then((m) => ({ default: m.FlightStatusDetailsPage })),
  { ssr: false }
);
