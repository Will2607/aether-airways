import { PackageIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { formatCurrency } from "@/features/booking/utils/booking.utils";
import { ALL_EXTRAS } from "@/features/booking/mocks/extras.mock";
import type { ExtrasSelectionData, ExtraSelection } from "@/features/booking/types";

function resolveExtraLabel(sel: ExtraSelection): string {
  return ALL_EXTRAS.find((e) => e.id === sel.extraId)?.name ?? sel.extraId;
}

function resolveExtraPrice(sel: ExtraSelection): number {
  const price = ALL_EXTRAS.find((e) => e.id === sel.extraId)?.price ?? 0;
  return price * sel.quantity;
}

interface ExtrasSummaryProps {
  extras:   ExtrasSelectionData | null;
  currency: string;
}

export function ExtrasSummary({ extras, currency }: ExtrasSummaryProps) {
  const selections = extras?.selections ?? [];

  return (
    <section aria-labelledby="trip-extras-heading" className="space-y-3">
      <div className="flex items-center gap-2">
        <PackageIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
        <Typography
          as="h2"
          id="trip-extras-heading"
          variant="label-lg"
          className="font-semibold text-white"
        >
          Extras
        </Typography>
      </div>

      {selections.length === 0 ? (
        <p className="text-sm text-neutral-500">No extras selected.</p>
      ) : (
        <ul className="space-y-2" aria-label="Selected extras">
          {selections.map((s) => {
            const label = resolveExtraLabel(s);
            const price = resolveExtraPrice(s);
            const forAll = !s.passengerId;

            return (
              <li
                key={`${s.extraId}-${s.passengerId ?? "booking"}`}
                className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm text-neutral-200">
                    {label}
                    {s.quantity > 1 && (
                      <span className="ml-1 text-neutral-500">× {s.quantity}</span>
                    )}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {forAll ? "Entire booking" : `Passenger ${Number(s.passengerId) + 1}`}
                  </p>
                </div>
                <p className="text-sm font-medium text-white">
                  {price > 0 ? formatCurrency(price, currency) : "Included"}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
