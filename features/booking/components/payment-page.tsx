"use client";

import Link from "next/link";
import { Container } from "@/shared/layout/container";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { buttonVariants } from "@/shared/ui/button";
import { PlaneIcon, CheckIcon, ChevronLeftIcon, CreditCardIcon } from "@/shared/icons";
import { useBookingSelection } from "@/features/booking/hooks/use-booking-selection";
import { usePassengerData }    from "@/features/booking/hooks/use-passenger-data";
import { useSeatsData }        from "@/features/booking/hooks/use-seats-data";
import { useExtrasData }       from "@/features/booking/hooks/use-extras-data";
import { buildPassengerList, computePriceSummary, formatCurrency } from "@/features/booking/utils/booking.utils";
import { computeSeatFees }     from "@/features/booking/utils/seat.utils";
import { computeExtrasBreakdown } from "@/features/booking/utils/extras.utils";
import { ALL_EXTRAS }          from "@/features/booking/mocks/extras.mock";
import { formatShortDate }     from "@/features/flights/utils/flight.utils";
import { BookingProgress }     from "./booking-progress";
import { BookingEmpty }        from "./booking-empty";

function MissingStepGuard({ target, label }: { target: string; label: string }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <Typography variant="heading-xl" as="h1" className="mb-3">Step not complete</Typography>
      <Typography variant="body" color="secondary" className="max-w-md mb-8">
        Please complete &ldquo;{label}&rdquo; before proceeding to payment.
      </Typography>
      <Link href={target} className={buttonVariants({ variant: "primary", size: "lg" })}>
        Go back and complete
      </Link>
    </section>
  );
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-3">
      <Typography variant="label-lg" className="font-semibold text-white block">{title}</Typography>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <Typography variant="caption" color="muted">{label}</Typography>
      <Typography variant="caption" color="secondary" className="text-right">{value}</Typography>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────────────── */

export function PaymentPage() {
  const { selection }  = useBookingSelection();
  const { savedData }  = usePassengerData();
  const { seatsData }  = useSeatsData();
  const { extrasData } = useExtrasData();

  if (!selection) return <BookingEmpty />;
  if (!savedData)  return <MissingStepGuard target="/booking/passengers" label="Passenger details" />;
  if (!seatsData || seatsData.selections.length === 0) {
    return <MissingStepGuard target="/booking/seats" label="Seat selection" />;
  }

  const passengerList  = buildPassengerList(savedData.passengers);
  const priceSummary   = computePriceSummary(selection);
  const seatFees       = computeSeatFees(seatsData.selections);
  const extrasBreak    = computeExtrasBreakdown(extrasData?.selections ?? [], ALL_EXTRAS);
  const grandTotal     = priceSummary.grandTotal + seatFees + extrasBreak.extrasTotal;
  const { currency }   = priceSummary;
  const firstLeg       = selection.flight.legs[0]!;
  const lastLeg        = selection.flight.legs[selection.flight.legs.length - 1]!;

  return (
    <>
      <BookingProgress currentStep="payment" />

      <div className="min-h-screen bg-surface py-8 pb-16">
        <Container size="lg">
          <header className="mb-6">
            <Typography variant="heading-xl" as="h1">Payment</Typography>
            <Typography variant="body" color="secondary" className="mt-1">
              Review your full booking before completing payment.
            </Typography>
          </header>

          <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
            <div className="space-y-4">

              {/* Flight */}
              <SummaryCard title="Your flight">
                <Row label="Route"    value={`${firstLeg.origin.code} → ${lastLeg.destination.code}`} />
                <Row label="Date"     value={formatShortDate(selection.searchContext.departureDate)} />
                <Row label="Cabin"    value={selection.searchContext.cabin} />
                <Row label="Fare"     value={selection.fare.brand.name} />
                <Row label="Flight"   value={firstLeg.operatingCarrier ?? firstLeg.flightNumber} />
              </SummaryCard>

              {/* Passengers + seats */}
              <SummaryCard title="Passengers">
                {passengerList.map((p) => {
                  const seat = seatsData.selections.find((s) => s.passengerId === p.id);
                  return (
                    <div key={p.id} className="flex justify-between items-center gap-2 py-0.5">
                      <div>
                        <Typography variant="label-sm" className="text-white font-medium">{p.label}</Typography>
                        <Typography variant="caption" color="muted">{p.name}</Typography>
                      </div>
                      {seat && <Badge variant="secondary" size="sm">Seat {seat.seatLabel}</Badge>}
                    </div>
                  );
                })}
              </SummaryCard>

              {/* Extras */}
              {extrasData && extrasData.selections.length > 0 && (
                <SummaryCard title="Extras &amp; upgrades">
                  {extrasData.selections.map((sel, i) => {
                    const extra = ALL_EXTRAS.find((e) => e.id === sel.extraId);
                    if (!extra) return null;
                    const pax = sel.passengerId === "booking"
                      ? "Whole booking"
                      : `${passengerList.find((p) => p.id === sel.passengerId)?.label ?? "Passenger"}`;
                    return (
                      <div key={i} className="flex justify-between gap-2">
                        <div>
                          <Typography variant="caption" color="secondary">{extra.name}</Typography>
                          <Typography variant="caption" color="muted">{pax}{sel.quantity > 1 ? ` × ${sel.quantity}` : ""}</Typography>
                        </div>
                        <Typography variant="caption" color="secondary" className="shrink-0">
                          {sel.priceAtTime === 0 ? "Free" : `+${formatCurrency(sel.priceAtTime * sel.quantity, sel.currency)}`}
                        </Typography>
                      </div>
                    );
                  })}
                </SummaryCard>
              )}

              {/* Payment placeholder */}
              <div className="bg-card border border-neutral-800 rounded-2xl p-6 text-center space-y-3">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-aether-900/40 border border-aether-800/40 flex items-center justify-center">
                  <CreditCardIcon className="h-6 w-6 text-aether-400" aria-hidden="true" />
                </div>
                <Badge variant="primary" size="sm">Coming in next phase</Badge>
                <Typography variant="heading-md">Payment integration</Typography>
                <Typography variant="body-sm" color="secondary" className="max-w-sm mx-auto">
                  Secure payment processing with cards, bank transfers and digital wallets will be available in the next phase.
                </Typography>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" size="lg" onClick={() => history.back()}>
                  <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                  Back
                </Button>
                <Button variant="primary" size="lg" disabled className="flex-1 lg:flex-none">
                  <CreditCardIcon className="h-4 w-4" aria-hidden="true" />
                  Pay {formatCurrency(grandTotal, currency)}
                </Button>
              </div>
            </div>

            {/* Right: price breakdown */}
            <aside className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-4 lg:sticky lg:top-24">
              <div className="flex items-center gap-2">
                <PlaneIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
                <Typography variant="label-lg" className="font-semibold text-white">Total</Typography>
              </div>
              <div className="space-y-2 border-t border-neutral-800 pt-3">
                <Row label={`Fare × ${priceSummary.totalPassengers} pax`} value={formatCurrency(priceSummary.subtotal, currency)} />
                {priceSummary.taxes.map((t) => <Row key={t.label} label={t.label} value={formatCurrency(t.amount, currency)} />)}
                {seatFees > 0 && <Row label="Seat upgrades"      value={`+${formatCurrency(seatFees, currency)}`} />}
                {extrasBreak.extrasTotal > 0 && <Row label="Extras" value={`+${formatCurrency(extrasBreak.extrasTotal, currency)}`} />}
              </div>
              <div className="border-t border-neutral-800 pt-3 flex justify-between items-baseline">
                <Typography variant="label-sm" className="text-white font-semibold">Grand total</Typography>
                <Typography variant="heading-lg" color="accent-gold" className="tabular-nums">
                  {formatCurrency(grandTotal, currency)}
                </Typography>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <CheckIcon className="h-3.5 w-3.5 text-aether-400" aria-hidden="true" />
                <Typography variant="caption" color="muted">All taxes and fees included</Typography>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}
