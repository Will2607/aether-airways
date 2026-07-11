"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/shared/layout/container";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Typography } from "@/shared/ui/typography";
import { MailIcon, CheckIcon } from "@/shared/icons";

/* ── Constants ──────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Success state ──────────────────────────────────────────────────────── */

function SuccessMessage() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 py-4"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-aether-500/20">
        <CheckIcon className="h-7 w-7 text-aether-400" aria-hidden="true" />
      </div>
      <Typography variant="heading-sm" as="p">
        You&apos;re on the list!
      </Typography>
      <Typography variant="body-sm" color="secondary">
        Thank you for subscribing. Look out for exclusive deals in your inbox.
      </Typography>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

export function NewsletterSection() {
  const [email, setEmail]   = useState("");
  const [error, setError]   = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(undefined);
    setSuccess(true);
  };

  return (
    <section
      className="relative bg-aether-950 py-24 md:py-32 overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_110%,rgba(26,75,245,0.2),transparent)]"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        <div className="max-w-lg mx-auto text-center">
          {/* Icon */}
          <div
            className="flex h-14 w-14 mx-auto mb-6 items-center justify-center rounded-2xl bg-aether-500/15 ring-1 ring-aether-500/30"
            aria-hidden="true"
          >
            <MailIcon className="h-7 w-7 text-aether-400" />
          </div>

          <Badge variant="primary" className="mb-5">
            Newsletter
          </Badge>

          <Typography
            variant="heading-xl"
            as="h2"
            id="newsletter-heading"
            className="mb-3"
          >
            Deals Delivered to You
          </Typography>

          <Typography variant="body-lg" color="secondary" className="mb-10">
            Subscribe and be the first to know about flash sales, new routes
            and exclusive member offers.
          </Typography>

          {success ? (
            <SuccessMessage />
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Newsletter subscription"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={email}
                    size="lg"
                    error={error}
                    aria-label="Email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(undefined);
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="shrink-0"
                >
                  Subscribe
                </Button>
              </div>

              {/* Privacy note */}
              <Typography
                variant="caption"
                color="muted"
                className="mt-4 block"
              >
                By subscribing you agree to our{" "}
                <a
                  href="/privacy"
                  className="underline hover:text-neutral-300 transition-colors"
                >
                  Privacy Policy
                </a>
                . Unsubscribe at any time — no spam, ever.
              </Typography>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
