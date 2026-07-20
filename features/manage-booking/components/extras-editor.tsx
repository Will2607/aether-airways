"use client";
import { PlusIcon, MinusIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { ALL_EXTRAS } from "@/features/booking/mocks/extras.mock";
import type { StoredBooking } from "@/features/trips/types";
import type { ExtraDraftEntry } from "@/features/manage-booking/types";
import type { BookingExtra } from "@/features/booking/types";

const CATEGORY_LABELS: Record<string, string> = {
  baggage:            "Baggage",
  "priority-boarding": "Priority boarding",
  meal:               "Meals",
  lounge:             "Lounge access",
  insurance:          "Insurance",
};

/* ── Quantity control ────────────────────────────────────────────────────── */

function QuantityControl({
  qty, max, onIncrease, onDecrease, label,
}: {
  qty: number; max: number; onIncrease: () => void; onDecrease: () => void; label: string;
}) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={qty <= 0}
        aria-label={`Decrease ${label}`}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-700 text-neutral-400 transition-colors hover:border-neutral-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500"
      >
        <MinusIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span className="w-5 text-center text-sm font-semibold text-white tabular-nums">{qty}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={qty >= max}
        aria-label={`Increase ${label}`}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-700 text-neutral-400 transition-colors hover:border-neutral-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500"
      >
        <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

/* ── Extra row ───────────────────────────────────────────────────────────── */

function ExtraRow({
  extra, passengerLabel, qty, onChange,
}: {
  extra:          BookingExtra;
  passengerLabel: string;
  qty:            number;
  onChange:       (qty: number) => void;
}) {
  const max = extra.maxQuantity ?? 5;
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-200 truncate">{extra.name}</p>
        {passengerLabel && (
          <p className="text-xs text-neutral-600">{passengerLabel}</p>
        )}
        <p className="mt-0.5 text-xs text-aether-400 font-semibold">
          {extra.price > 0 ? `${extra.currency} ${extra.price.toFixed(2)}/unit` : "Included"}
        </p>
      </div>
      <QuantityControl
        qty={qty}
        max={max}
        onIncrease={() => onChange(qty + 1)}
        onDecrease={() => onChange(Math.max(0, qty - 1))}
        label={extra.name}
      />
    </div>
  );
}

/* ── Main extras editor ──────────────────────────────────────────────────── */

interface ExtrasEditorProps {
  booking:         StoredBooking;
  extrasDraft:     ExtraDraftEntry[];
  onQuantityChange: (
    extraId:     string,
    passengerId: string,
    qty:         number,
    priceAtTime: number,
    currency:    string
  ) => void;
}

export function ExtrasEditor({ booking, extrasDraft, onQuantityChange }: ExtrasEditorProps) {
  const passengers = booking.passengers.passengers;
  const available = ALL_EXTRAS.filter((e) => e.availability === "available");

  // Get quantity for an extra + passenger combo
  function getQty(extraId: string, passengerId: string): number {
    return extrasDraft.find((e) => e.extraId === extraId && e.passengerId === passengerId)?.quantity ?? 0;
  }

  // Group extras by category
  const categories = [...new Set(available.map((e) => e.category))];

  return (
    <section aria-labelledby="extras-editor-heading" className="space-y-6">
      <div>
        <h2 id="extras-editor-heading" className="text-lg font-semibold text-white">
          Manage extras
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Add, remove, or adjust quantities. Pricing shown is per unit. Changes take effect on the Review step.
        </p>
      </div>

      {categories.map((category) => {
        const categoryExtras = available.filter((e) => e.category === category);
        return (
          <div key={category} className="rounded-2xl border border-neutral-800 bg-card overflow-hidden">
            <div className="border-b border-neutral-800 px-5 py-3">
              <Typography variant="label-lg" className="font-semibold text-white">
                {CATEGORY_LABELS[category] ?? category}
              </Typography>
            </div>

            <div className="divide-y divide-neutral-800 px-5">
              {categoryExtras.map((extra) => {
                if (extra.selectablePerPassenger) {
                  return passengers.map((p, i) => {
                    const paxId = String(i);
                    const qty   = getQty(extra.id, paxId);
                    const paxLabel = `${p.firstName} ${p.lastName}`;
                    return (
                      <ExtraRow
                        key={`${extra.id}-${paxId}`}
                        extra={extra}
                        passengerLabel={paxLabel}
                        qty={qty}
                        onChange={(q) =>
                          onQuantityChange(extra.id, paxId, q, extra.price, extra.currency)
                        }
                      />
                    );
                  });
                }

                const qty = getQty(extra.id, "booking");
                return (
                  <ExtraRow
                    key={`${extra.id}-booking`}
                    extra={extra}
                    passengerLabel=""
                    qty={qty}
                    onChange={(q) =>
                      onQuantityChange(extra.id, "booking", q, extra.price, extra.currency)
                    }
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
