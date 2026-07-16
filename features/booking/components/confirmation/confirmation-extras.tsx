import { PackageIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { formatCurrency } from "@/features/booking/utils/booking.utils";
import { ALL_EXTRAS } from "@/features/booking/mocks/extras.mock";
import type { BookingConfirmation, ExtraSelection } from "@/features/booking/types";

interface ConfirmationExtrasProps {
  confirmation: BookingConfirmation;
}

function resolveLabel(selection: ExtraSelection): string {
  const extra = ALL_EXTRAS.find((e) => e.id === selection.extraId);
  return extra?.name ?? selection.extraId;
}

function resolvePrice(selection: ExtraSelection): number {
  const extra = ALL_EXTRAS.find((e) => e.id === selection.extraId);
  return (extra?.price ?? 0) * selection.quantity;
}

export function ConfirmationExtras({ confirmation }: ConfirmationExtrasProps) {
  const selections = confirmation.extras?.selections ?? [];
  const currency   = confirmation.currency;

  if (selections.length === 0) {
    return (
      <section aria-labelledby="conf-extras-heading" className="space-y-3">
        <div className="flex items-center gap-2">
          <PackageIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
          <Typography
            as="h2"
            id="conf-extras-heading"
            variant="label-lg"
            className="font-semibold text-white"
          >
            Extras
          </Typography>
        </div>
        <p className="text-sm text-neutral-500">No extras selected.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="conf-extras-heading" className="space-y-3">
      <div className="flex items-center gap-2">
        <PackageIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
        <Typography
          as="h2"
          id="conf-extras-heading"
          variant="label-lg"
          className="font-semibold text-white"
        >
          Extras
        </Typography>
      </div>

      <ul className="space-y-2" aria-label="Selected extras">
        {selections.map((s) => {
          const label  = resolveLabel(s);
          const price  = resolvePrice(s);
          const forAll = !s.passengerId;

          return (
            <li
              key={`${s.extraId}-${s.passengerId ?? "booking"}`}
              className="flex items-center justify-between rounded-lg border border-neutral-800
                         bg-neutral-950/40 px-4 py-3"
            >
              <div>
                <p className="text-sm text-neutral-200">
                  {label}
                  {s.quantity > 1 && (
                    <span className="ml-1 text-neutral-500">× {s.quantity}</span>
                  )}
                </p>
                {forAll ? (
                  <p className="text-xs text-neutral-500">Entire booking</p>
                ) : (
                  <p className="text-xs text-neutral-500">
                    Passenger {Number(s.passengerId) + 1}
                  </p>
                )}
              </div>
              <p className="text-sm font-medium text-white">
                {price > 0 ? formatCurrency(price, currency) : "Included"}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
