"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/shared/layout/container";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { buttonVariants } from "@/shared/ui/button";
import {
  ChevronLeftIcon, UsersIcon,
  PackageIcon, ZapIcon, UtensilsIcon, CoffeeIcon, ShieldIcon,
} from "@/shared/icons";
import Link from "next/link";
import { useBookingSelection } from "@/features/booking/hooks/use-booking-selection";
import { usePassengerData }    from "@/features/booking/hooks/use-passenger-data";
import { useSeatsData }        from "@/features/booking/hooks/use-seats-data";
import { extrasService }       from "@/features/booking/services/extras.service";
import { buildPassengerList, computePriceSummary } from "@/features/booking/utils/booking.utils";
import { computeSeatFees }     from "@/features/booking/utils/seat.utils";
import {
  setExtraQty, selectMealForPassenger, toggleBookingExtra, computeExtrasBreakdown,
} from "@/features/booking/utils/extras.utils";
import {
  ALL_EXTRAS, EXTRAS_BY_CATEGORY, MEAL_EXTRA_IDS, INSURANCE_EXTRA_IDS,
} from "@/features/booking/mocks/extras.mock";
import { BookingProgress }       from "./booking-progress";
import { BookingEmpty }          from "./booking-empty";
import { ExtraCategorySection, type CategoryConfig } from "./extras/extra-category-section";
import { ExtraOptionCard }       from "./extras/extra-option-card";
import { ExtrasPriceSummary }    from "./extras/extras-price-summary";
import type { ExtraSelection }   from "@/features/booking/types";

/* ── Category configuration ─────────────────────────────────────────────── */

const CATEGORIES: CategoryConfig[] = [
  { id: "baggage",           label: "Extra Baggage",     description: "Add checked bags beyond your allowance.",      icon: PackageIcon   },
  { id: "priority-boarding", label: "Priority Boarding", description: "Board first and settle in with ease.",          icon: ZapIcon       },
  { id: "meal",              label: "Meal Selection",    description: "Pre-order your preferred in-flight meal.",      icon: UtensilsIcon  },
  { id: "lounge",            label: "Lounge Access",     description: "Relax with complimentary food and Wi-Fi.",      icon: CoffeeIcon    },
  { id: "insurance",         label: "Travel Insurance",  description: "Protect your trip with flexible coverage.",     icon: ShieldIcon    },
];

/* ── Guard component ─────────────────────────────────────────────────────── */

function MissingStepState({ target, label }: { target: string; label: string }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-16">
      <div className="mb-6 h-20 w-20 rounded-2xl bg-aether-900/40 border border-aether-800/40 flex items-center justify-center">
        <UsersIcon className="h-9 w-9 text-aether-400" aria-hidden="true" />
      </div>
      <Typography variant="heading-xl" as="h1" className="mb-3">Step not complete</Typography>
      <Typography variant="body" color="secondary" className="max-w-md mb-8">
        Please complete &ldquo;{label}&rdquo; before accessing extras.
      </Typography>
      <Link href={target} className={buttonVariants({ variant: "primary", size: "lg" })}>
        Go back and complete
      </Link>
    </section>
  );
}

/* ── Main page ───────────────────────────────────────────────────────────── */

export function ExtrasPage() {
  const router             = useRouter();
  const { selection }      = useBookingSelection();
  const { savedData }      = usePassengerData();
  const { seatsData }      = useSeatsData();

  /* All hooks declared unconditionally */
  const [selections, setSelections] = useState<ExtraSelection[]>(
    () => extrasService.get()?.selections ?? []
  );

  const passengerList = useMemo(
    () => (savedData ? buildPassengerList(savedData.passengers) : []),
    [savedData]
  );

  /* Persist on every selections change */
  useEffect(() => {
    const extrasTotal = computeExtrasBreakdown(selections, ALL_EXTRAS).extrasTotal;
    extrasService.save({ savedAt: new Date().toISOString(), selections, extrasTotal });
  }, [selections]);

  /* ── Selection handlers ─────────────────────────────────────────────── */

  function handleQuantityChange(extraId: string, passengerId: string, qty: number) {
    const extra = ALL_EXTRAS.find((e) => e.id === extraId);
    if (!extra) return;
    setSelections((prev) => setExtraQty(prev, extra, passengerId, qty));
  }

  function handleMealSelect(extraId: string, passengerId: string) {
    const extra = ALL_EXTRAS.find((e) => e.id === extraId);
    if (!extra) return;
    setSelections((prev) => selectMealForPassenger(prev, extra, passengerId, MEAL_EXTRA_IDS));
  }

  function handleBookingToggle(extraId: string) {
    const extra = ALL_EXTRAS.find((e) => e.id === extraId);
    if (!extra) return;
    setSelections((prev) => toggleBookingExtra(prev, extra, INSURANCE_EXTRA_IDS));
  }

  /* ── Guard renders (AFTER all hooks) ───────────────────────────────── */

  if (!selection) return <BookingEmpty />;
  if (!savedData)  return <MissingStepState target="/booking/passengers" label="Passenger details" />;
  if (!seatsData || seatsData.selections.length === 0) {
    return <MissingStepState target="/booking/seats" label="Seat selection" />;
  }

  const priceSummary = computePriceSummary(selection);
  const seatFees     = computeSeatFees(seatsData.selections);
  const breakdown    = computeExtrasBreakdown(selections, ALL_EXTRAS);

  return (
    <>
      <BookingProgress currentStep="extras" />

      <div className="min-h-screen bg-surface py-8 pb-16">
        <Container size="lg">
          {/* Header */}
          <header className="mb-6">
            <Typography variant="heading-xl" as="h1">Extras &amp; upgrades</Typography>
            <Typography variant="body" color="secondary" className="mt-1">
              All extras are optional — you can continue without selecting any.
            </Typography>
          </header>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">

            {/* ── Left: categories ──────────────────────────────────── */}
            <div className="space-y-8">
              {CATEGORIES.map((cat) => (
                <ExtraCategorySection key={cat.id} config={cat}>
                  {EXTRAS_BY_CATEGORY[cat.id].map((extra) => (
                    <ExtraOptionCard
                      key={extra.id}
                      extra={extra}
                      passengers={passengerList}
                      selections={selections}
                      onQuantityChange={(pid, qty) => handleQuantityChange(extra.id, pid, qty)}
                      onMealSelect={(pid) => handleMealSelect(extra.id, pid)}
                      onBookingToggle={() => handleBookingToggle(extra.id)}
                    />
                  ))}
                </ExtraCategorySection>
              ))}

              {/* Navigation */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => router.push("/booking/seats")}
                >
                  <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 lg:flex-none"
                  onClick={() => router.push("/booking/payment")}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>

            {/* ── Right: price summary ──────────────────────────────── */}
            <ExtrasPriceSummary
              priceSummary={priceSummary}
              seatFees={seatFees}
              breakdown={breakdown}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
