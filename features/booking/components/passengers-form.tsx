"use client";

import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Path } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { ChevronLeftIcon } from "@/shared/icons";
import {
  passengerFormSchema,
  type PassengerFormPayload,
} from "@/features/booking/schemas/passenger-form.schema";
import { passengersService } from "@/features/booking/services/passengers.service";
import type { BookingSelection, PassengerFormData, PassengerType } from "@/features/booking/types";
import { ContactSection } from "./contact-section";
import { PassengerCard } from "./passenger-card";
import { BookingSummarySidebar } from "./booking-summary-sidebar";

/* ── Default value builder ──────────────────────────────────────────────── */

function defaultPassenger(type: PassengerType): PassengerFormPayload["passengers"][number] {
  return {
    passengerType: type,
    title: "mr",
    firstName: "", middleName: "", lastName: "",
    dateOfBirth: "", gender: "male", nationality: "",
    documentType: "passport", documentNumber: "", documentExpiry: "",
  };
}

function buildDefaults(selection: BookingSelection): PassengerFormPayload {
  const { adults, children, infants } = selection.searchContext.passengers;
  return {
    contact: { email: "", countryCode: "+1", phone: "" },
    passengers: [
      ...Array.from({ length: adults },   () => defaultPassenger("adult")),
      ...Array.from({ length: children }, () => defaultPassenger("child")),
      ...Array.from({ length: infants },  () => defaultPassenger("infant")),
    ],
  };
}

/* ── Passenger list ─────────────────────────────────────────────────────── */

function buildPassengerEntries(selection: BookingSelection) {
  const { adults, children, infants } = selection.searchContext.passengers;
  const entries: { type: PassengerType; num: number }[] = [
    ...Array.from({ length: adults },   (_, i) => ({ type: "adult"  as const, num: i + 1 })),
    ...Array.from({ length: children }, (_, i) => ({ type: "child"  as const, num: i + 1 })),
    ...Array.from({ length: infants },  (_, i) => ({ type: "infant" as const, num: i + 1 })),
  ];
  return entries;
}

/* ── Focus first error ──────────────────────────────────────────────────── */

function focusFirst(
  setFocus: (name: Path<PassengerFormPayload>) => void,
  errors: ReturnType<typeof useForm<PassengerFormPayload>>["formState"]["errors"]
) {
  if (errors.contact?.email)       { setFocus("contact.email");       return; }
  if (errors.contact?.countryCode) { setFocus("contact.countryCode"); return; }
  if (errors.contact?.phone)       { setFocus("contact.phone");       return; }

  const pe = errors.passengers;
  if (!pe || !Array.isArray(pe)) return;
  const passengerFields = [
    "title","firstName","lastName","dateOfBirth",
    "gender","nationality","documentType","documentNumber","documentExpiry",
  ] as const;
  for (let i = 0; i < (pe as unknown[]).length; i++) {
    const row = pe[i] as Record<string, unknown> | undefined;
    if (!row) continue;
    for (const field of passengerFields) {
      if (row[field]) {
        setFocus(`passengers.${i}.${field}` as Path<PassengerFormPayload>);
        return;
      }
    }
  }
}

/* ── Component ──────────────────────────────────────────────────────────── */

interface PassengersFormProps {
  selection: BookingSelection;
  savedData: PassengerFormData | null;
}

export function PassengersForm({ selection, savedData }: PassengersFormProps) {
  const router = useRouter();

  const { adults, children, infants } = selection.searchContext.passengers;
  const totalPassengers = adults + children + infants;

  // Use saved data only if passenger count matches
  const validSaved =
    savedData && savedData.passengers.length === totalPassengers
      ? savedData
      : null;

  const methods = useForm<PassengerFormPayload>({
    resolver: zodResolver(passengerFormSchema),
    defaultValues: validSaved ?? buildDefaults(selection),
    mode: "onTouched",
  });

  const { handleSubmit, setFocus, formState: { errors, isSubmitting } } = methods;
  const passengerEntries = buildPassengerEntries(selection);

  const onValid = (data: PassengerFormPayload) => {
    // Cast is safe: Zod schema has already validated enum-like fields at runtime
    passengersService.save({ ...data, savedAt: new Date().toISOString() } as PassengerFormData);
    router.push("/booking/seats");
  };

  const onInvalid = () => focusFirst(setFocus, errors);

  return (
    <FormProvider {...methods}>
      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">

        {/* ── Main form ─────────────────────────────────────────── */}
        <form
          onSubmit={handleSubmit(onValid, onInvalid)}
          noValidate
          aria-label="Passenger information"
        >
          <div className="space-y-4">
            <ContactSection />

            {passengerEntries.map(({ type, num }, idx) => (
              <PassengerCard
                key={idx}
                index={idx}
                passengerType={type}
                label={`${type.charAt(0).toUpperCase() + type.slice(1)} ${num}`}
              />
            ))}

            {/* Navigation */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => router.push("/booking/review")}
              >
                <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="flex-1 lg:flex-none"
              >
                Continue
              </Button>
            </div>
          </div>
        </form>

        {/* ── Sidebar ───────────────────────────────────────────── */}
        <BookingSummarySidebar selection={selection} />
      </div>
    </FormProvider>
  );
}
