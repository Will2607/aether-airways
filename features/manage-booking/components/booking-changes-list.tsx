import { cn } from "@/lib/utils";
import type { BookingChange } from "@/features/manage-booking/types";

const TYPE_LABELS: Record<string, string> = {
  contact_updated:        "Contact updated",
  seat_changed:           "Seat changed",
  extra_added:            "Extra added",
  extra_removed:          "Extra removed",
  extra_quantity_changed: "Quantity changed",
};

function PricePill({ amount }: { amount: number }) {
  if (amount === 0) return null;
  const positive = amount > 0;
  return (
    <span
      className={cn(
        "ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
        positive
          ? "bg-red-900/30 text-red-400"
          : "bg-emerald-900/30 text-emerald-400"
      )}
    >
      {positive ? "+" : ""}
      {amount < 0 ? "−" : ""}
      {Math.abs(amount).toFixed(2)}
    </span>
  );
}

interface BookingChangesListProps {
  changes:  BookingChange[];
  currency: string;
}

export function BookingChangesList({ changes, currency }: BookingChangesListProps) {
  if (changes.length === 0) {
    return (
      <p className="text-sm text-neutral-600 italic">No changes to show.</p>
    );
  }

  return (
    <ul className="divide-y divide-neutral-800" aria-label="Pending changes">
      {changes.map((change) => (
        <li key={change.id} className="flex items-start gap-3 py-3">
          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {TYPE_LABELS[change.type] ?? change.type}
            </p>
            <p className="text-sm text-neutral-200">{change.label}</p>
            <p className="text-xs text-neutral-600">
              <span className="line-through">{change.previousValue}</span>
              <span className="mx-1.5 text-neutral-700">→</span>
              <span className="text-neutral-400">{change.nextValue}</span>
            </p>
          </div>
          <PricePill amount={change.priceDifference} />
        </li>
      ))}
      <li className="pt-2 text-right text-xs text-neutral-600">{currency}</li>
    </ul>
  );
}
