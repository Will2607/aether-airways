import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { buttonVariants } from "@/shared/ui/button";
import { ArrowRightIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import type { Offer } from "@/features/marketing/types";

interface OfferCardProps {
  offer: Offer;
  featured?: boolean;
  className?: string;
}

/* ── Featured (hero) variant ─────────────────────────────────────────────── */

function FeaturedOfferCard({ offer, className }: { offer: Offer; className?: string }) {
  return (
    <article
      className={cn(
        "relative rounded-2xl overflow-hidden flex flex-col justify-end min-h-[380px] lg:min-h-0",
        className
      )}
    >
      <Image
        src={offer.imageUrl}
        alt={offer.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 67vw"
        priority
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 p-6 lg:p-10">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {offer.badge && <Badge variant="gold">{offer.badge}</Badge>}
          <Badge variant="primary">{offer.discount}</Badge>
        </div>

        <Typography variant="heading-xl" as="h3" className="mb-2">
          {offer.title}
        </Typography>
        <Typography variant="body" color="secondary" className="mb-1 max-w-lg">
          {offer.description}
        </Typography>
        <Typography variant="caption" color="muted" className="mb-6">
          Valid until {offer.validUntil}
        </Typography>

        <Link
          href={offer.href}
          className={buttonVariants({ variant: "primary", size: "md" })}
        >
          Claim offer
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/* ── Secondary (compact) variant ─────────────────────────────────────────── */

function SecondaryOfferCard({ offer, className }: { offer: Offer; className?: string }) {
  return (
    <article
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-card border border-neutral-800",
        "hover:border-neutral-600 transition-all duration-200",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={offer.imageUrl}
          alt={offer.imageAlt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {offer.badge && (
            <Badge variant="gold" size="sm">
              {offer.badge}
            </Badge>
          )}
          <Badge variant="primary" size="sm">
            {offer.discount}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Typography variant="heading-sm" as="h3" className="mb-1">
          {offer.title}
        </Typography>
        <Typography variant="body-sm" color="secondary" className="mb-1 line-clamp-2">
          {offer.description}
        </Typography>
        <Typography variant="caption" color="muted" className="mb-4">
          Valid until {offer.validUntil}
        </Typography>

        <Link
          href={offer.href}
          className="inline-flex items-center gap-1 text-sm font-medium text-aether-400 hover:text-aether-300 transition-colors focus-visible:outline-none focus-visible:underline"
        >
          View offer
          <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/* ── Unified export ──────────────────────────────────────────────────────── */

export function OfferCard({ offer, featured = false, className }: OfferCardProps) {
  return featured ? (
    <FeaturedOfferCard offer={offer} className={className} />
  ) : (
    <SecondaryOfferCard offer={offer} className={className} />
  );
}
