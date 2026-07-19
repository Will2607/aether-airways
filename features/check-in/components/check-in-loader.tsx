"use client";
import dynamic from "next/dynamic";

export const CheckInLoader = dynamic(
  () => import("./check-in-page").then((m) => ({ default: m.CheckInPage })),
  { ssr: false }
);
