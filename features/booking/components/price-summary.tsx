import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { ShieldIcon } from "@/shared/icons";
import { formatCurrency } from "@/features/booking/utils/booking.utils";
import type { BookingPriceSummary } from "@/features/booking/types";
import type { Fare } from "@/features/flights/types";

/* ── Passenger price row ────────────────────────────────────────────────── */

function PassengerRow({
  label, count, farePerPerson, currency,
}: {
  label: string; count: number; farePerPerson: number; currency: string;
}) {
  if (count === 0) return null;
  return (
    <div className="flex justify-between items-baseline">
      <Typography variant="body-sm" color="secondary">{label} × {count}</Typography>
      <Typography variant="label-sm" className="text-white tabular-nums">
        {formatCurrency(farePerPerson * count, currency)}
      </Typography>
    </div>
  );
}

/* ── Tax row ────────────────────────────────────────────────────────────── */

function TaxRow({ label, amount, currency }: { label: string; amount: number; currency: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <Typography variant="caption" color="muted">{label}</Typography>
      <Typography variant="caption" color="secondary" className="tabular-nums">
        {formatCurrency(amount, currency)}
      </Typography>
    </div>
  );
}

/* ── PriceSummary ───────────────────────────────────────────────────────── */

interface PriceSummaryProps {
  summary: BookingPriceSummary;
  fare: Fare;
  onContinue?: () => void;
}

export function PriceSummary({ summary, fare, onContinue }: PriceSummaryProps) {
  const { farePerPerson, currency, passengers, subtotal, taxes, grandTotal } = summary;

  return (
    <aside className="space-y-4" aria-label="Price breakdown">
      {/* ── Price card ─────────────────────────────────────────────── */}
      <div className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="heading-md" as="h2">Price summary</Typography>
          <Badge variant="primary" size="sm">{fare.brand.name}</Badge>
        </div>

        {/* Per person headline */}
        <div className="flex items-baseline justify-between pb-4 border-b border-neutral-800">
          <Typography variant="body-sm" color="secondary">Fare per person</Typography>
          <Typography variant="heading-lg" color="accent-gold" className="tabular-nums">
            {formatCurrency(farePerPerson, currency)}
          </Typography>
        </div>

        {/* Passenger breakdown */}
        <div className="space-y-2.5">
          <PassengerRow label="Adult"   count={passengers.adults}   farePerPerson={farePerPerson} currency={currency} />
          <PassengerRow label="Child"   count={passengers.children} farePerPerson={farePerPerson} currency={currency} />
          <PassengerRow label="Infant"  count={passengers.infants}  farePerPerson={farePerPerson} currency={currency} />
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-baseline pt-3 border-t border-neutral-800">
          <Typography variant="label-sm" color="secondary">Subtotal</Typography>
          <Typography variant="label-lg" className="text-white tabular-nums">
            {formatCurrency(subtotal, currency)}
          </Typography>
        </div>

        {/* Taxes */}
        <div className="space-y-2">
          {taxes.map((t) => (
            <TaxRow key={t.label} label={t.label} amount={t.amount} currency={currency} />
          ))}
        </div>

        {/* Grand total */}
        <div className="flex justify-between items-end pt-4 border-t border-aether-900/60">
          <Typography variant="label-lg" className="font-bold text-white">Total</Typography>
          <div className="text-right">
            <Typography variant="heading-xl" color="accent-gold" className="tabular-nums leading-none block">
              {formatCurrency(grandTotal, currency)}
            </Typography>
            <Typography variant="caption" color="muted">all taxes included</Typography>
          </div>
        </div>
      </div>

      {/* ── Continue CTA ───────────────────────────────────────────── */}
      <div className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-3">
        <Button
          variant="primary" size="lg" className="w-full"
          onClick={onContinue}
          aria-label="Continue to passenger details"
        >
          Continue to Passengers
        </Button>
      </div>

      {/* ── Low seats warning ──────────────────────────────────────── */}
      {fare.seatsAvailable <= 4 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3">
          <Typography variant="caption" className="text-amber-400">
            ⚠ Only {fare.seatsAvailable} seat{fare.seatsAvailable > 1 ? "s" : ""} left at this price.
          </Typography>
        </div>
      )}

      {/* ── Trust badge ────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 justify-center py-1">
        <ShieldIcon className="h-4 w-4 text-neutral-600" aria-hidden="true" />
        <Typography variant="caption" color="muted">Secure checkout · No hidden fees</Typography>
      </div>
    </aside>
  );
}
