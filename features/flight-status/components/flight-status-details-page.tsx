"use client";
import { useMemo } from "react";
import Link from "next/link";
import { PlaneIcon, ArrowLeftIcon, PrinterIcon, MapPinIcon, ClockIcon } from "@/shared/icons";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { getFlightStatusByNumber } from "@/features/flight-status/services/flight-status.service";
import { fromUrlFlightNumber, formatDate, formatDateTime } from "@/features/flight-status/utils/flight-status.utils";
import { FlightStatusBadge } from "./flight-status-badge";
import { FlightTimesCard } from "./flight-times-card";
import { FlightOperationalTimeline } from "./flight-operational-timeline";
import { DelayAlert } from "./delay-alert";
import { FlightStatusNotFound } from "./flight-status-not-found";

/* ── Airport info card ───────────────────────────────────────────────────── */

function AirportCard({
  label,
  code,
  name,
  city,
  country,
  terminal,
  gate,
  extra,
}: {
  label:    string;
  code:     string;
  name:     string;
  city:     string;
  country:  string;
  terminal: string;
  gate?:    string;
  extra?:   string;
}) {
  return (
    <div className="flex-1 rounded-2xl border border-neutral-800 bg-card p-5 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{label}</p>
      <div>
        <p className="text-3xl font-black text-white">{code}</p>
        <p className="mt-1 text-sm font-medium text-neutral-300">{name}</p>
        <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
          <MapPinIcon className="h-3 w-3" aria-hidden="true" />
          {city}, {country}
        </div>
      </div>
      <div className="border-t border-neutral-800 pt-3 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-500">Terminal</span>
          <span className="font-semibold text-white">{terminal}</span>
        </div>
        {gate && (
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Gate</span>
            <span className="font-semibold text-white">{gate}</span>
          </div>
        )}
        {extra && (
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Baggage claim</span>
            <span className="font-semibold text-white">{extra}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Detail page ─────────────────────────────────────────────────────────── */

interface FlightStatusDetailsPageProps {
  flightNumberSlug: string;
}

export function FlightStatusDetailsPage({ flightNumberSlug }: FlightStatusDetailsPageProps) {
  const flightNumber = fromUrlFlightNumber(flightNumberSlug);
  const flight = useMemo(() => getFlightStatusByNumber(flightNumber), [flightNumber]);

  if (!flight) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <FlightStatusNotFound flightNumber={flightNumber} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface print:bg-white">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-sm print:static print:bg-white print:border-neutral-200">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/flight-status"
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors print:hidden"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Flight Status
          </Link>
          <div className="flex flex-1 items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <PlaneIcon className="h-4 w-4 text-aether-400 print:text-neutral-600" aria-hidden="true" />
              <span className="font-mono text-base font-bold text-white print:text-neutral-900">
                {flight.flightNumber}
              </span>
              <span className="hidden text-neutral-500 sm:inline" aria-hidden="true">·</span>
              <span className="hidden text-sm text-neutral-400 sm:inline">
                {flight.origin.code} → {flight.destination.code}
              </span>
            </div>
            <FlightStatusBadge status={flight.status} size="sm" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Demo notice */}
        <p className="text-xs text-neutral-700 print:hidden">
          ⚠ Demo: statuses are simulated. Not real airline data.
        </p>

        {/* Title row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <Typography as="h1" variant="heading-xl" className="text-white print:text-neutral-900">
              {flight.origin.city} → {flight.destination.city}
            </Typography>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Last updated: {formatDateTime(flight.updatedAt)}
            </div>
          </div>
          <p className="text-sm text-neutral-400">{formatDate(flight.scheduledDeparture)}</p>
        </div>

        {/* Delay alert */}
        <DelayAlert
          delayMinutes={flight.delayMinutes}
          scheduledDeparture={flight.scheduledDeparture}
          estimatedDeparture={flight.estimatedDeparture}
        />

        {/* Airports */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <AirportCard
            label="Departure"
            code={flight.origin.code}
            name={flight.origin.name}
            city={flight.origin.city}
            country={flight.origin.country}
            terminal={flight.departureTerminal}
            gate={flight.departureGate}
          />
          <div className="flex items-center justify-center" aria-hidden="true">
            <PlaneIcon className="h-6 w-6 text-neutral-700 sm:rotate-0 rotate-90" />
          </div>
          <AirportCard
            label="Arrival"
            code={flight.destination.code}
            name={flight.destination.name}
            city={flight.destination.city}
            country={flight.destination.country}
            terminal={flight.arrivalTerminal}
            gate={flight.arrivalGate}
            extra={flight.baggageClaim}
          />
        </div>

        {/* Aircraft info */}
        <div className="rounded-xl border border-neutral-800 bg-card px-5 py-3 flex items-center justify-between text-sm">
          <span className="text-neutral-500">Aircraft</span>
          <span className="font-medium text-white">{flight.aircraft}</span>
        </div>

        {/* Flight times */}
        <FlightTimesCard flight={flight} />

        {/* Timeline */}
        <div className="rounded-2xl border border-neutral-800 bg-card p-6">
          <FlightOperationalTimeline flight={flight} />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-400 hover:border-neutral-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500"
          >
            <PrinterIcon className="h-4 w-4" aria-hidden="true" />
            Print
          </button>
          <Link href="/flight-status">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              All flights
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
