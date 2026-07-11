import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-elevated", className)}
      aria-hidden="true"
    />
  );
}

function SkeletonCard() {
  return (
    <div className="bg-card border border-neutral-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-neutral-800 space-y-3">
        <div className="flex justify-between">
          <Shimmer className="h-5 w-24" />
          <Shimmer className="h-5 w-32" />
        </div>
        <div className="flex items-center gap-4">
          <Shimmer className="h-8 w-16" />
          <Shimmer className="h-3 flex-1" />
          <Shimmer className="h-8 w-16" />
        </div>
      </div>
      {/* Fares */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-neutral-800 rounded-xl p-4 space-y-3">
            <Shimmer className="h-4 w-28" />
            <Shimmer className="h-3 w-full" />
            <Shimmer className="h-3 w-4/5" />
            <div className="flex justify-between items-center pt-2">
              <Shimmer className="h-6 w-16" />
              <Shimmer className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FlightResultsSkeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading flights…">
      <span className="sr-only">Loading flight results…</span>
      {[0, 1, 2].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
