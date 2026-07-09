export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Flights",      href: "/flights"          },
  { label: "Destinations", href: "/destinations"     },
  { label: "Offers",       href: "/offers"           },
  { label: "Check-in",     href: "/check-in"         },
  { label: "My Trips",     href: "/dashboard/trips"  },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us",   href: "/about"     },
    { label: "Careers",    href: "/careers"   },
    { label: "Press",      href: "/press"     },
    { label: "Investors",  href: "/investors" },
  ],
  travel: [
    { label: "Flights",      href: "/flights"      },
    { label: "Destinations", href: "/destinations" },
    { label: "Aether+",      href: "/loyalty"      },
    { label: "Offers",       href: "/offers"       },
    { label: "Gift Cards",   href: "/gift-cards"   },
  ],
  support: [
    { label: "Help Center",   href: "/help"          },
    { label: "Contact Us",    href: "/contact"       },
    { label: "Baggage Info",  href: "/baggage"       },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Safety",        href: "/safety"        },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use",   href: "/terms"   },
    { label: "Cookie Policy",  href: "/cookies" },
    { label: "Sitemap",        href: "/sitemap" },
  ],
} as const;
