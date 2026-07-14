"use client";

import dynamic from "next/dynamic";

const DynamicPaymentPage = dynamic(
  () => import("./payment-page").then((m) => m.PaymentPage),
  { ssr: false }
);

export function PaymentPageLoader() {
  return <DynamicPaymentPage />;
}
