"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PlaneIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import type { Airport } from "@/features/flights/constants/airports";

interface AirportComboboxProps {
  value: Airport | null;
  onChange: (airport: Airport) => void;
  airports: Airport[];
  placeholder?: string;
  label: string;
  id?: string;
}

export function AirportCombobox({
  value,
  onChange,
  airports,
  placeholder = "City or airport",
  label,
  id,
}: AirportComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = `${id ?? label.toLowerCase().replace(/\s/g, "-")}-listbox`;

  const filtered =
    query.length >= 1
      ? airports
          .filter(
            (a) =>
              a.code.toLowerCase().includes(query.toLowerCase()) ||
              a.city.toLowerCase().includes(query.toLowerCase()) ||
              a.country.toLowerCase().includes(query.toLowerCase()) ||
              a.name.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 7)
      : airports.slice(0, 7);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = useCallback(
    (airport: Airport) => {
      onChange(airport);
      setOpen(false);
      setQuery("");
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      setOpen(true);
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) {
          handleSelect(filtered[activeIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        inputRef.current?.blur();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const displayValue =
    value && !open ? `${value.city} (${value.code})` : query;

  return (
    <div ref={containerRef} className="relative">
      <div
        className={cn(
          "flex items-start gap-2.5 px-4 py-3 rounded-xl bg-elevated border transition-all duration-200 cursor-text",
          open
            ? "border-aether-500 ring-2 ring-aether-500/20"
            : "border-neutral-700 hover:border-neutral-500"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <PlaneIcon
          className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <label
            htmlFor={id}
            className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5"
          >
            {label}
          </label>
          <input
            ref={inputRef}
            id={id}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-controls={listId}
            aria-activedescendant={
              activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
            }
            value={displayValue}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => {
              setOpen(true);
              if (value) setQuery("");
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm font-medium text-white placeholder:text-neutral-600 outline-none"
            autoComplete="off"
          />
        </div>
      </div>

      {open && filtered.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} airport options`}
          className="absolute top-full left-0 right-0 mt-1.5 bg-elevated border border-neutral-700 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-neutral-800/60"
        >
          {filtered.map((airport, i) => (
            <li
              key={airport.code}
              id={`${listId}-option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(airport);
              }}
              onMouseEnter={() => setActiveIndex(i)}
              className={cn(
                "flex items-center justify-between gap-3 px-4 py-3 cursor-pointer transition-colors duration-100",
                i === activeIndex
                  ? "bg-aether-500/15 text-white"
                  : "hover:bg-white/5 text-neutral-200"
              )}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {airport.city}
                  <span className="text-neutral-500 font-normal">
                    , {airport.country}
                  </span>
                </p>
                <p className="text-xs text-neutral-500 truncate">{airport.name}</p>
              </div>
              <span className="font-mono text-sm font-bold text-aether-400 shrink-0">
                {airport.code}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
