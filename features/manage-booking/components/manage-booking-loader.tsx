"use client";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { ManageBookingPage } from "./manage-booking-page";

type Props = ComponentProps<typeof ManageBookingPage>;

export const ManageBookingLoader = dynamic<Props>(
  () => import("./manage-booking-page").then((m) => ({ default: m.ManageBookingPage })),
  { ssr: false }
);
