import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import type { Destination } from "@/features/marketing/types";

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className }: DestinationCardProps) {
  const { city, country, imageUrl, imageAlt, priceFrom, currency, flightDuration, href } =
    destination;

  const symbol = currency === "USD" ? "$" : currency;

  return (
    <article
      className={cn(
        "group relative aspect-[3/4] rounded-2xl overflow-hidden",
        "focus-within:ring-2 focus-within:ring-aether-500 focus-within:ring-offset-2 focus-within:ring-offset-surface",
        className
      )}
    >
      {/* Image */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-white leading-tight truncate">{city}</h3>
            <p className="text-sm text-neutral-300">{country}</p>
            <p className="text-xs text-neutral-400 mt-1">{flightDuration} flight</p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-[11px] text-neutral-400 uppercase tracking-wider">From</p>
            <p className="text-xl font-bold text-gold-400">
              {symbol}
              {priceFrom.toLocaleString()}
            </p>
          </div>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
        >
          Explore destination
          <ChevronRightIcon
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
