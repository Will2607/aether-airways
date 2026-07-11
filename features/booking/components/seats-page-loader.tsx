"use client";

import dynamic from "next/dynamic";

const DynamicSeatsPage = dynamic(
  () => import("./seats-page").then((m) => m.SeatsPage),
  { ssr: false }
);

export function SeatsPageLoader() {
  return <DynamicSeatsPage />;
}
