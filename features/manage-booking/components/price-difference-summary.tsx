import { cn } from "@/lib/utils";
import type { PriceDiff } from "@/features/manage-booking/types";

function Row({
  label, amount, currency, variant = "neutral",
}: {
  label:    string;
  amount:   number;
  currency: string;
  variant?: "neutral" | "positive" | "negative" | "bold";
}) {
  const amtStr = `${currency} ${Math.abs(amount).toFixed(2)}`;
  const prefix = amount < 0 ? "−" : amount > 0 ? "+" : "";

  return (
    <div
      className={cn(
        "flex items-baseline justify-between py-2 text-sm",
        variant === "bold" && "border-t border-neutral-700 pt-3 mt-1",
      )}
    >
      <span className={cn(
        variant === "bold" ? "font-semibold text-white" : "text-neutral-400"
      )}>
        {label}
      </span>
      <span
        className={cn(
          "font-mono tabular-nums",
          variant === "bold"   ? "font-bold text-white text-base" :
          variant === "positive" ? "text-red-400" :
          variant === "negative" ? "text-emerald-400" :
          "text-neutral-300"
        )}
      >
        {prefix}{amtStr}
      </span>
    </div>
  );
}

interface PriceDifferenceSummaryProps {
  diff:     PriceDiff;
  currency: string;
}

export function PriceDifferenceSummary({ diff, currency }: PriceDifferenceSummaryProps) {
  const hasCredit = diff.removedCredits > 0;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-card px-5 py-4" aria-label="Price summary">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500">
        Price impact
      </h3>

      <Row label="Previous total"   amount={diff.previousTotal}   currency={currency} />
      {diff.addedCharges   > 0 && (
        <Row label="Added services"   amount={diff.addedCharges}   currency={currency} variant="positive" />
      )}
      {diff.removedCredits > 0 && (
        <Row label="Removed services" amount={-diff.removedCredits} currency={currency} variant="negative" />
      )}

      <Row
        label={diff.netDifference >= 0 ? "Amount due" : "Estimated credit"}
        amount={diff.netDifference}
        currency={currency}
        variant={diff.netDifference >= 0 ? "positive" : "negative"}
      />
      <Row label="New total" amount={diff.newTotal} currency={currency} variant="bold" />

      {hasCredit && (
        <p className="mt-3 text-xs text-neutral-600">
          ⚠ Estimated credit is for reference only. No refund is processed in this demo.
        </p>
      )}
    </div>
  );
}
