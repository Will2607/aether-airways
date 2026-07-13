"use client";

import Link from "next/link";
import { Container } from "@/shared/layout/container";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { buttonVariants } from "@/shared/ui/button";
import { ShieldIcon, ChevronLeftIcon, UsersIcon } from "@/shared/icons";
import { useBookingSelection } from "@/features/booking/hooks/use-booking-selection";
import { usePassengerData }    from "@/features/booking/hooks/use-passenger-data";
import { useSeatsData }        from "@/features/booking/hooks/use-seats-data";
import { computePriceSummary } from "@/features/booking/utils/booking.utils";
import { computeSeatFees } from "@/features/booking/utils/seat.utils";
import { formatCurrency }      from "@/features/booking/utils/booking.utils";
import { BookingProgress }     from "./booking-progress";
import { BookingEmpty }        from "./booking-empty";

/* ── Guard states ────────────────────────────────────────────────────────── */

function MissingSeatsState({ target }: { target: string }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="mb-6 h-20 w-20 rounded-2xl bg-aether-900/40 border border-aether-800/40 flex items-center justify-center">
        <UsersIcon className="h-9 w-9 text-aether-400" aria-hidden="true" />
      </div>
      <Typography variant="heading-xl" as="h1" className="mb-3">Step not complete</Typography>
      <Typography variant="body" color="secondary" className="max-w-md mb-8">
        Please complete the previous step before accessing extras.
      </Typography>
      <Link href={target} className={buttonVariants({ variant: "primary", size: "lg" })}>
        Go back and complete
      </Link>
    </section>
  );
}

/* ── Placeholder content ─────────────────────────────────────────────────── */

function ExtrasPlaceholder() {
  const EXTRAS = [
    { id: "bags",    icon: "🧳", label: "Extra Baggage",    desc: "Add checked bags up to 32 kg." },
    { id: "meal",    icon: "🍽️", label: "Meal Selection",   desc: "Choose from vegetarian, halal, standard and more." },
    { id: "lounge",  icon: "🛋️", label: "Lounge Access",    desc: "Relax before your flight in our partner lounges." },
    { id: "travel",  icon: "🛡️", label: "Travel Insurance", desc: "Flexible cancellation and delay coverage." },
    { id: "wifi",    icon: "📶", label: "In-Flight Wi-Fi",  desc: "Stay connected for the whole flight." },
  ];

  return (
    <div className="bg-card border border-neutral-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="primary" size="sm">Coming next phase</Badge>
      </div>
      <Typography variant="heading-lg" className="mb-1">Extras &amp; upgrades</Typography>
      <Typography variant="body-sm" color="secondary" className="mb-6">
        Enhance your journey. These options will be available in the next phase.
      </Typography>

      <div className="grid sm:grid-cols-2 gap-3">
        {EXTRAS.map((extra) => (
          <div
            key={extra.id}
            className="flex gap-3 p-4 rounded-xl border border-neutral-800 bg-surface/50 opacity-60"
            aria-hidden="true"
          >
            <span className="text-2xl shrink-0">{extra.icon}</span>
            <div>
              <Typography variant="label-sm" className="font-semibold text-white">{extra.label}</Typography>
              <Typography variant="caption" color="muted">{extra.desc}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Booking summary card ─────────────────────────────────────────────────── */

function BookingSnapshot({
  route, passengers, seatLabels, total, currency,
}: {
  route:      string;
  passengers: number;
  seatLabels: string[];
  total:      number;
  currency:   string;
}) {
  return (
    <div className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-3">
      <Typography variant="label-lg" className="font-semibold text-white">Your booking</Typography>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <Typography variant="caption" color="muted">Route</Typography>
          <Typography variant="caption" color="secondary">{route}</Typography>
        </div>
        <div className="flex justify-between">
          <Typography variant="caption" color="muted">Passengers</Typography>
          <Typography variant="caption" color="secondary">{passengers}</Typography>
        </div>
        <div className="flex justify-between">
          <Typography variant="caption" color="muted">Seats</Typography>
          <Typography variant="caption" color="secondary">{seatLabels.join(", ")}</Typography>
        </div>
        <div className="flex justify-between border-t border-neutral-800 pt-2 mt-2">
          <Typography variant="label-sm" className="text-white">Current total</Typography>
          <Typography variant="label-lg" color="accent-gold" className="tabular-nums">
            {formatCurrency(total, currency)}
          </Typography>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────────────── */

export function ExtrasPage() {
  const { selection } = useBookingSelection();
  const { savedData } = usePassengerData();
  const { seatsData } = useSeatsData();

  if (!selection) return <BookingEmpty />;
  if (!savedData)  return <MissingSeatsState target="/booking/passengers" />;
  if (!seatsData || seatsData.selections.length === 0) {
    return <MissingSeatsState target="/booking/seats" />;
  }

  const firstLeg    = selection.flight.legs[0]!;
  const lastLeg     = selection.flight.legs[selection.flight.legs.length - 1]!;
  const route       = `${firstLeg.origin.code} → ${lastLeg.destination.code}`;
  const priceSummary = computePriceSummary(selection);
  const seatFees    = computeSeatFees(seatsData.selections);
  const grandTotal  = priceSummary.grandTotal + seatFees;
  const seatLabels  = seatsData.selections.map((s) => s.seatLabel);
  const totalPax    = savedData.passengers.length;

  return (
    <>
      <BookingProgress currentStep="extras" />

      <div className="min-h-screen bg-surface py-8 pb-16">
        <Container size="lg">
          <header className="mb-6">
            <Typography variant="heading-xl" as="h1">Extras &amp; upgrades</Typography>
            <Typography variant="body" color="secondary" className="mt-1">
              Customise your journey with additional services.
            </Typography>
          </header>

          <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">

            <div className="space-y-4">
              <ExtrasPlaceholder />

              <div className="flex gap-3 pt-2">
                <Button
                  variant="ghost" size="lg"
                  onClick={() => history.back()}
                >
                  <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                  Back
                </Button>
                <Button variant="primary" size="lg" disabled className="flex-1 lg:flex-none">
                  <ShieldIcon className="h-4 w-4" aria-hidden="true" />
                  Continue to Payment
                </Button>
              </div>
            </div>

            <BookingSnapshot
              route={route}
              passengers={totalPax}
              seatLabels={seatLabels}
              total={grandTotal}
              currency={priceSummary.currency}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
