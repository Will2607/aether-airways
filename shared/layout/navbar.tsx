"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { NAV_LINKS } from "@/constants/navigation";
import { MenuIcon, GlobeIcon } from "@/shared/icons";
import { buttonVariants } from "@/shared/ui/button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const { scrolled } = useScroll(60);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Skip link — first focusable element */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-aether-500 focus:text-white focus:rounded-xl focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-30 transition-all duration-300",
          scrolled
            ? "bg-surface/90 backdrop-blur-xl border-b border-neutral-800/60 shadow-[0_1px_20px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-6">

            {/* Logo */}
            <Logo size="md" />

            {/* Desktop navigation */}
            <nav
              className="hidden lg:flex items-center gap-0.5 flex-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop right side */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 text-sm transition-colors"
                aria-label="Change language"
              >
                <GlobeIcon className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm">EN</span>
              </button>

              <Link
                href="/auth/login"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Login
              </Link>

              <Link
                href="/flights"
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                Book now
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* ── NavLink ───────────────────────────────────────────────────────────── */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative px-3.5 py-2 rounded-xl text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-500 whitespace-nowrap"
    >
      {children}
      <span
        className="absolute bottom-1.5 left-3.5 right-3.5 h-px bg-aether-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"
        aria-hidden="true"
      />
    </Link>
  );
}
