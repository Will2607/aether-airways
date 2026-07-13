import { Typography } from "@/shared/ui/typography";
import { PlaneIcon } from "@/shared/icons";
import { formatCurrency } from "@/features/booking/utils/booking.utils";
import { computeSeatFees } from "@/features/booking/utils/seat.utils";
import type { BookingPriceSummary, PassengerSeatSelection } from "@/features/booking/types";

interface SeatsPriceSummaryProps {
  summary:    BookingPriceSummary;
  selections: PassengerSeatSelection[];
}

interface LineItemProps {
  label:    string;
  value:    string;
  muted?:   boolean;
  accent?:  boolean;
  bold?:    boolean;
}

function LineItem({ label, value, muted, accent, bold }: LineItemProps) {
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

export function SeatsPriceSummary({ summary, selections }: SeatsPriceSummaryProps) {
  const seatFees   = computeSeatFees(selections);
  const grandTotal = summary.grandTotal + seatFees;

  return (
    <aside
      className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-4"
      aria-label="Price summary"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <PlaneIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
        <Typography variant="label-lg" className="font-semibold text-white">
          Price summary
        </Typography>
      </div>

      {/* Fare breakdown */}
      <div className="space-y-2 border-t border-neutral-800 pt-3">
        <LineItem
          label={`Fare × ${summary.totalPassengers} passenger${summary.totalPassengers > 1 ? "s" : ""}`}
          value={formatCurrency(summary.subtotal, summary.currency)}
        />
        {summary.taxes.map((t) => (
          <LineItem
            key={t.label}
            label={t.label}
            value={formatCurrency(t.amount, summary.currency)}
            muted
          />
        ))}
      </div>

      {/* Seat fees */}
      {seatFees > 0 && (
        <div className="space-y-2 border-t border-neutral-800 pt-3">
          <Typography variant="caption" color="muted" className="block mb-1">
            Seat upgrades
          </Typography>
          {selections
            .filter((s) => s.price.amount > 0)
            .map((s) => (
              <LineItem
                key={s.passengerId}
                label={`${s.passengerLabel} — ${s.seatLabel}`}
                value={`+${formatCurrency(s.price.amount, s.price.currency)}`}
                muted
              />
            ))}
        </div>
      )}

      {/* Grand total */}
      <div className="border-t border-neutral-800 pt-3 space-y-1">
        <div className="flex justify-between items-baseline">
          <Typography variant="label-sm" className="text-white font-semibold">
            Total
          </Typography>
          <Typography variant="heading-lg" color="accent-gold" className="tabular-nums">
            {formatCurrency(grandTotal, summary.currency)}
          </Typography>
        </div>
        <Typography variant="caption" color="muted">
          Taxes and seat fees included
        </Typography>
      </div>
    </aside>
  );
}
