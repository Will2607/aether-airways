"use client";

import { useState, useRef, useEffect } from "react";
import { UsersIcon, ChevronDownIcon, PlusIcon, MinusIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import type { CabinClass } from "@/features/flights/types";

export interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

const CABIN_CLASSES: { value: CabinClass; label: string }[] = [
  { value: "economy",         label: "Economy"         },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business",        label: "Business"        },
  { value: "first",           label: "First Class"     },
];

interface CounterRowProps {
  label: string;
  sublabel: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

function CounterRow({
  label,
  sublabel,
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max = 9,
}: CounterRowProps) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-neutral-500">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`Decrease ${label} count`}
          className="h-8 w-8 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
        >
          <MinusIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <span
          className="w-5 text-center text-white text-sm font-semibold tabular-nums"
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`Increase ${label} count`}
          className="h-8 w-8 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-aether-500 hover:text-aether-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
        >
          <PlusIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

interface PassengersSelectorProps {
  passengers: PassengerCounts;
  cabinClass: CabinClass;
  onPassengersChange: (p: PassengerCounts) => void;
  onCabinClassChange: (c: CabinClass) => void;
}

export function PassengersSelector({
  passengers,
  cabinClass,
  onPassengersChange,
  onCabinClassChange,
}: PassengersSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;
  const cabinLabel =
    CABIN_CLASSES.find((c) => c.value === cabinClass)?.label ?? "Economy";

  const summary = `${totalPassengers} ${totalPassengers === 1 ? "Passenger" : "Passengers"} · ${cabinLabel}`;

  const update = (field: keyof PassengerCounts, delta: number) => {
    const next = { ...passengers, [field]: passengers[field] + delta };
    if (field === "infants" && next.infants > next.adults) return;
    onPassengersChange(next);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Passengers and class: ${summary}`}
        className={cn(
          "w-full flex items-start gap-2.5 px-4 py-3 rounded-xl bg-elevated border transition-all duration-200 text-left",
          open
            ? "border-aether-500 ring-2 ring-aether-500/20"
            : "border-neutral-700 hover:border-neutral-500"
        )}
      >
        <UsersIcon
          className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">
            Passengers & Class
          </p>
          <p className="text-sm font-medium text-white truncate">{summary}</p>
        </div>
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 text-neutral-500 shrink-0 mt-1 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="dialog"
          aria-label="Select passengers and cabin class"
          aria-modal="true"
          className="absolute top-full right-0 mt-2 w-80 bg-elevated border border-neutral-700 rounded-2xl shadow-2xl z-50 p-4"
        >
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            Passengers
          </p>
          <div className="divide-y divide-neutral-700/50">
            <CounterRow
              label="Adults"
              sublabel="Age 12 or above"
              value={passengers.adults}
              onIncrement={() => update("adults", 1)}
              onDecrement={() => update("adults", -1)}
              min={1}
            />
            <CounterRow
              label="Children"
              sublabel="Age 2–11"
              value={passengers.children}
              onIncrement={() => update("children", 1)}
              onDecrement={() => update("children", -1)}
            />
            <CounterRow
              label="Infants"
              sublabel="Under 2 · In lap"
              value={passengers.infants}
              onIncrement={() => update("infants", 1)}
              onDecrement={() => update("infants", -1)}
              max={passengers.adults}
            />
          </div>

          {/* Cabin class */}
          <div className="mt-4 pt-4 border-t border-neutral-700/50">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Cabin Class
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CABIN_CLASSES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => onCabinClassChange(c.value)}
                  aria-pressed={cabinClass === c.value}
                  className={cn(
                    "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-center",
                    cabinClass === c.value
                      ? "bg-aether-500 text-white shadow-[0_0_12px_rgba(26,75,245,0.4)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/10 border border-neutral-700"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full mt-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-neutral-300 hover:text-white transition-colors font-medium"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
