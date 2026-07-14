import { Typography } from "@/shared/ui/typography";
import { PlaneIcon } from "@/shared/icons";
import { formatCurrency } from "@/features/booking/utils/booking.utils";
import type { BookingPriceSummary, ExtrasBreakdown } from "@/features/booking/types";

interface ExtrasPriceSummaryProps {
  priceSummary: BookingPriceSummary;
  seatFees:     number;
  breakdown:    ExtrasBreakdown;
}

interface LineItemProps {
  label:  string;
  value:  string;
  muted?: boolean;
  bold?:  boolean;
  accent?: boolean;
}

function LineItem({ label, value, muted, bold, accent }: LineItemProps) {
  return (
    <div className="flex justify-between items-baseline gap-2">
      <Typography
        variant="caption"
        color={muted ? "muted" : "secondary"}
        className={bold ? "font-semibold text-white" : ""}
      >
        {label}
      </Typography>
      <Typography
        variant={bold ? "label-lg" : "caption"}
        color={accent ? "accent-gold" : muted ? "muted" : "secondary"}
        className="tabular-nums shrink-0"
      >
        {value}
      </Typography>
    </div>
  );
}

export function ExtrasPriceSummary({ priceSummary, seatFees, breakdown }: ExtrasPriceSummaryProps) {
  const { currency } = priceSummary;
  const grandTotal   = priceSummary.grandTotal + seatFees + breakdown.extrasTotal;

  return (
    <aside
      className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-4 lg:sticky lg:top-24"
      aria-label="Price summary"
    >
      <div className="flex items-center gap-2">
        <PlaneIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
        <Typography variant="label-lg" className="font-semibold text-white">
          Price summary
        </Typography>
      </div>

      {/* Fare + taxes */}
      <div className="space-y-2 border-t border-neutral-800 pt-3">
        <LineItem
          label={`Fare × ${priceSummary.totalPassengers} passenger${priceSummary.totalPassengers > 1 ? "s" : ""}`}
          value={formatCurrency(priceSummary.subtotal, currency)}
        />
        {priceSummary.taxes.map((t) => (
          <LineItem key={t.label} label={t.label} value={formatCurrency(t.amount, currency)} muted />
        ))}
      </div>

      {/* Seat fees */}
      {seatFees > 0 && (
        <div className="border-t border-neutral-800 pt-3">
          <LineItem
            label="Seat upgrades"
            value={`+${formatCurrency(seatFees, currency)}`}
          />
        </div>
      )}

      {/* Extras breakdown */}
      {breakdown.extrasTotal > 0 && (
        <div className="space-y-2 border-t border-neutral-800 pt-3">
          <Typography variant="caption" color="muted" className="block mb-1">
            Extras &amp; upgrades
          </Typography>
          {breakdown.baggageFees   > 0 && <LineItem label="Extra baggage"     value={`+${formatCurrency(breakdown.baggageFees,   currency)}`} muted />}
          {breakdown.mealFees      > 0 && <LineItem label="Meals"             value={`+${formatCurrency(breakdown.mealFees,      currency)}`} muted />}
          {breakdown.priorityFees  > 0 && <LineItem label="Priority boarding" value={`+${formatCurrency(breakdown.priorityFees,  currency)}`} muted />}
          {breakdown.loungeFees    > 0 && <LineItem label="Lounge access"     value={`+${formatCurrency(breakdown.loungeFees,    currency)}`} muted />}
          {breakdown.insuranceFees > 0 && <LineItem label="Travel insurance"  value={`+${formatCurrency(breakdown.insuranceFees, currency)}`} muted />}
        </div>
      )}

      {breakdown.extrasTotal === 0 && seatFees === 0 && (
        <div className="border-t border-neutral-800 pt-3">
          <Typography variant="caption" color="muted" className="italic">
            No upgrades selected yet.
          </Typography>
        </div>
      )}

      {/* Grand total */}
      <div className="border-t border-neutral-800 pt-3 space-y-1">
        <div className="flex justify-between items-baseline">
          <Typography variant="label-sm" className="text-white font-semibold">Total</Typography>
          <Typography variant="heading-lg" color="accent-gold" className="tabular-nums">
            {formatCurrency(grandTotal, currency)}
          </Typography>
        </div>
        <Typography variant="caption" color="muted">All taxes and fees included</Typography>
      </div>
    </aside>
  );
}
