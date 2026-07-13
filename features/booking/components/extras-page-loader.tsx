"use client";

import dynamic from "next/dynamic";

const DynamicExtrasPage = dynamic(
  () => import("./extras-page").then((m) => m.ExtrasPage),
  { ssr: false }
);

export function ExtrasPageLoader() {
  return <DynamicExtrasPage />;
}
