import { UsersIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import type { PassengerFormData, SeatSelectionData } from "@/features/booking/types";

const PASSENGER_TYPE_LABELS: Record<string, string> = {
  adult:  "Adult",
  child:  "Child",
  infant: "Infant",
};

/** Mask a document number to show only last 4 chars. */
function maskDoc(doc: string): string {
  if (doc.length <= 4) return "••••";
  return `${"•".repeat(Math.min(doc.length - 4, 8))}${doc.slice(-4)}`;
}

interface PassengersSummaryProps {
  passengers: PassengerFormData;
  seats:      SeatSelectionData;
}

export function PassengersSummary({ passengers, seats }: PassengersSummaryProps) {
  const seatByIdx = Object.fromEntries(
    seats.selections.map((s) => [s.passengerId, s.seatLabel])
  );

  return (
    <section aria-labelledby="trip-passengers-heading" className="space-y-4">
      <div className="flex items-center gap-2">
        <UsersIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
        <Typography
          as="h2"
          id="trip-passengers-heading"
          variant="label-lg"
          className="font-semibold text-white"
        >
          Passengers
        </Typography>
      </div>

      {/* Contact info */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
          Contact
        </p>
        <p className="text-sm text-neutral-300">{passengers.contact.email}</p>
        <p className="text-sm text-neutral-300">
          {passengers.contact.countryCode} {passengers.contact.phone}
        </p>
      </div>

      {/* Passenger list */}
      <ul className="space-y-2" aria-label="Passenger list">
        {passengers.passengers.map((p, i) => {
          const typeLabel = PASSENGER_TYPE_LABELS[p.passengerType] ?? p.passengerType;
          const seatLabel = seatByIdx[String(i)];
          const fullName  = [p.title, p.firstName, p.lastName].filter(Boolean).join(" ");

          return (
            <li
              key={`${p.firstName}-${p.lastName}-${i}`}
              className="flex flex-col gap-1 rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {typeLabel} {i + 1}
                </p>
                <p className="mt-0.5 font-medium text-white">{fullName}</p>
                {/* Document partially masked — never show full number */}
                <p className="text-xs text-neutral-500">
                  {p.documentType.toUpperCase()} · {maskDoc(p.documentNumber)}
                </p>
              </div>
              {seatLabel && (
                <Badge variant="secondary" size="sm">
                  Seat {seatLabel}
                </Badge>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
