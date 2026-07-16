import { UsersIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";
import type {
  BookingConfirmation,
  PassengerDetails,
} from "@/features/booking/types";

const PASSENGER_TYPE_LABELS: Record<string, string> = {
  adult:  "Adult",
  child:  "Child",
  infant: "Infant",
};

function maskDocument(docNumber: string): string {
  if (docNumber.length <= 4) return "••••";
  return `${"•".repeat(docNumber.length - 4)}${docNumber.slice(-4)}`;
}

interface PassengerRowProps {
  passenger:  PassengerDetails;
  index:      number;
  seatLabel?: string;
}

function PassengerRow({ passenger, index, seatLabel }: PassengerRowProps) {
  const typeLabel = PASSENGER_TYPE_LABELS[passenger.passengerType] ?? passenger.passengerType;
  const ordinal   = index + 1;
  const fullName  = [passenger.title, passenger.firstName, passenger.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <li className="flex flex-col gap-1 rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {typeLabel} {ordinal}
        </p>
        <p className="mt-0.5 font-medium text-white">{fullName}</p>
        <p className="text-xs text-neutral-500">
          {passenger.documentType.toUpperCase()} ·{" "}
          {maskDocument(passenger.documentNumber)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {seatLabel && (
          <Badge variant="secondary" size="sm">
            Seat {seatLabel}
          </Badge>
        )}
      </div>
    </li>
  );
}

interface ConfirmationPassengersProps {
  confirmation: BookingConfirmation;
}

export function ConfirmationPassengers({ confirmation }: ConfirmationPassengersProps) {
  const { passengers, seats } = confirmation;

  // passengerId is the passenger's index (as string) — see seats-page.tsx
  const seatByIdx = Object.fromEntries(
    seats.selections.map((s) => [s.passengerId, s.seatLabel])
  );

  const contact = passengers.contact;

  return (
    <section aria-labelledby="conf-passengers-heading" className="space-y-4">
      <div className="flex items-center gap-2">
        <UsersIcon className="h-4 w-4 text-aether-400" aria-hidden="true" />
        <Typography
          as="h2"
          id="conf-passengers-heading"
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
        <p className="text-sm text-neutral-300">{contact.email}</p>
        <p className="text-sm text-neutral-300">
          {contact.countryCode} {contact.phone}
        </p>
      </div>

      {/* Passenger list */}
      <ul className="space-y-2" aria-label="Passenger list">
        {passengers.passengers.map((p, i) => {
          const seatLabel = seatByIdx[String(i)];
          return (
            <PassengerRow key={`${p.firstName}-${p.lastName}-${i}`} passenger={p} index={i} seatLabel={seatLabel} />
          );
        })}
      </ul>
    </section>
  );
}
