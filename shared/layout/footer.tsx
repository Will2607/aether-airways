import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./container";
import {
  XIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/shared/icons/social-icons";
import { FOOTER_LINKS } from "@/constants/navigation";
import { APP_NAME } from "@/constants";

/* ── Social links ───────────────────────────────────────────────────────── */

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://twitter.com",   Icon: XIcon         },
  { label: "Instagram",   href: "https://instagram.com", Icon: InstagramIcon  },
  { label: "LinkedIn",    href: "https://linkedin.com",  Icon: LinkedInIcon   },
  { label: "YouTube",     href: "https://youtube.com",   Icon: YouTubeIcon    },
] as const;

/* ── Column helper ──────────────────────────────────────────────────────── */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <nav aria-label={`${title} links`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-neutral-500 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────── */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-neutral-800/60 bg-surface"
    >
      <Container size="xl" className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_3fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <Logo size="md" />
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              Fly beyond the horizon. Premium flights, seamless booking, and
              destinations that inspire.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${APP_NAME} on ${label}`}
                  className="p-2 rounded-lg text-neutral-600 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterColumn title="Company" links={FOOTER_LINKS.company} />
            <FooterColumn title="Travel"  links={FOOTER_LINKS.travel}  />
            <FooterColumn title="Support" links={FOOTER_LINKS.support} />
            <FooterColumn title="Legal"   links={FOOTER_LINKS.legal}   />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © {year} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {(["EN", "ES", "FR"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                className="text-xs text-neutral-600 hover:text-white transition-colors duration-200"
                aria-label={`Switch language to ${lang}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

Footer.displayName = "Footer";
