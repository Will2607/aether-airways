"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  placeholder?: string;
  label: string;
  id?: string;
  hasError?: boolean;
}

export function DatePicker({
  value,
  onChange,
  minDate,
  placeholder = "Add date",
  label,
  id,
  hasError = false,
}: DatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(
    value?.getMonth() ?? today.getMonth()
  );
  const [viewYear, setViewYear] = useState(
    value?.getFullYear() ?? today.getFullYear()
  );
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

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const isDisabled = (day: number) => {
    if (!minDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    const min = new Date(minDate);
    d.setHours(0, 0, 0, 0);
    min.setHours(0, 0, 0, 0);
    return d < min;
  };

  const isSelected = (day: number) =>
    !!value &&
    value.getDate() === day &&
    value.getMonth() === viewMonth &&
    value.getFullYear() === viewYear;

  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === viewMonth &&
    today.getFullYear() === viewYear;

  const handleDayClick = (day: number) => {
    if (isDisabled(day)) return;
    onChange(new Date(viewYear, viewMonth, day));
    setOpen(false);
  };

  const formatted = value
    ? value.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}: ${formatted ?? "no date selected"}`}
        className={cn(
          "w-full flex items-start gap-2.5 px-4 py-3 rounded-xl bg-elevated border transition-all duration-200 text-left",
          open
            ? "border-aether-500 ring-2 ring-aether-500/20"
            : hasError
            ? "border-red-500/70 hover:border-red-400"
            : "border-neutral-700 hover:border-neutral-500"
        )}
      >
        <CalendarIcon
          className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">
            {label}
          </p>
          <p
            className={cn(
              "text-sm font-medium",
              formatted ? "text-white" : "text-neutral-600"
            )}
          >
            {formatted ?? placeholder}
          </p>
        </div>
      </button>

      {/* Calendar popover */}
      {open && (
        <div
          role="dialog"
          aria-label={`${label} date picker`}
          aria-modal="true"
          className="absolute top-full left-0 mt-2 w-72 bg-elevated border border-neutral-700 rounded-2xl shadow-2xl z-50 p-4"
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Go to previous month"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold text-white" aria-live="polite">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Go to next month"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_SHORT.map((d) => (
              <div
                key={d}
                className="text-center text-[11px] font-semibold text-neutral-600 py-1"
                aria-hidden="true"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`pad-${i}`} aria-hidden="true" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isDisabled(day);
              const selected = isSelected(day);
              const todayDay = isToday(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  disabled={disabled}
                  aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}${selected ? " (selected)" : ""}`}
                  aria-pressed={selected}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-full text-xs font-medium transition-all duration-150",
                    selected &&
                      "bg-aether-500 text-white shadow-[0_0_12px_rgba(26,75,245,0.5)]",
                    !selected &&
                      !disabled &&
                      "text-neutral-200 hover:bg-white/10",
                    !selected && todayDay && "text-aether-400 font-bold",
                    disabled && "text-neutral-700 cursor-not-allowed opacity-40"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {value && (
            <button
              type="button"
              onClick={() => { onChange(new Date(0)); setOpen(false); }}
              className="w-full mt-3 pt-3 border-t border-neutral-700/50 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Clear date
            </button>
          )}
        </div>
      )}
    </div>
  );
}
