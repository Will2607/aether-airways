import { PlaneIcon } from "@/shared/icons";
import type { BoardingPass } from "@/features/check-in/types";

/* ── Mock barcode (CSS, deterministic, no sensitive data) ──────────────── */

function MockBarcode({ value }: { value: string }) {
  const padded = value.padEnd(32, "0");
  return (
    <div
      className="flex h-12 items-end gap-[2px] text-neutral-800 print:text-black"
      role="img"
      aria-label="Boarding pass barcode (mock)"
    >
      {Array.from(padded).map((ch, i) => {
        const code = ch.charCodeAt(0);
        const wide = code % 5 === 0;
        const tall = code % 3 !== 0;
        return (
          <div
            key={i}
            style={{
              width:           wide ? "3px" : "2px",
              height:          tall ? "100%" : "75%",
              backgroundColor: "currentColor",
              flexShrink:      0,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Field component ────────────────────────────────────────────────────── */

function Field({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-neutral-900">{value}</p>
    </div>
  );
}

/* ── Boarding pass card ─────────────────────────────────────────────────── */

interface BoardingPassCardProps {
  pass: BoardingPass;
}

export function BoardingPassCard({ pass }: BoardingPassCardProps) {
  const departureDateFormatted = new Date(pass.departureDate + "T12:00:00").toLocaleDateString(
    "en-US",
    { day: "2-digit", month: "short", year: "numeric" }
  );

  return (
    <article
      className="w-full overflow-hidden rounded-2xl bg-white text-neutral-900 shadow-xl
                 ring-1 ring-neutral-200 print:shadow-none print:ring-0 print:break-inside-avoid"
      aria-label={`Boarding pass for ${pass.passengerName}, flight ${pass.flightNumber}`}
    >
      {/* Top banner */}
      <div className="flex items-center justify-between bg-neutral-900 px-5 py-3 print:bg-black">
        <div className="flex items-center gap-2">
          <PlaneIcon className="h-4 w-4 text-white" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-wide text-white">AetherAirways</span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          Boarding Pass
        </span>
      </div>

      {/* Demo warning */}
      <div className="bg-amber-50 px-5 py-1.5 text-center text-[10px] font-semibold uppercase tracking-widest text-amber-700">
        ⚠ Demo only — not a valid travel document ⚠
      </div>

      {/* Route */}
      <div className="flex items-center justify-center gap-4 bg-neutral-50 px-5 py-5">
        <div className="text-center">
          <p className="text-4xl font-black tabular-nums text-neutral-900">{pass.origin}</p>
          <p className="mt-0.5 max-w-[100px] truncate text-xs text-neutral-500">{pass.originCity}</p>
        </div>
        <div className="flex flex-1 items-center gap-1" aria-hidden="true">
          <div className="h-px flex-1 border-t-2 border-dashed border-neutral-300" />
          <PlaneIcon className="h-5 w-5 shrink-0 text-neutral-400" />
          <div className="h-px flex-1 border-t-2 border-dashed border-neutral-300" />
        </div>
        <div className="text-center">
          <p className="text-4xl font-black tabular-nums text-neutral-900">{pass.destination}</p>
          <p className="mt-0.5 max-w-[100px] truncate text-xs text-neutral-500">{pass.destinationCity}</p>
        </div>
      </div>

      {/* Tear line */}
      <div className="relative my-0 flex items-center px-0" aria-hidden="true">
        <div className="-ml-3 h-6 w-6 shrink-0 rounded-full bg-neutral-100 ring-1 ring-neutral-200" />
        <div className="flex-1 border-t-2 border-dashed border-neutral-200" />
        <div className="-mr-3 h-6 w-6 shrink-0 rounded-full bg-neutral-100 ring-1 ring-neutral-200" />
      </div>

      {/* Details grid */}
      <div className="px-5 py-4">
        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
          <Field label="Passenger" value={pass.passengerName} wide />
          <Field label="Flight"    value={pass.flightNumber} />
          <Field label="Date"      value={departureDateFormatted} />
          <Field label="Seat"      value={pass.seat} />
          <Field label="Group"     value={pass.boardingGroup} />
          <Field label="Boarding"  value={pass.boardingTime} />
          <Field label="Departure" value={pass.departureTime} />
          <Field label="Terminal"  value={pass.terminal} />
          <Field label="Gate"      value={pass.gate} />
          <Field label="Seq #"     value={String(pass.sequenceNumber).padStart(3, "0")} />
        </div>
      </div>

      {/* Barcode section */}
      <div className="border-t border-neutral-200 px-5 pb-5 pt-4">
        <MockBarcode value={pass.barcodeValue} />
        <p className="mt-2 font-mono text-[10px] text-neutral-400 break-all">
          {pass.barcodeValue}
        </p>
        <p className="mt-1 text-[9px] uppercase tracking-wide text-neutral-400">
          Booking ref: {pass.bookingReference} · Group {pass.boardingGroup}
        </p>
      </div>
    </article>
  );
}
