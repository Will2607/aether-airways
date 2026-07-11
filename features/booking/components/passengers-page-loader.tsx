"use client";

import dynamic from "next/dynamic";

const DynamicPassengersPage = dynamic(
  () => import("./passengers-page").then((m) => m.PassengersPage),
  { ssr: false }
);

export function PassengersPageLoader() {
  return <DynamicPassengersPage />;
}
