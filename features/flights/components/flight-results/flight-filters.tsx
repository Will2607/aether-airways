"use client";

import { useMemo } from "react";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { XIcon } from "@/shared/icons";
import type { DeparturePeriod, FlightActiveFilters, FlightResult } from "@/features/flights/types";

/* ── Types ─────────────────────────────────────────────────────────────── */

interface FlightFiltersProps {
  flights: FlightResult[];
  filters: FlightActiveFilters;
  onChange: (f: FlightActiveFilters) => void;
  onClose?: () => void;
}

/* ── Helpers ────────────────────────────────────────────────────────────── */

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

const STOP_OPTIONS   = [{ value: 0, label: "Direct" }, { value: 1, label: "1 Stop" }, { value: 2, label: "2+ Stops" }];
const PERIOD_OPTIONS: { value: DeparturePeriod; label: string; sub: string }[] = [
  { value: "morning",   label: "Morning",   sub: "Before noon"    },
  { value: "afternoon", label: "Afternoon", sub: "12:00 – 17:59" },
  { value: "evening",   label: "Evening",   sub: "18:00 onwards"  },
];

/* ── Checkbox row ────────────────────────────────────────────────────────── */

function CheckRow({
  id,
  checked,
  onToggle,
  label,
  sub,
}: {
  id: string;
  checked: boolean;
  onToggle: () => void;
  label: string;
  sub?: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 py-2 cursor-pointer group"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="h-4 w-4 rounded border-neutral-700 bg-elevated accent-aether-500 cursor-pointer"
      />
      <span className="flex-1 min-w-0">
        <Typography variant="body-sm" className="group-hover:text-white transition-colors block">
          {label}
        </Typography>
        {sub && <Typography variant="caption" color="muted" className="block">{sub}</Typography>}
      </span>
    </label>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */

export function FlightFilters({ flights, filters, onChange, onClose }: FlightFiltersProps) {
  const maxPrice = useMemo(
    () =>
      Math.max(
        ...flights.flatMap((f) => f.fares.map((fare) => fare.price.amount)),
        1500
      ),
    [flights]
  );

  const currentMax = filters.maxPrice ?? maxPrice;
  const hasActive =
    filters.stops.length > 0 ||
    filters.maxPrice !== null ||
    filters.departurePeriods.length > 0;

  const reset = () =>
    onChange({ stops: [], maxPrice: null, departurePeriods: [] });

  return (
    <aside
      className="bg-card border border-neutral-800 rounded-2xl p-5 space-y-5"
      aria-label="Flight filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Typography variant="heading-sm" as="h2">Filters</Typography>
        <div className="flex gap-2">
          {hasActive && (
            <button
              type="button"
              onClick={reset}
              className="text-xs text-aether-400 hover:text-aether-300 transition-colors"
              aria-label="Reset all filters"
            >
              Reset all
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1 text-neutral-500 hover:text-white transition-colors"
              aria-label="Close filters"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Stops */}
      <fieldset>
        <legend>
          <Typography variant="label-sm" color="muted" className="mb-2 block">
            Stops
          </Typography>
        </legend>
        {STOP_OPTIONS.map((opt) => (
          <CheckRow
            key={opt.value}
            id={`stop-${opt.value}`}
            checked={filters.stops.includes(opt.value)}
            onToggle={() => onChange({ ...filters, stops: toggle(filters.stops, opt.value) })}
            label={opt.label}
          />
        ))}
      </fieldset>

      <div className="h-px bg-neutral-800" aria-hidden="true" />

      {/* Max price */}
      <fieldset>
        <legend>
          <Typography variant="label-sm" color="muted" className="mb-2 block">
            Max price
          </Typography>
        </legend>
        <div className="flex items-center justify-between mb-2">
          <Typography variant="caption" color="muted">$0</Typography>
          <Typography variant="label-lg" className="text-white font-semibold">
            ${currentMax.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="muted">${maxPrice.toLocaleString()}</Typography>
        </div>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={10}
          value={currentMax}
          onChange={(e) =>
            onChange({
              ...filters,
              maxPrice: Number(e.target.value) >= maxPrice ? null : Number(e.target.value),
            })
          }
          className="w-full accent-aether-500 cursor-pointer"
          aria-label={`Maximum price: $${currentMax}`}
          aria-valuemin={0}
          aria-valuemax={maxPrice}
          aria-valuenow={currentMax}
        />
      </fieldset>

      <div className="h-px bg-neutral-800" aria-hidden="true" />

      {/* Departure time */}
      <fieldset>
        <legend>
          <Typography variant="label-sm" color="muted" className="mb-2 block">
            Departure time
          </Typography>
        </legend>
        {PERIOD_OPTIONS.map((opt) => (
          <CheckRow
            key={opt.value}
            id={`period-${opt.value}`}
            checked={filters.departurePeriods.includes(opt.value)}
            onToggle={() =>
              onChange({
                ...filters,
                departurePeriods: toggle(filters.departurePeriods, opt.value),
              })
            }
            label={opt.label}
            sub={opt.sub}
          />
        ))}
      </fieldset>

      {/* Mobile apply button */}
      {onClose && (
        <Button
          variant="primary"
          size="md"
          onClick={onClose}
          className="w-full lg:hidden mt-2"
        >
          Apply filters
        </Button>
      )}
    </aside>
  );
}
